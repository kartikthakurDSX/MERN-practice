// src/components/AuthWatcher.js
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate, useLocation } from "react-router-dom";

const AuthWatcher = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If the token is missing and the user is not on login or register, redirect
    if (!auth.token && location.pathname !== "/" && location.pathname !== "/register") {
      navigate("/");
    }
  }, [auth.token, location.pathname, navigate]);

  return null;
};

export default AuthWatcher;
