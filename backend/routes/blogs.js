const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeBlog = require("../middleware/authorizeBlog");

router.use(authMiddleware);

router.get('/', blogController.getBlogs);
router.post('/', blogController.createBlog);
router.get('/:id', blogController.getBlogById);
router.put('/:id', authorizeBlog.canEditOrDelete, blogController.updateBlog);
router.delete('/:id', authorizeBlog.canEditOrDelete, blogController.deleteBlog);

module.exports = router;