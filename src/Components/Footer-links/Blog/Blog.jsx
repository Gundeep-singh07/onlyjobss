import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../Footer-NavBar/Footer-NavBar";
import "./Blog.css";

// ThemeToggle Component
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (prefersDark) {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      newDarkMode ? "dark" : "light"
    );
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

// CreateBlogButton Component
const CreateBlogButton = ({ onClick }) => {
  return (
    <button className="create-blog-button" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Create Post
    </button>
  );
};

// FeaturedBlogs Component
const FeaturedBlogs = () => {
  const featuredBlogs = [
    {
      id: 1,
      title: "The Future of Professional Networking in a Digital Age",
      excerpt:
        "Discover how OnlyJobs is revolutionizing the way professionals connect and find opportunities in today's digital landscape.",
      image: "/api/placeholder/600/400",
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
      image: "/api/placeholder/600/400",
      tag: "Career Tips",
      author: "Michael Chen",
      authorImg: "/api/placeholder/100/100",
      date: "April 5, 2025",
      official: true,
    },
  ];

  return (
    <div className="featured-blogs">
      <div className="featured-blogs-header">
        <h2>OnlyJobs Official</h2>
      </div>
      <div className="featured-blogs-container">
        {featuredBlogs.map((blog) => (
          <div key={blog.id} className="featured-blog">
            <div className="featured-blog-img">
              <img src={blog.image} alt={blog.title} />
            </div>
            <div className="featured-blog-content">
              <span className="featured-blog-tag">{blog.tag}</span>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <div className="featured-blog-meta">
                <img src={blog.authorImg} alt={blog.author} />
                <span className="featured-blog-author">{blog.author}</span>
                <span className="featured-blog-date">{blog.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// BlogList Component
const BlogList = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 5 Skills Employers Are Looking For in 2025",
      excerpt:
        "Discover the most sought-after skills that will make you competitive in today's job market.",
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
      tag: "Career Change",
      author: "OnlyJobs Team",
      authorImg: "/api/placeholder/100/100",
      date: "March 20, 2025",
      official: true,
    },
  ];

  return (
    <div className="blog-list">
      {blogs.map((blog, index) => (
        <div
          key={blog.id}
          className="blog-card"
          style={{ "--animation-order": index }}
        >
          <div className="blog-card-img">
            <img src={blog.image} alt={blog.title} />
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
              <img src={blog.authorImg} alt={blog.author} />
              <span className="blog-card-author">{blog.author}</span>
              <span className="blog-card-date">{blog.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Blog Main Component
const Blog = () => {
  const navigate = useNavigate();
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    setAnimateHero(true);
  }, []);

  const handleCreatePost = () => {
    navigate("/create-blog");
  };

  return (
    <div className="onlyjobs-blog">
      <ThemeToggle />
      <NavBar />

      <section className={`blog-hero ${animateHero ? "animate" : ""}`}>
        <div className="blog-hero-content">
          <h1>OnlyJobs Blog</h1>
          <p>Insights, news, and stories from the OnlyJobs community</p>
        </div>
      </section>

      <main className="blog-main-content">
        <div className="blog-container">
          <FeaturedBlogs />
          <div className="blog-content-header">
            <h2>Latest Articles</h2>
            <CreateBlogButton onClick={handleCreatePost} />
          </div>
          <BlogList />
        </div>
      </main>
    </div>
  );
};

// CreateBlog Component
const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would save the blog post
    // For now, just navigate back to the blog page
    navigate("/blog");
  };

  return (
    <div className="onlyjobs-blog">
      <ThemeToggle />
      <NavBar />

      <main className="blog-main-content">
        <div
          className="blog-container"
          style={{ maxWidth: "800px", padding: "2rem 0" }}
        >
          <div className="create-blog-form-container">
            <h2 className="create-blog-title">Create New Blog Post</h2>
            <form onSubmit={handleSubmit} className="create-blog-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  required
                  className="create-blog-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                  id="tag"
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="E.g., Career, Tech, Personal Story"
                  required
                  className="create-blog-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                >
                  Cancel
                </button>
                <button type="submit" className="publish-button">
                  Publish Post
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
