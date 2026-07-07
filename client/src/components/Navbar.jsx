import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      style={{
        borderBottom: "1px solid #eee",
        padding: "15px 0",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#111",
          }}
        >
          <h2 style={{ fontSize: "28px", margin: 0 }}>
            📚 EduBlog
          </h2>
        </Link>

        <div
          style={{
            display: "flex",
            gap: "18px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/">Home</Link>

          {!token && (
            <Link to="/login">Admin</Link>
          )}

          {token && (
            <>
              <Link to="/dashboard">Dashboard</Link>

              <button
                onClick={logout}
                style={{
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;