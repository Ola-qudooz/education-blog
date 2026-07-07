import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchPosts();
    } catch (err) {
      console.log(err);
      alert("Unable to delete post.");
    }
  };

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div
      className="container"
      style={{
        paddingTop: "40px",
        paddingBottom: "60px",
      }}
    >
      <h1>Admin Dashboard</h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Welcome back, Admin 👋
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>{posts.length}</h2>
          <p>Total Posts</p>
        </div>

        <div
          style={{
            background: "#16a34a",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>{categories.length}</h2>
          <p>Categories</p>
        </div>
      </div>

      <Link to="/create">
        <button
          style={{
            background: "#111827",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "30px",
          }}
        >
          + Create New Post
        </button>
      </Link>

      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "18px",
            boxShadow: "0 3px 10px rgba(0,0,0,.08)",
            flexWrap: "wrap",
          }}
        >
          {post.image && (
            <img
              src={`http://localhost:5000/uploads/${post.image}`}
              alt={post.title}
              style={{
                width: "120px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}

          <div style={{ flex: 1 }}>
            <h3>{post.title}</h3>

            <p
              style={{
                color: "#666",
                marginTop: "5px",
              }}
            >
              {post.category}
            </p>
          </div>

          <Link to={`/post/${post._id}`}>
            <button
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "10px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              View
            </button>
          </Link>

          <Link to={`/edit/${post._id}`}>
            <button
              style={{
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                padding: "10px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              Edit
            </button>
          </Link>

          <button
            onClick={() => deletePost(post._id)}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;