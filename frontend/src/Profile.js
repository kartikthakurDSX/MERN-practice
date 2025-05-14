import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
        setForm({ username: res.data.username, password: "" });
      } catch (error) {
        alert("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(
  //       "http://localhost:5000/api/auth/update-profile",
  //       form,
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     setUser(res.data);
  //     alert("Profile Updated Successfully");
  //   } catch (error) {
  //     alert("Failed to update Profile");
  //   }
  // };

  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("password", form.password);
    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }

    const res = await axios.put(
      "http://localhost:5000/api/auth/update-profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setUser(res.data);
    alert("Profile Updated Successfully");
  } catch (error) {
    alert("Failed to update Profile");
    console.error(error);
  }
};


const handleFileChange = (e) => {
  const file = e.target.files[0];
  setForm({ ...form, avatar: file });
};

  if (!user) return <div className="container mt-5">Loading Profile...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">User Profile</h3>
      {user.avatar && (
        <div className="mb-3">
          <img
            src={`http://localhost:5000${user.avatar}`}
            alt="avatar"
            aidth="100"
            height="100"
            style={{ borderRadius: "50%" }}
          />
        </div>
      )}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
            placeholder="Leave Blank to keep the same"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Change Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave Blank to keep the same"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
