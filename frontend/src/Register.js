import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("User Created Successfully");
      navigate("/");
    } catch (error) {
      alert(error.response.data.message || "Registration Failed");
    }
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Your Username"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
