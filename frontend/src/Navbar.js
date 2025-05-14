import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={auth?.token ? "/dashboard" : "/"}>
          My App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {auth?.token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blogs">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}
            {auth?.role === "admin" && (
              <li className="nav-item">
                <Link to="/settings" className="btn btn-outline-warning me-2">
                  Settings
                </Link>
              </li>
            )}
            {auth?.token ? (
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/" className="btn btn-outline-light me-2">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-outline-light">
                  Register
                </Link>
              </li>
            </>
          )}
          </ul>
        </div>
      </div>
    </nav>
  );
  // }
};

export default Navbar;
