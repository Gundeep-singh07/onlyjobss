const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://gundeepsingh2005:JUzsLqavO5hEbpsH@cluster0.pzvbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define Blog Post Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  // Support both legacy single image and new multiple images
  image: {
    type: String,
    required: false,
  },
  imagePublicId: {
    type: String,
    required: false,
  },
  // New field to store multiple images
  images: [
    {
      url: {
        type: String,
        required: false,
      },
      publicId: {
        type: String,
        required: false,
      },
    },
  ],
  tag: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  authorImg: {
    type: String,
    default: "/api/placeholder/100/100",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  official: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "onlyjobs-blog", // The folder in Cloudinary where you want to store the images
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 1000, crop: "limit" }], // Optional: resize images on upload
  },
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// API Routes
// Get all blog posts
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured blogs (official blogs)
app.get("/api/blogs/featured", async (req, res) => {
  try {
    const featuredBlogs = await Blog.find({ official: true })
      .sort({ date: -1 })
      .limit(2);
    res.json(featuredBlogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog post
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog post not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog post with multiple image uploads
app.post("/api/blogs", async (req, res) => {
  try {
    // Handle multiple file uploads (up to 5 images)
    const uploadMultiple = upload.fields([
      { name: "image0", maxCount: 1 },
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ]);

    uploadMultiple(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        const { title, excerpt, content, tag, author, official } = req.body;
        const blogData = {
          title,
          excerpt,
          content,
          tag,
          author,
          official: official === "true",
          images: [],
        };

        // Process uploaded files if any
        if (req.files) {
          const imageFiles = req.files;

          // Add processed images to the images array
          if (Object.keys(imageFiles).length > 0) {
            blogData.images = [];

            for (const fileKey in imageFiles) {
              if (imageFiles[fileKey] && imageFiles[fileKey][0]) {
                const file = imageFiles[fileKey][0];
                blogData.images.push({
                  url: file.path,
                  publicId: file.filename,
                });
              }
            }

            // For backward compatibility, set the first image as the main image
            if (blogData.images.length > 0) {
              blogData.image = blogData.images[0].url;
              blogData.imagePublicId = blogData.images[0].publicId;
            }
          }
        }

        // If no images were uploaded, set a default
        if (!blogData.images || blogData.images.length === 0) {
          blogData.image = "/api/placeholder/400/300";
          blogData.images = [
            {
              url: "/api/placeholder/400/300",
              publicId: null,
            },
          ];
        }

        const newBlog = new Blog(blogData);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a blog post with multiple images
app.put("/api/blogs/:id", async (req, res) => {
  try {
    // Handle multiple file uploads (up to 5 images)
    const uploadMultiple = upload.fields([
      { name: "image0", maxCount: 1 },
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ]);

    uploadMultiple(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        const { title, excerpt, content, tag, author, official } = req.body;
        const updateData = {
          title,
          excerpt,
          content,
          tag,
          author,
          official: official === "true",
        };

        // Get the old blog to handle image deletion if needed
        const oldBlog = await Blog.findById(req.params.id);
        if (!oldBlog) {
          return res.status(404).json({ message: "Blog post not found" });
        }

        // Process uploaded files if any
        if (req.files && Object.keys(req.files).length > 0) {
          const imageFiles = req.files;
          updateData.images = [];

          // Add new images to the images array
          for (const fileKey in imageFiles) {
            if (imageFiles[fileKey] && imageFiles[fileKey][0]) {
              const file = imageFiles[fileKey][0];
              updateData.images.push({
                url: file.path,
                publicId: file.filename,
              });
            }
          }

          // For backward compatibility, set the first image as the main image
          if (updateData.images.length > 0) {
            updateData.image = updateData.images[0].url;
            updateData.imagePublicId = updateData.images[0].publicId;
          }

          // Delete old images from Cloudinary if they exist
          if (oldBlog.images && oldBlog.images.length > 0) {
            for (const img of oldBlog.images) {
              if (img.publicId) {
                await cloudinary.uploader.destroy(img.publicId);
              }
            }
          } else if (oldBlog.imagePublicId) {
            // Handle legacy single image
            await cloudinary.uploader.destroy(oldBlog.imagePublicId);
          }
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true }
        );

        res.json(updatedBlog);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog post
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog post not found" });

    // Delete all images from Cloudinary
    if (blog.images && blog.images.length > 0) {
      for (const img of blog.images) {
        if (img.publicId) {
          await cloudinary.uploader.destroy(img.publicId);
        }
      }
    } else if (blog.imagePublicId) {
      // Handle legacy single image
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    // Delete blog from database
    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: "Blog post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Placeholder API for testing without images
app.get("/api/placeholder/:width/:height", (req, res) => {
  const { width, height } = req.params;
  res.redirect(`https://via.placeholder.com/${width}x${height}`);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
