import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs :", error);
      }
    };
    fetchBlogs();
  }, [auth.token]);

  return (
    <div className="container-fluid mt-4">
      <h2>All Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="card mb-3">
          <div className="caed-header">
            <div className="card-title">{blog.title}</div>
            <Link to={`/blogs/${blog._id}`}>Show</Link>
          </div>
          <div className="card-body">
            <p className="card-text">{blog.content}</p>
            <small className="text-muted">By {blog.author.username}</small>
          </div>
        </div>
      ))}
      <Link to="/blogs/new" className="btn btn-outline-primary position-fixed bottom-0 end-0 me-3 mb-3">Create</Link>
    </div>
  );
}

export default BlogList;
