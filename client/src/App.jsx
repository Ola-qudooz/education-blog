import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Post />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;