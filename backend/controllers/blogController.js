const Blog = require("../models/Blogs");

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      author: req.user.id,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({message : "Failed to create blog", error : error.message});
}
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "username")
        res.json(blogs);
    } catch (error) {
        res.status(500).json({message : "Failed to fetch blogs", error : error.message});
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "username");
        if(!blog) 
            return res.status(404).json("Blog not found");

        res.json(blog);
    } catch (error) {
        res.status(500).json({message : "Failed to fetch blog", error : error.message});
    }
};

exports.updateBlog = async(req, res) => {
    try {
        const {title, content} = req.body;
        const blog = await Blog.findById(req.params.id);
        if(!blog) return res.status(404).json({message : 'Blog not found'});
        if(blog.author.toString() !== req.user.id) 
            return res.status(403).json({message : 'Not Authorized to update this blog'});
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.updatedAt = new Date;

        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({message : "Failed to update blog", error : error.message});
    }
};

exports.deleteBlog = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog) return res.status(404).json({message : 'Blog not found'});
        if(blog.author.toString() !== req.user.id) 
            return res.status(403).json({message : 'Not Authorized to update this blog'});
        
        await Blog.findByIdAndDelete(req.params.id);
        res.json({message : "Blog deleted"});
    } catch (error) {
        res.status(500).json({message : "Failed to delete blog", error : error.message});
    }
};
