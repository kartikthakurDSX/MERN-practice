// middleware/authorizeBlog.js
const Blog = require("../models/Blogs");

exports.canEditOrDelete = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const blogOwner = blog.user?.toString();
    const loggedInUser = req.user.id;
    const isAdmin = req.user.role === "admin";

    if (blogOwner !== loggedInUser && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (err) {
    console.error("Authorization error:", err);
    res.status(500).json({ message: "Authorization failed" });
  }
};
