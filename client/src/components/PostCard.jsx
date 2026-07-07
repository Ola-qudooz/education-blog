import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        transition: "0.3s",
      }}
    >
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ padding: "18px" }}>
        <span
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            display: "inline-block",
            marginBottom: "10px",
          }}
        >
          {post.category}
        </span>

        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "22px",
            lineHeight: "30px",
          }}
        >
          {post.title}
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: "1.7",
          }}
        >
          {post.content.length > 120
            ? post.content.substring(0, 120) + "..."
            : post.content}
        </p>

        <Link to={`/post/${post._id}`}>
          <button
            style={{
              marginTop: "15px",
              background: "#111827",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Read Full Article →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;