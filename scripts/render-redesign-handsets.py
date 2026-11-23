#!/usr/bin/env python3
"""Render the Inferenco device artwork offline using NumPy and Pillow.

Requires Python 3.10+, NumPy, and Pillow with WebP support.
Run from the project root: python scripts/render-redesign-handsets.py
Select one pose with --pose sound-teaser. Pass --screen path/to/capture.png
with a pose to replace its screen. Screen aspect is preserved automatically.
Pass --avif to produce the narrow derivatives in a Pillow build with AVIF support.
"""
import argparse
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "public" / "img" / "redesign"
SCREENS = {"sound": "sound-convert.webp", "resize": "resize-home.webp", "nemesis": "nemesis-match.webp"}


@dataclass(frozen=True)
class Pose:
    yaw: float
    pitch: float
    roll: float
    size: tuple
    small: tuple | None


POSES = {
    "nemesis-hero": Pose(-9, 2, -2.2, (720, 1200), (420, 700)),
    "sound-hero": Pose(-4.5, 1.4, -.65, (720, 1200), (420, 700)),
    "resize-hero": Pose(-13, 3.2, -3.8, (720, 1200), (420, 700)),
    "sound-teaser": Pose(-23, -6, -10.5, (840, 1120), (420, 560)),
    "resize-teaser": Pose(-21, -5, -9.5, (840, 1120), (420, 560)),
    "sound-mobile": Pose(-5, 1.5, -1.4, (420, 700), None),
    "resize-mobile": Pose(-6, 2, -1.6, (420, 700), None),
}

# Softbox colours are display-referred. Positions on the case are in millimetres.
PALETTES = {
    "nemesis": ((.41, .89, 1.0), (.19, .60, .71)),
    "sound": ((.67, .44, 1.0), (.35, .91, 1.0)),
    "sound-teaser": ((.46, .88, 1.0), (.32, .62, .88)),
    "resize": ((1.0, .79, .54), (.81, .51, .62)),
}
SCREEN_WIDTH = 68.0
EDGE_INSET = 2.18
CASE_RADIUS = 8.4
FRONT_GLASS_Z = 3.82
SCREEN_Z = 3.85
CAMERA_DISTANCE = 385.0


def unit(vectors):
    return vectors / np.maximum(np.linalg.norm(vectors, axis=-1, keepdims=True), 1e-8)


def rotation(pose):
    yaw, pitch, roll = np.radians([pose.yaw, pose.pitch, pose.roll])
    cy, sy = np.cos(yaw), np.sin(yaw)
    cp, sp = np.cos(pitch), np.sin(pitch)
    cr, sr = np.cos(roll), np.sin(roll)
    y = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]])
    x = np.array([[1, 0, 0], [0, cp, -sp], [0, sp, cp]])
    z = np.array([[cr, -sr, 0], [sr, cr, 0], [0, 0, 1]])
    return z @ x @ y


def outline(width, height, radius):
    """A rounded footprint plus outward normals, including samples along straight rails."""
    half_w, half_h = width / 2 - radius, height / 2 - radius
    corners = [(half_w, half_h), (-half_w, half_h), (-half_w, -half_h), (half_w, -half_h)]
    arcs = []
    for index, center in enumerate(corners):
        angles = np.linspace(index * np.pi / 2, (index + 1) * np.pi / 2, 19)
        normals = np.column_stack((np.cos(angles), np.sin(angles)))
        arcs.append((np.array(center) + radius * normals, normals))
    positions, directions = [], []
    for index, (arc, normal) in enumerate(arcs):
        positions.extend(arc)
        directions.extend(normal)
        end = arcs[(index + 1) % 4][0][0]
        samples = max(1, int(np.linalg.norm(end - arc[-1]) / 2.2))
        for t in np.linspace(0, 1, samples + 1)[1:-1]:
            positions.append(arc[-1] * (1 - t) + end * t)
            directions.append(normal[-1])
    return np.array(positions), np.array(directions)


class Camera:
    def __init__(self, pose, size, footprint, normals, half_width):
        self.rotation = rotation(pose)
        self.size = size
        # Include the back bevel and projecting controls when fitting the silhouette.
        limits = [np.column_stack((footprint + .12 * normals, np.full(len(footprint), z)))
                  for z in (-3.55, 3.65)]
        limits.append(np.array([[half_width + .8, y, 0] for y in (4, 29)]))
        projected = self.project_plane(np.concatenate(limits))
        low, high = projected.min(axis=0), projected.max(axis=0)
        gap = size[0] * .007
        self.scale = min((size[0] - 2 * gap) / (high[0] - low[0]),
                         (size[1] - 2 * gap) / (high[1] - low[1]))
        self.offset = np.array([(size[0] - self.scale * (low[0] + high[0])) / 2,
                                size[1] - gap - high[1] * self.scale])

    def project_plane(self, points):
        world = points @ self.rotation.T
        scale = CAMERA_DISTANCE / (CAMERA_DISTANCE - world[:, 2])
        return world[:, :2] * scale[:, None] * [1, -1]

    def project(self, points):
        world = points @ self.rotation.T
        return np.column_stack((self.project_plane(points) * self.scale + self.offset, world[:, 2]))


class Studio:
    def __init__(self, camera, lighting):
        self.camera = camera
        width, height = camera.size
        self.image = np.zeros((height, width, 4), dtype=np.uint8)
        self.depth = np.full((height, width), -np.inf, dtype=np.float32)
        self.key, self.fill = (np.array(c) for c in PALETTES[lighting])

    def light(self, points, normals, material):
        world = points @ self.camera.rotation.T
        normal = unit(normals @ self.camera.rotation.T)
        eye = unit(np.array([0., 0., CAMERA_DISTANCE]) - world)
        reflected = 2 * np.sum(normal * eye, axis=1, keepdims=True) * normal - eye
        azimuth = np.degrees(np.arctan2(reflected[:, 0], reflected[:, 2]))
        elevation = np.degrees(np.arcsin(np.clip(reflected[:, 1], -1, 1)))
        # A real reflection softens and travels along a rail as its normal changes.
        def panel(az, el, width, height):
            az_delta = (azimuth - az + 180) % 360 - 180
            return np.exp(-((az_delta / width) ** 2 + ((elevation - el) / height) ** 2))[:, None]

        if material == "socket":
            return np.tile([12, 16, 23], (len(points), 1))
        tint = np.array([.09, .115, .15])
        light = np.tile(tint, (len(points), 1))
        light += panel(-110, 14, 36, 92) * self.key * .85
        light += panel(124, 25, 30, 64) * self.fill * .82
        light += panel(158, -18, 25, 63) * self.key * .34
        light += panel(-54, 46, 38, 32) * np.array([.72, .81, .91])
        light += panel(48, -38, 30, 38) * np.array([.32, .42, .50])
        light += np.maximum(0, normal[:, 1:2]) ** 3 * (.16 + .48 * self.key)
        # A black flag breaks the long strip reflection on the machined sidewall.
        position = points[:, 1:2]
        flag = .59 + .41 * np.clip((position + 18) / 60, 0, 1)
        light *= flag
        if material == "lip":
            light = light * 1.23 + np.array([.065, .071, .074])
        if material == "gasket":
            light *= .34
        if material == "key":
            light = light * .84 + np.array([.065, .072, .078])
        if material == "rail":
            # Reflections track the slightly crowned metal wall. A narrow polished
            # shoulder catches the strip light along the back of the handset.
            across_rail = (points[:, 2:3] + 2.4) / 4.4
            shoulder = .46 + .43 * np.exp(-((across_rail - .35) / .45) ** 2)
            light *= shoulder
            # Offset insulating bands are embedded only in the sidewall.
            for y in (-44., 43.):
                band = np.exp(-((position - y) / .64) ** 2)
                light = light * (1 - band * .77) + band * np.array([.037, .042, .054])
        return np.clip(light * 255., 0, 255)

    def triangle(self, xyz, colors):
        low = np.maximum(np.floor(xyz[:, :2].min(axis=0)).astype(int), 0)
        high = np.minimum(np.ceil(xyz[:, :2].max(axis=0)).astype(int), np.array(self.camera.size) - 1)
        if np.any(high < low):
            return
        x0, y0 = xyz[0, :2]
        ax, ay = xyz[1, :2] - xyz[0, :2]
        bx, by = xyz[2, :2] - xyz[0, :2]
        determinant = ax * by - ay * bx
        if abs(determinant) < .001:
            return
        xs, ys = slice(low[0], high[0] + 1), slice(low[1], high[1] + 1)
        py, px = np.ogrid[ys, xs]
        u = ((px + .5 - x0) * by - (py + .5 - y0) * bx) / determinant
        v = ((py + .5 - y0) * ax - (px + .5 - x0) * ay) / determinant
        weights = (u >= 0) & (v >= 0) & (u + v <= 1)
        z = xyz[0, 2] + u * (xyz[1, 2] - xyz[0, 2]) + v * (xyz[2, 2] - xyz[0, 2])
        depth = self.depth[ys, xs]
        visible = weights & (z >= depth)
        if np.any(visible):
            depth[visible] = z[visible]
            image = self.image[ys, xs]
            shaded = colors[0] + u[visible, None] * (colors[1] - colors[0]) + v[visible, None] * (colors[2] - colors[0])
            image[visible, :3] = shaded
            image[visible, 3] = 255

    def extrusion(self, footprint, normals, profile, transform=None, origin=None, cap=False):
        """Connect profile rings in 3-D, shade their normals, and depth-test each triangle."""
        transform = np.eye(3) if transform is None else transform
        origin = np.zeros(3) if origin is None else origin
        rings, lights = [], []
        for i, (inset, z, material) in enumerate(profile):
            previous, following = profile[max(0, i - 1)], profile[min(len(profile) - 1, i + 1)]
            radial, axial = following[1] - previous[1], following[0] - previous[0]
            points = np.column_stack((footprint - inset * normals, np.full(len(footprint), z)))
            normal = unit(np.column_stack((radial * normals, np.full(len(normals), axial))))
            points = points @ transform.T + origin
            rings.append(self.camera.project(points))
            lights.append(self.light(points, normal @ transform.T, material))
        count = len(footprint)
        for level in range(len(rings) - 1):
            for i in range(count):
                j = (i + 1) % count
                for indexes in (((level, i), (level, j), (level + 1, i)),
                                ((level, j), (level + 1, j), (level + 1, i))):
                    self.triangle(np.array([rings[l][k] for l, k in indexes]),
                                  np.array([lights[l][k] for l, k in indexes]))
        if cap:
            center = np.mean(rings[-1], axis=0)
            color = lights[-1].mean(axis=0)
            for i in range(count):
                j = (i + 1) % count
                self.triangle(np.array([center, rings[-1][i], rings[-1][j]]),
                              np.array([color, lights[-1][i], lights[-1][j]]))


def warp_coefficients(output_quad, source_quad):
    """Pillow's inverse perspective map from projected glass to source capture."""
    matrix, target = [], []
    for (x, y), (u, v) in zip(output_quad, source_quad, strict=True):
        matrix.extend([[x, y, 1, 0, 0, 0, -u*x, -u*y], [0, 0, 0, x, y, 1, -v*x, -v*y]])
        target.extend([u, v])
    return np.linalg.solve(matrix, target)


def screen_glass(source):
    # Restrict the studio reflection to a faint diagonal band over the glass.
    w, h = source.size
    y, x = np.ogrid[0:1:complex(h), 0:1:complex(w)]
    highlight = .019 * np.exp(-((x + .28*y - .10) / .135) ** 2)
    rgb = np.asarray(source.convert("RGB"), dtype=np.float32)
    rgb += highlight[..., None] * (np.array([185, 215, 230]) - rgb)
    screen = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8)).convert("RGBA")
    mask = Image.new("L", screen.size)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), radius=4.8 / SCREEN_WIDTH * w, fill=255)
    screen.putalpha(mask)
    return screen


def render(product, pose, capture):
    size = tuple(round(n * 1.55) for n in pose.size)
    screen_height = SCREEN_WIDTH * capture.height / capture.width
    width, height = SCREEN_WIDTH + 2 * EDGE_INSET, screen_height + 2 * EDGE_INSET + .7
    footprint, normal = outline(width, height, CASE_RADIUS)
    camera = Camera(pose, size, footprint, normal, width / 2)
    lighting = "sound-teaser" if product == "sound" and pose == POSES["sound-teaser"] else product
    studio = Studio(camera, lighting)
    profile = [
        (1.52, -4.25, "rail"), (.8, -4.10, "lip"), (.31, -3.73, "rail"),
        (.06, -3.24, "rail"), (0, -2.78, "rail"), (0, -2.52, "lip"),
        (.12, -2.28, "rail"), (.08, -1.65, "rail"), (.022, -.70, "rail"),
        (0, .10, "rail"), (.036, .90, "rail"), (.10, 1.60, "rail"),
        (.085, 1.82, "rail"), (.04, 2.10, "rail"),
        (0, 2.42, "lip"), (.12, 2.82, "lip"), (.31, 3.12, "lip"),
        (.67, 3.36, "lip"), (.93, 3.43, "gasket"), (1.06, 3.46, "gasket"),
        (1.14, 3.66, "gasket"), (1.32, FRONT_GLASS_Z, "gasket"),
    ]
    studio.extrusion(footprint, normal, profile)
    side = np.array([[0, 0, 1], [0, 1, 0], [-1, 0, 0]])
    for center_y, length in ((height * .245, 12.6), (height * .088, 9.4)):
        for socket in (True, False):
            extra = .48 if socket else 0
            points, directions = outline(2.2 + extra, length + extra, .85)
            levels = ([(0, -.18, "socket"), (0, .18, "socket")] if socket else
                      [(.24, .10, "gasket"), (.04, .31, "key"), (0, .67, "key"), (.22, .91, "lip")])
            studio.extrusion(points, directions, levels, side, [width / 2 - .05, center_y, -.12], cap=True)
    body = Image.fromarray(studio.image)
    front_inset = profile[-1][0]
    outline_front = np.column_stack((footprint - front_inset * normal, np.full(len(footprint), FRONT_GLASS_Z)))
    draw = ImageDraw.Draw(body)
    draw.polygon([tuple(p) for p in camera.project(outline_front)[:, :2]], fill=(6, 11, 16, 255))
    # A recessed earpiece occupies the physical rim above the capture.
    earpiece, _ = outline(8.5, .30, .13)
    earpiece[:, 1] += height / 2 - 1.74
    slot = camera.project(np.column_stack((earpiece, np.full(len(earpiece), SCREEN_Z))))
    draw.polygon([tuple(p) for p in slot[:, :2]], fill=(40, 48, 54, 255))
    sw, sh = SCREEN_WIDTH / 2, screen_height / 2
    screen_quad = np.array([[-sw, sh, SCREEN_Z], [sw, sh, SCREEN_Z], [sw, -sh, SCREEN_Z], [-sw, -sh, SCREEN_Z]])
    screen_quad[:, 1] -= .28
    w, h = capture.size
    coeffs = warp_coefficients(camera.project(screen_quad)[:, :2], [(0, 0), (w, 0), (w, h), (0, h)])
    warped = screen_glass(capture).transform(size, Image.Transform.PERSPECTIVE, coeffs, Image.Resampling.BICUBIC)
    body.alpha_composite(warped)
    return body


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pose", choices=POSES)
    parser.add_argument("--screen", type=Path)
    parser.add_argument("--out", type=Path, default=ART)
    parser.add_argument("--avif", action="store_true", help="also produce the narrow AVIF derivative (Pillow with AVIF support)")
    args = parser.parse_args()
    if args.screen and not args.pose:
        parser.error("--screen requires --pose")
    args.out.mkdir(parents=True, exist_ok=True)
    for name in ([args.pose] if args.pose else POSES):
        product = name.split("-")[0]
        pose = POSES[name]
        with Image.open(args.screen or ART / SCREENS[product]) as capture:
            raster = render(product, pose, capture)
        exports = [("", pose.size), ("-small", pose.small)]
        if not name.endswith("-teaser"):
            exports.append(("-tiny", (300, 500)))
        for suffix, dimensions in exports:
            if dimensions is None:
                continue
            path = args.out / f"handset-{name}{suffix}.webp"
            frame = raster.resize(dimensions, Image.Resampling.LANCZOS)
            quality = 85 if dimensions[0] <= 420 else 88
            frame.save(path, format="WEBP", quality=quality, method=6, alpha_quality=92)
            print(f"{path.name} {dimensions[0]}×{dimensions[1]} {path.stat().st_size:,} bytes", flush=True)
            if args.avif and dimensions[0] == 420 and not name.endswith("-teaser"):
                with Image.open(path) as fallback:
                    fallback.save(path.with_suffix(".avif"), quality=65, speed=6)


if __name__ == "__main__":
    main()
