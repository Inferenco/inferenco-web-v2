import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { BlogPost } from "../types";
import { getAssetUrl } from "../utils/assetUrl";
import { currentLocaleTag } from "../i18n";
import "./Blogs.css";

interface BlogApiResponse {
  blogs: BlogPost[];
  pagination: {
    page: number;
    pages: number;
  };
}

const apiUrl = (import.meta.env.VITE_POSTER_API_URL || "").replace(/\/$/, "");
const articleLimit = 10;

function displayDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(currentLocaleTag(), { dateStyle: "long" });
}

export default function Blogs() {
  const { t } = useTranslation("blog");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [request, setRequest] = useState({ page: 1 });
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    void fetch(`${apiUrl}/api/blogs?page=${request.page}&limit=${articleLimit}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Poster API returned ${response.status}`);
        const data = (await response.json()) as BlogApiResponse;
        if (!Array.isArray(data.blogs) || !data.pagination) throw new Error("Invalid article listing");
        if (controller.signal.aborted) return;
        setBlogs((previous) => {
          const merged = new Map(previous.map((post) => [post.id, post]));
          for (const post of data.blogs) merged.set(post.id, post);
          return [...merged.values()];
        });
        setHasMore(request.page < data.pagination.pages);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });

    return () => controller.abort();
  }, [request]);

  function load(page: number) {
    setStatus("loading");
    setRequest({ page });
  }

  return (
    <div className="studio-journal">
      <header className="studio-journal-intro">
        <h1>{t("index.title")}</h1>
        <p>{t("index.description")}</p>
      </header>

      {blogs.length > 0 && (
        <div className="studio-journal-posts">
          {blogs.map((blog, index) => {
            const featured = index === 0;
            const image = blog.assets?.[0];
            const imageUrl = getAssetUrl(image?.public_url ?? null, apiUrl);
            const date = blog.published_at ?? blog.created_at;
            const formattedDate = date && displayDate(date);
            const path = `/blogs/${encodeURIComponent(blog.id)}/`;

            return (
              <article className={featured ? "studio-journal-card is-featured" : "studio-journal-card"} key={blog.id}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={image?.alt_text ?? ""}
                    lang="en"
                    loading={featured ? "eager" : "lazy"}
                    className="studio-journal-image"
                  />
                )}
                <div className="studio-journal-card-body">
                  {formattedDate && <time dateTime={date}>{formattedDate}</time>}
                  <h2><Link to={path}><bdi lang="en">{blog.title}</bdi></Link></h2>
                  {blog.excerpt && <p dir="auto" lang="en">{blog.excerpt}</p>}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="studio-journal-status" role="status">
        {status === "loading" && <p>{t("index.loadingMore")}</p>}
        {status === "ready" && blogs.length === 0 && <p>{t("index.empty")}</p>}
        {status === "error" && <p>{t("index.fetchError")}</p>}
      </div>
      {status === "error" && (
        <button className="studio-journal-action" type="button" onClick={() => load(request.page)}>
          {t("index.retry")}
        </button>
      )}
      {hasMore && status !== "error" && (
        <button
          className="studio-journal-action"
          type="button"
          aria-disabled={status === "loading"}
          onClick={() => {
            if (status === "ready") load(request.page + 1);
          }}
        >
          {t("index.loadMore")}
        </button>
      )}
    </div>
  );
}
