import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");

      await API.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Article Published Successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Unable to publish article.");
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "850px",
        margin: "40px auto",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "35px",
          borderRadius: "14px",
          boxShadow: "0 5px 20px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
          }}
        >
          📝 Create New Article
        </h1>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              fontWeight: "600",
            }}
          >
            Article Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title..."
            required
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "22px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <label
            style={{
              fontWeight: "600",
            }}
          >
            Category
          </label>

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Education, Tech, Politics, Health..."
            required
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "22px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <label
            style={{
              fontWeight: "600",
            }}
          >
            Featured Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={{
              display: "block",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "350px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "25px",
              }}
            />
          )}

          <label
            style={{
              fontWeight: "600",
            }}
          >
            Article Content
          </label>

          <textarea
            rows="14"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article here..."
            required
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "30px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              resize: "vertical",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "16px",
              fontSize: "17px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🚀 Publish Article
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;