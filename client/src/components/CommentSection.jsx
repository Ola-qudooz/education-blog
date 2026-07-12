import { useEffect, useState } from "react";
import API from "../api/api";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await API.post("/comments", {
        post: postId,
        name,
        message,
      });

      setName("");
      setMessage("");

      fetchComments();
    } catch (err) {
      console.log(err);
      alert("Unable to post comment.");
    }
  };

  return (
    <div
      style={{
        marginTop: "60px",
      }}
    >
      <h2>Comments ({comments.length})</h2>

      <form
        onSubmit={submitComment}
        style={{
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          placeholder="Write a comment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Post Comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p
          style={{
            color: "#666",
          }}
        >
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              background: "#f8f8f8",
              padding: "18px",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            <h4
              style={{
                marginBottom: "5px",
              }}
            >
              {comment.name}
            </h4>

            <small
              style={{
                color: "#777",
              }}
            >
              {new Date(comment.createdAt).toLocaleString()}
            </small>

            <p
              style={{
                marginTop: "10px",
                whiteSpace: "pre-wrap",
              }}
            >
              {comment.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentSection;