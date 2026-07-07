import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

function Post() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
      setLikes(res.data.likes);
    } catch (err) {
      console.log(err);
    }
  };

  const likePost = async () => {
    try {
      const res = await API.put(`/posts/${id}/like`);

      setLikes(res.data.likes);
    } catch (err) {
      console.log(err);
    }
  };

  if (!post) {
    return (
      <div
        className="container"
        style={{
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2>Loading article...</h2>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        maxWidth: "900px",
        padding: "40px 20px",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: "bold",
        }}
      >
        ← Back to Home
      </Link>

      <div style={{ marginTop: "25px" }}>
        <span
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "7px 15px",
            borderRadius: "30px",
            fontSize: "13px",
          }}
        >
          {post.category}
        </span>

        <h1
          style={{
            fontSize: "42px",
            lineHeight: "1.3",
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Published on{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {post.image && (
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt={post.title}
            style={{
              width: "100%",
              borderRadius: "15px",
              marginBottom: "35px",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
        )}

        <div
          style={{
            fontSize: "19px",
            lineHeight: "2",
            color: "#333",
            whiteSpace: "pre-wrap",
            marginBottom: "35px",
          }}
        >
          {post.content}
        </div>

        <button
          onClick={likePost}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "14px 26px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "600",
          }}
        >
          👍 Like ({likes})
        </button>

        <hr
          style={{
            margin: "50px 0",
          }}
        />

        <Link to="/">
          <button
            style={{
              background: "#111827",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Back to News
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Post;