import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { legalPagePaths, legalPages, legalTemplate } from "./src/legal/build";
import { sitePages } from "./src/site/build";

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview, mode }) => ({
  plugins: [
    react(),
    legalPages(),
    sitePages(
      command === "build" ? loadEnv(mode, __dirname, "VITE_POSTER_API_URL").VITE_POSTER_API_URL ?? "" : "",
      legalPagePaths,
    ),
  ],
  appType: isPreview ? "mpa" : "spa",
  base: "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rolldownOptions: {
      input: [resolve(__dirname, "index.html"), resolve(__dirname, legalTemplate)],
    },
  },
}));
