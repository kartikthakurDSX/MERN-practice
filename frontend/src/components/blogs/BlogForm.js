import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setForm({ title: res.data.title, content: res.data.content });
        })
        .catch((err) => {
          alert("Failed to fetch blogs :", err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/blogs/${id}`, form, config);
        alert("Blog Updated");
      } else {
        await axios.post(`http://localhost:5000/api/blogs`, form, config);
        alert("Blog Created");
      }
      navigate("/blogs");
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h2>{id ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="content">
            Content
          </label>
          <textarea
            type="text"
            name="content"
            id="content"
            value={form.content}
            onChange={handleChange}
            className="form-control"
            rows="6"
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-outline-primary">
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;