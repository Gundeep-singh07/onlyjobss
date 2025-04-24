import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../Footer-NavBar/Footer-NavBar";
import "./Blog.css";

// API service functions
const API_URL = "http://localhost:3005/api";

const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

const getFeaturedBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs/featured`);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    throw error;
  }
};

// Add missing createBlog API function
const createBlogPost = async (blogData) => {
  try {
    const response = await axios.post(`${API_URL}/blogs`, blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};

// Add missing ThemeToggle component
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      className={`theme-toggle ${darkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

// Add missing CreateBlogButton component
const CreateBlogButton = ({ onClick }) => {
  return (
    <button className="create-blog-button" onClick={onClick}>
      Create Post
    </button>
  );
};

// Update the FeaturedBlogs component to handle array of images
const FeaturedBlogs = ({ blogs }) => {
  return (
    <section className="featured-blogs">
      <h2>Featured Articles</h2>
      <div className="featured-blogs-grid">
        {blogs.map((blog) => (
          <div key={blog._id || blog.id} className="featured-blog-card">
            <div className="featured-blog-image">
              <img src={blog.images?.[0]?.url || blog.image} alt={blog.title} />
            </div>
            <div className="featured-blog-content">
              <span
                className={`blog-tag ${blog.official ? "official" : "user"}`}
              >
                {blog.official ? "OnlyJobs" : blog.tag}
              </span>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <div className="featured-blog-meta">
                <span className="featured-blog-date">
                  {blog.date instanceof Date
                    ? `${new Date(blog.date).getDate()} ${new Date(
                        blog.date
                      ).toLocaleDateString("en-US", {
                        month: "long",
                      })}, ${new Date(blog.date).getFullYear()}`
                    : blog.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Fix the createBlog component
const createBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tag: "",
    author: "User Name", // In a real app, get from auth state
    official: false,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isConnectedToServer, setIsConnectedToServer] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    const newImages = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload only image files.");
        return;
      }

      newImages.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setImages([...images, ...newImages].slice(0, 5));
          setImagePreviews([...imagePreviews, ...newPreviews].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePrevImage = () => {
    setCurrentPreviewIndex((prevIndex) =>
      prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentPreviewIndex((prevIndex) =>
      prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    // Validate required fields
    if (!formData.title || !formData.content || !formData.tag) {
      setError("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    // If excerpt is empty, create one from content
    if (!formData.excerpt) {
      // Create excerpt from content (first 150 characters)
      const excerpt =
        formData.content.substring(0, 150) +
        (formData.content.length > 150 ? "..." : "");
      setFormData((prev) => ({ ...prev, excerpt }));
      formData.excerpt = excerpt;
    }

    try {
      // Create a FormData instance to handle file upload
      const blogFormData = new FormData();
      blogFormData.append("title", formData.title);
      blogFormData.append("excerpt", formData.excerpt);
      blogFormData.append("content", formData.content);
      blogFormData.append("tag", formData.tag);
      blogFormData.append("author", formData.author);
      blogFormData.append("official", formData.official);

      // Append all images
      images.forEach((image, index) => {
        blogFormData.append(`image${index}`, image);
      });

      // Send the form data to the server using the createBlogPost function
      await createBlogPost(blogFormData);
      navigate("/blog");
    } catch (err) {
      console.error("Error creating blog post:", err);
      setIsConnectedToServer(false);
      // If server connection fails, just navigate back
      // In a real app, you might want to save locally or show proper error
      alert(
        "Couldn't connect to server. In a real app, we'd handle this better."
      );
      navigate("/blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="onlyjobs-blog">
      {/* ThemeToggle removed */}
      <NavBar />
      {!isConnectedToServer && (
        <div className="server-notice">
          <p>Server connection unavailable</p>
        </div>
      )}
      <main className="blog-main-content">
        <div
          className="blog-container"
          style={{ maxWidth: "800px", padding: "2rem 0" }}
        >
          <div className="create-blog-form-container">
            <h2 className="create-blog-title">Create New Blog Post</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="create-blog-form">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  required
                  className="create-blog-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Write a brief summary (1-2 sentences) or leave blank to auto-generate from content"
                  rows={2}
                  className="create-blog-textarea"
                />
              </div>
              <div className="form-group">
                <label htmlFor="tag">Tag *</label>
                <input
                  id="tag"
                  name="tag"
                  type="text"
                  value={formData.tag}
                  onChange={handleChange}
                  placeholder="E.g., Career, Tech, Personal Story"
                  required
                  className="create-blog-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="images">Featured Images (Up to 5)</label>
                <input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="create-blog-file-input"
                />
                {imagePreviews.length > 0 && (
                  <div className="image-preview-container">
                    <div className="image-preview-wrapper">
                      <div className="image-preview-item">
                        <img
                          src={imagePreviews[currentPreviewIndex]}
                          alt={`Preview ${currentPreviewIndex + 1}`}
                        />
                      </div>

                      {imagePreviews.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="image-nav-button prev"
                            onClick={handlePrevImage}
                            aria-label="Previous image"
                          >
                            &#10094;
                          </button>
                          <button
                            type="button"
                            className="image-nav-button next"
                            onClick={handleNextImage}
                            aria-label="Next image"
                          >
                            &#10095;
                          </button>

                          <div className="image-preview-indicators">
                            {imagePreviews.map((_, index) => (
                              <span
                                key={index}
                                className={`image-indicator ${
                                  index === currentPreviewIndex ? "active" : ""
                                }`}
                                onClick={() => setCurrentPreviewIndex(index)}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      <div className="image-count">
                        {currentPreviewIndex + 1} / {imagePreviews.length}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog post here..."
                  rows={10}
                  required
                  className="create-blog-textarea"
                />
              </div>
              <div className="create-blog-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate("/blog")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="publish-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

// BlogList Component
const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog, index) => (
        <BlogCard key={blog._id || blog.id} blog={blog} index={index} />
      ))}
    </div>
  );
};

// Update BlogCard component
const BlogCard = ({ blog, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = blog.images?.map((img) => img.url) || [blog.image];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="blog-card" style={{ "--animation-order": index }}>
      <div className="blog-card-img-container">
        <div className="blog-card-img">
          <img src={images[currentImageIndex]} alt={blog.title} />
        </div>

        {images.length > 1 && (
          <>
            <button
              className="blog-card-nav-button prev"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <button
              className="blog-card-nav-button next"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              &#10095;
            </button>

            <div className="blog-card-indicators">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`blog-card-indicator ${
                    idx === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="blog-card-content">
        <span
          className={`blog-card-tag ${blog.official ? "official" : "user"}`}
        >
          {blog.official ? "OnlyJobs" : blog.tag}
        </span>
        <h3>{blog.title}</h3>
        <p>{blog.excerpt}</p>
        <div className="blog-card-meta">
          <span className="blog-card-date">
            {blog.date instanceof Date
              ? `${new Date(blog.date).getDate()} ${new Date(
                  blog.date
                ).toLocaleDateString("en-US", {
                  month: "long",
                })}, ${new Date(blog.date).getFullYear()}`
              : blog.date}
          </span>
        </div>
      </div>
    </div>
  );
};

// Blog Main Component
const Blog = () => {
  const navigate = useNavigate();
  const [animateHero, setAnimateHero] = useState(false);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [regularBlogs, setRegularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnectedToServer, setIsConnectedToServer] = useState(true);
  // Initialize theme state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    setAnimateHero(true);

    // Apply theme based on localStorage
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    // Fetch blogs from the server
    const fetchBlogs = async () => {
      try {
        // Try to connect to server
        const [featured, all] = await Promise.all([
          getFeaturedBlogs(),
          getAllBlogs(),
        ]);
        setFeaturedBlogs(featured);
        // Filter out featured blogs from regular blogs list
        const featuredIds = new Set(featured.map((blog) => blog._id));
        const regular = all.filter((blog) => !featuredIds.has(blog._id));
        setRegularBlogs(regular);
        setIsConnectedToServer(true);
        setLoading(false);
      } catch (err) {
        console.error("Error loading blogs from server:", err);
        setIsConnectedToServer(false);
        loadMockData();
      }
    };

    // Fallback to mock data if server connection fails
    const loadMockData = () => {
      console.log("Loading mock data instead");
      // Use the mock data from the original component
      const mockFeaturedBlogs = [
        {
          id: 1,
          title: "The Future of Professional Networking in a Digital Age",
          excerpt:
            "Discover how OnlyJobs is revolutionizing the way professionals connect and find opportunities in today's digital landscape.",
          images: [
            "/api/placeholder/600/600",
            "/api/placeholder/601/601",
            "/api/placeholder/602/602",
          ],
          tag: "Featured",
          author: "Sarah Johnson",
          authorImg: "/api/placeholder/100/100",
          date: "April 8, 2025",
          official: true,
        },
        {
          id: 2,
          title: "How to Stand Out in a Competitive Job Market",
          excerpt:
            "Learn key strategies to make your profile and applications stand out to recruiters and potential employers.",
          images: ["/api/placeholder/600/600", "/api/placeholder/601/601"],
          tag: "Career Tips",
          author: "Michael Chen",
          authorImg: "/api/placeholder/100/100",
          date: "April 5, 2025",
          official: true,
        },
      ];

      const mockRegularBlogs = [
        {
          id: 1,
          title: "Top 5 Skills Employers Are Looking For in 2025",
          excerpt:
            "Discover the most sought-after skills that will make you competitive in today's job market.",
          images: [
            "/api/placeholder/400/400",
            "/api/placeholder/401/401",
            "/api/placeholder/402/402",
            "/api/placeholder/403/403",
          ],
          tag: "Career",
          author: "OnlyJobs Team",
          authorImg: "/api/placeholder/100/100",
          date: "April 3, 2025",
          official: true,
        },
        {
          id: 2,
          title: "How I Landed My Dream Job Through Networking",
          excerpt:
            "A personal story of how building professional relationships led to unexpected opportunities.",
          image: "/api/placeholder/400/400",
          tag: "Success Story",
          author: "Jennifer Lee",
          authorImg: "/api/placeholder/100/100",
          date: "March 29, 2025",
          official: false,
        },
        {
          id: 3,
          title: "Remote Work: Tips for Staying Productive",
          excerpt:
            "Practical advice for maintaining high productivity when working from home.",
          images: ["/api/placeholder/400/400", "/api/placeholder/401/401"],
          tag: "Work Life",
          author: "David Wilson",
          authorImg: "/api/placeholder/100/100",
          date: "March 27, 2025",
          official: false,
        },
        {
          id: 4,
          title: "Mastering the Technical Interview",
          excerpt:
            "Strategies to prepare for and excel in technical interviews across various industries.",
          image: "/api/placeholder/400/400",
          tag: "Interviews",
          author: "OnlyJobs Team",
          authorImg: "/api/placeholder/100/100",
          date: "March 25, 2025",
          official: true,
        },
        {
          id: 5,
          title: "The Importance of a Strong Professional Brand",
          excerpt:
            "Why your personal brand matters more than ever in today's job market.",
          images: [
            "/api/placeholder/400/400",
            "/api/placeholder/401/401",
            "/api/placeholder/402/402",
          ],
          tag: "Personal Branding",
          author: "Alex Rivera",
          authorImg: "/api/placeholder/100/100",
          date: "March 22, 2025",
          official: false,
        },
        {
          id: 6,
          title: "Navigating Career Changes in Uncertain Times",
          excerpt:
            "How to make successful career transitions even during periods of economic uncertainty.",
          image: "/api/placeholder/400/400",
          tag: "Career Change",
          author: "OnlyJobs Team",
          authorImg: "/api/placeholder/100/100",
          date: "March 20, 2025",
          official: true,
        },
      ];

      setFeaturedBlogs(mockFeaturedBlogs);
      setRegularBlogs(mockRegularBlogs);
      setLoading(false);
    };

    fetchBlogs();
  }, [darkMode]);

  const handleCreatePost = () => {
    navigate("/create-blog");
  };

  return (
    <div className="onlyjobs-blog">
      {/* ThemeToggle removed */}
      <NavBar />
      {!isConnectedToServer && (
        <div className="server-notice">
          <p>Using mock data (server connection unavailable)</p>
        </div>
      )}
      <section className={`blog-hero ${animateHero ? "animate" : ""}`}>
        <div className="blog-hero-content">
          <h1>OnlyJobs Blog</h1>
          <p>Insights, news, and stories from the OnlyJobs community</p>
        </div>
      </section>
      <main className="blog-main-content">
        <div className="blog-container">
          {loading ? (
            <div className="loading-state">Loading blog posts...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : (
            <>
              {featuredBlogs.length > 0 && (
                <FeaturedBlogs blogs={featuredBlogs} />
              )}
              <div className="blog-content-header">
                <h2>Latest Articles</h2>
                <CreateBlogButton onClick={handleCreatePost} />
              </div>
              {regularBlogs.length > 0 ? (
                <BlogList blogs={regularBlogs} />
              ) : (
                <div className="no-blogs-message">
                  No blog posts found. Be the first to create one!
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// CreateBlog Component (This one has a capital C)
const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tag: "",
    author: "User Name", // In a real app, get from auth state
    official: false,
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isConnectedToServer, setIsConnectedToServer] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    const newImages = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload only image files.");
        return;
      }

      newImages.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setImages([...images, ...newImages].slice(0, 5));
          setImagePreviews([...imagePreviews, ...newPreviews].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePrevImage = () => {
    setCurrentPreviewIndex((prevIndex) =>
      prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentPreviewIndex((prevIndex) =>
      prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    // Validate required fields
    if (!formData.title || !formData.content || !formData.tag) {
      setError("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    // If excerpt is empty, create one from content
    if (!formData.excerpt) {
      // Create excerpt from content (first 150 characters)
      const excerpt =
        formData.content.substring(0, 150) +
        (formData.content.length > 150 ? "..." : "");
      setFormData((prev) => ({ ...prev, excerpt }));
      formData.excerpt = excerpt;
    }

    try {
      // Try to submit to server
      const blogFormData = new FormData();

      // Add all form data fields to FormData
      Object.keys(formData).forEach((key) => {
        blogFormData.append(key, formData[key]);
      });

      // Add images if present
      images.forEach((image, index) => {
        blogFormData.append(`image${index}`, image);
      });

      // Use the createBlogPost function
      await createBlogPost(blogFormData);
      navigate("/blog");
    } catch (err) {
      console.error("Error creating blog post:", err);
      setIsConnectedToServer(false);
      // If server connection fails, just navigate back
      // In a real app, you might want to save locally or show proper error
      alert(
        "Couldn't connect to server. In a real app, we'd handle this better."
      );
      navigate("/blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="onlyjobs-blog">
      {/* ThemeToggle removed */}
      <NavBar />
      {!isConnectedToServer && (
        <div className="server-notice">
          <p>Server connection unavailable</p>
        </div>
      )}
      <main className="blog-main-content">
        <div
          className="blog-container"
          style={{ maxWidth: "800px", padding: "2rem 0" }}
        >
          <div className="create-blog-form-container">
            <h2 className="create-blog-title">Create New Blog Post</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="create-blog-form">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  required
                  className="create-blog-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Write a brief summary (1-2 sentences) or leave blank to auto-generate from content"
                  rows={2}
                  className="create-blog-textarea"
                />
              </div>
              <div className="form-group">
                <label htmlFor="tag">Tag *</label>
                <input
                  id="tag"
                  name="tag"
                  type="text"
                  value={formData.tag}
                  onChange={handleChange}
                  placeholder="E.g., Career, Tech, Personal Story"
                  required
                  className="create-blog-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="images">Featured Images (Up to 5)</label>
                <input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="create-blog-file-input"
                />
                {imagePreviews.length > 0 && (
                  <div className="image-preview-container">
                    <div className="image-preview-wrapper">
                      <div className="image-preview-item">
                        <img
                          src={imagePreviews[currentPreviewIndex]}
                          alt={`Preview ${currentPreviewIndex + 1}`}
                        />
                      </div>

                      {imagePreviews.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="image-nav-button prev"
                            onClick={handlePrevImage}
                            aria-label="Previous image"
                          >
                            &#10094;
                          </button>
                          <button
                            type="button"
                            className="image-nav-button next"
                            onClick={handleNextImage}
                            aria-label="Next image"
                          >
                            &#10095;
                          </button>

                          <div className="image-preview-indicators">
                            {imagePreviews.map((_, index) => (
                              <span
                                key={index}
                                className={`image-indicator ${
                                  index === currentPreviewIndex ? "active" : ""
                                }`}
                                onClick={() => setCurrentPreviewIndex(index)}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      <div className="image-count">
                        {currentPreviewIndex + 1} / {imagePreviews.length}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog post here..."
                  rows={10}
                  required
                  className="create-blog-textarea"
                />
              </div>
              <div className="create-blog-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate("/blog")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="publish-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Blog, CreateBlog };
