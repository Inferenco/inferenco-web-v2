import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { BlogPost } from "../types";
import { getAssetUrl } from "../utils/assetUrl";
import "./Blogs.css";

interface BlogSingleApiResponse {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  assets: {
    id: string;
    alt_text: string | null;
    public_url: string | null;
    path: string | null;
  }[];
}

export default function BlogSingle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_POSTER_API_URL || '';
        const response = await fetch(`${apiUrl}/api/blogs/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogSingleApiResponse = await response.json();
        
        // Transform to BlogPost type
        const blogPost: BlogPost = {
          id: data.id,
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          published_at: data.published_at,
          assets: data.assets.map(asset => ({
            id: asset.id,
            alt_text: asset.alt_text,
            public_url: asset.public_url,
            path: asset.path
          }))
        };
        
        setBlog(blogPost);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blog post");
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="blogs-page">
        <div className="container">
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogs-page">
        <div className="container">
          <div className="error-message">
            <p>Error loading blog post: {error}</p>
            <button onClick={() => navigate('/blogs')}>Back to Blogs</button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blogs-page">
        <div className="container">
          <div className="no-blogs">
            <p>Blog post not found.</p>
            <button onClick={() => navigate('/blogs')}>Back to Blogs</button>
          </div>
        </div>
      </div>
    );
  }

  // Get featured image (first image asset)
  const featuredImage = blog.assets?.find(a => a.public_url && a.public_url.endsWith('.png')) 
    || blog.assets?.find(a => a.public_url && a.public_url.endsWith('.jpg'))
    || blog.assets?.find(a => a.public_url && a.public_url.endsWith('.jpeg'))
    || blog.assets?.find(a => a.public_url && a.public_url.endsWith('.webp'))
    || blog.assets?.[0];
  
  const apiUrl = import.meta.env.VITE_POSTER_API_URL || '';

  return (
    <div className="blogs-page">
      <div className="container">
        <article className="blog-single">
          {/* Back navigation */}
          <nav className="blog-back-nav">
            <button onClick={() => navigate('/blogs')} className="back-button">
              ← Back to Blogs
            </button>
          </nav>

          {/* Header */}
          <header className="blog-single-header">
            <h1>{blog.title}</h1>
            <div className="blog-meta">
              <time dateTime={blog.published_at || blog.created_at || ''}>
                Published: {formatDate(blog.published_at || blog.created_at)}
              </time>
            </div>
          </header>

          {/* Featured image */}
          {featuredImage?.public_url && (
            <div className="blog-featured-image-container">
              <img
                src={getAssetUrl(featuredImage.public_url, apiUrl) || ''}
                alt={featuredImage.alt_text || blog.title}
                className="blog-featured-image"
              />
            </div>
          )}

          {/* Content */}
          <div className="blog-single-content">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          {/* Assets gallery (if there are additional images) */}
          {blog.assets && blog.assets.length > (featuredImage ? 1 : 0) && (
            <div className="blog-assets-gallery">
              <h3>Gallery</h3>
              <div className="blog-assets">
                {blog.assets
                  .filter(asset => featuredImage ? asset.id !== featuredImage.id : true)
                  .map((asset) => {
                    const url = asset.public_url || asset.path || '';
                    const finalUrl = getAssetUrl(url, apiUrl) || '';
                    return (
                      <img
                        key={asset.id}
                        src={finalUrl}
                        alt={asset.alt_text || 'Blog image'}
                        className="blog-asset-image"
                      />
                    );
                  })}
              </div>
            </div>
          )}

          {/* Back to blogs */}
          <footer className="blog-single-footer">
            <button onClick={() => navigate('/blogs')} className="back-button">
              ← Back to All Blogs
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}
