import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#0e2e86",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left Side Navigation */}
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Home
        </Link>

        <Link
          to="/issues"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Complaints
        </Link>

        <Link
          to="/history"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          History
        </Link>
      </div>

      {/* Right Side Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#dc2626",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;