import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";

const BlogDetails = () => {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const userId = auth?.id;
  const userRole = auth?.role;
  const canEdit = blog?.user === userId || userRole === "admin";
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setBlog(res.data))
      .catch(() => alert("Failed to load Blog"));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Blog deleted");
        navigate("/blogs");
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  if (!blog) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container-fluid mt-4">
      <h2>{blog.title}</h2>
      <p className="text-muted">By {blog.author.username}</p>
      <p>{blog.content}</p>
      {canEdit && (
        <div className="mt-3">
          <Link to={`/blogs/edit/${blog._id}`} className="btn btn-outline-warning me-2">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-outline-danger">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
