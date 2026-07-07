import { useEffect, useState } from "react";
import API from "../api/api";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    API.get("/posts").then((res) => {
      const data = res.data;

      setPosts(data);
      setFiltered(data);

      const uniqueCategories = [
        "All",
        ...new Set(data.map((post) => post.category)),
      ];

      setCategories(uniqueCategories);
    });
  }, []);

  const filterCategory = (category) => {
    setActive(category);

    if (category === "All") {
      setFiltered(posts);
    } else {
      setFiltered(
        posts.filter((post) => post.category === category)
      );
    }
  };

  return (
    <>
      <section
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: "70px 20px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "48px" }}>
            EduNews Nigeria
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "20px auto",
              lineHeight: "32px",
              fontSize: "18px",
            }}
          >
            Trusted Education, Technology, Economy and National News.
          </p>
        </div>
      </section>

      <div
        className="container"
        style={{ paddingTop: "50px" }}
      >
        <h2 style={{ marginBottom: "25px" }}>
          Latest News
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterCategory(cat)}
              style={{
                background:
                  active === cat ? "#2563eb" : "#eee",
                color:
                  active === cat ? "#fff" : "#000",
                border: "none",
                borderRadius: "25px",
                padding: "10px 18px",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(330px,1fr))",
            gap: "25px",
          }}
        >
          {filtered.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))}
        </div>
      </div>

      <footer
        style={{
          marginTop: "70px",
          background: "#111827",
          color: "#fff",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h2>EduNews Nigeria</h2>

        <p>
          Developed by Qudus Olaoluwa
        </p>

        <p>
          Department of Computer Science
        </p>

        <p>
          Final Year Project 2026
        </p>
      </footer>
    </>
  );
}

export default Home;