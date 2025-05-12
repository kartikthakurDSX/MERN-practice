import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation(); // detects route changes

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]); // re-check when route changes

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">My App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
