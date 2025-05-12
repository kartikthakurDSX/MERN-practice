import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Your Username"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="form-control"
          placeholder="Enter Your Password"
          required
        />
        </div>
        <button type="submit" className="btn btn-outline-success">Login</button>
      </form>
    </div>
  );
}

export default Login;
