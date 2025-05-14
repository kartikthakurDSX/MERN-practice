import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./Navbar";
import { AuthProvider, AuthContext } from "./contexts/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthWatcher from "./components/authWatcher";
import BlogList from "./components/blogs/BlogList";
import BlogForm from "./components/blogs/BlogForm";
import BlogDetails from "./components/blogs/BlogDetails";
import { useContext } from "react";

function AppContent() {
  const { loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Navbar />
      <AuthWatcher />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <BlogList />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs/new"
          element={
            <PrivateRoute>
              <BlogForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs/edit/:id"
          element={
            <PrivateRoute>
              <BlogForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <PrivateRoute>
              <BlogDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
