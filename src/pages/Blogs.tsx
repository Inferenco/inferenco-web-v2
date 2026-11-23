import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { BlogPost } from "../types";
import { getAssetUrl } from "../utils/assetUrl";
import i18n, { currentLocaleTag } from "../i18n";
import "./Blogs.css";

interface BlogApiResponse {
  blogs: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function Blogs() {
  const navigate = useNavigate();
  const { t } = useTranslation("blog");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [retryToken, setRetryToken] = useState(0);

  // Dates are formatted at render time, in the **active locale's** BCP 47 tag,
  // so switching language re-formats the list without a refetch. Both pages
  // coalesce `published_at ?? created_at` because the list response omits
  // `created_at` (see the Blog/Poster API contract).
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(currentLocaleTag(), {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBlogElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || error) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, error]
  );

  useEffect(() => {
    const controller = new AbortController();
    const apiUrl = import.meta.env.VITE_POSTER_API_URL || '';
    void fetch(`${apiUrl}/api/blogs?page=${page}&limit=10`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<BlogApiResponse>;
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        setBlogs((prevBlogs) => {
          const newBlogs = data.blogs.filter(
            (blog) => !prevBlogs.some((existingBlog) => existingBlog.id === blog.id)
          );
          return [...prevBlogs, ...newBlogs];
        });
        setHasMore(page * data.pagination.limit < data.pagination.total);
        setError(null);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : i18n.t("blog:index.fetchError"));
        console.error("Error fetching blogs:", err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page, retryToken]);

  return (
    <div className="blogs-page">
      <div className="container">
        <header className="page-header">
          <h1>{t("index.title")}</h1>
          <p className="page-description">{t("index.description")}</p>
        </header>

        {error && (
          <div className="error-message">
            <p>{t("index.errorLoading", { error })}</p>
            <button onClick={() => {
              setError(null);
              setLoading(true);
              setRetryToken((token) => token + 1);
            }}>{t("index.retry")}</button>
          </div>
        )}

        {blogs.length === 0 && !loading ? (
          <div className="no-blogs">
            <p>{t("index.empty")}</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog, index) => {
              // Featured image is the first asset; the Poster API serves asset URLs
              // without file extensions (/public/assets/<id>), so no extension check is possible.
              const featuredImage = blog.assets?.[0];
              
              const apiUrl = import.meta.env.VITE_POSTER_API_URL || '';

              const handleReadMore = () => {
                navigate(`/blogs/${blog.id}`);
              };

              return (
                <article
                  key={blog.id}
                  className="blog-card"
                  ref={index === blogs.length - 1 ? lastBlogElementRef : null}
                >
                  {/* Featured image */}
                  {featuredImage?.public_url && (
                    <div className="blog-featured-image-container">
                      <img
                        src={getAssetUrl(featuredImage.public_url, apiUrl) || ''}
                        alt={featuredImage.alt_text || blog.title}
                        className="blog-featured-image"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="blog-card-content">
                    <header className="blog-header">
                      <h2 onClick={handleReadMore} style={{ cursor: 'pointer' }}>
                        {blog.title}
                      </h2>
                      <time dateTime={blog.published_at || blog.created_at}>
                        {formatDate(blog.published_at ?? blog.created_at)}
                      </time>
                    </header>

                    <div className="blog-excerpt">
                      <p>{blog.excerpt || t("index.noExcerpt")}</p>
                    </div>
                  </div>

                  <footer className="blog-footer">
                    <button onClick={handleReadMore} className="read-more-button">
                      {t("index.readMore")}
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        )}

        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>{t("index.loadingMore")}</p>
          </div>
        )}

        {!hasMore && blogs.length > 0 && (
          <div className="no-more-blogs">
            <p>{t("index.end")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
