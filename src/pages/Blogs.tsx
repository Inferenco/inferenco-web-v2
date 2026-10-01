import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { BlogPost } from "../types";
import { getAssetUrl } from "../utils/assetUrl";
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

interface BlogWithFormattedDate extends BlogPost {
  formattedDate: string;
}

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogWithFormattedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [retryToken, setRetryToken] = useState(0);

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
        const formattedBlogs = data.blogs.map((blog) => ({
          ...blog,
          formattedDate: new Date(blog.published_at || blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }));

        setBlogs((prevBlogs) => {
          const newBlogs = formattedBlogs.filter(
            (newBlog) => !prevBlogs.some((existingBlog) => existingBlog.id === newBlog.id)
          );
          return [...prevBlogs, ...newBlogs];
        });
        setHasMore(page * data.pagination.limit < data.pagination.total);
        setError(null);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Failed to fetch blogs");
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
          <h1>Inferenco Blogs</h1>
          <p className="page-description">
            Latest news, updates, and insights from the Inferenco team.
          </p>
        </header>

        {error && (
          <div className="error-message">
            <p>Error loading blogs: {error}</p>
            <button onClick={() => {
              setError(null);
              setLoading(true);
              setRetryToken((token) => token + 1);
            }}>Retry</button>
          </div>
        )}

        {blogs.length === 0 && !loading ? (
          <div className="no-blogs">
            <p>No blogs have been published yet.</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog, index) => {
              // Get featured image (first image asset)
              const featuredImage = blog.assets?.find(a => a.public_url && a.public_url.endsWith('.png')) 
                || blog.assets?.find(a => a.public_url && a.public_url.endsWith('.jpg'))
                || blog.assets?.find(a => a.public_url && a.public_url.endsWith('.jpeg'))
                || blog.assets?.find(a => a.public_url && a.public_url.endsWith('.webp'))
                || blog.assets?.[0];
              
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
                        {blog.formattedDate}
                      </time>
                    </header>

                    <div className="blog-excerpt">
                      <p>{blog.excerpt || 'No excerpt available'}</p>
                    </div>
                  </div>

                  <footer className="blog-footer">
                    <button onClick={handleReadMore} className="read-more-button">
                      Read more →
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
            <p>Loading more blogs...</p>
          </div>
        )}

        {!hasMore && blogs.length > 0 && (
          <div className="no-more-blogs">
            <p>You've reached the end of all blogs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
