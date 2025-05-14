// authContext.js
import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    username: null,
    role: null,
  });

  const [loading, setLoading] = useState(true); // new

  const login = (token, username, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setAuth({ token, username, role });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, username: null, role: null });
  };

  // 🔐 Check token validity on first load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
        } else {
          setAuth({
            token,
            username: localStorage.getItem("username"),
            role: localStorage.getItem("role"),
          });
        }
      } catch (err) {
        logout(); // invalid token
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
