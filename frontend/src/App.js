import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./Navbar";
import { AuthProvider } from "./contexts/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthWatcher from "./components/authWatcher";
import BlogList from "./components/blogs/BlogList";
import BlogForm from "./components/blogs/BlogForm";
import BlogDetails from "./components/blogs/BlogDetails";


function App() {
  return (
    <AuthProvider>
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
          <Route path="/blogs/:id" element={<BlogDetails />} />
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
    </AuthProvider>
  );
}

export default App;
