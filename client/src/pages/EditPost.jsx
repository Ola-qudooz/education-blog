import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);

      setTitle(res.data.title);
      setCategory(res.data.category);
      setContent(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await API.put(`/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Article Updated Successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Unable to update article.");
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "750px",
        margin: "40px auto",
      }}
    >
      <h1 style={{ marginBottom: "25px" }}>
        Edit Article
      </h1>

      <form onSubmit={updatePost}>

        <label>Title</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "18px",
          }}
        />

        <label>Category</label>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "18px",
          }}
        />

        <label>Replace Image (optional)</label>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            marginBottom: "18px",
          }}
        />

        <label>Content</label>

        <textarea
          rows="14"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "25px",
          }}
        />

        <button
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "14px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}

export default EditPost;