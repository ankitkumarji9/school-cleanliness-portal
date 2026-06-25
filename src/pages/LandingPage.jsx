import { useNavigate } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #ecfeff 100%)",
       
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SchoolHeader />

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            color: "#1e293b",
            fontSize: "24px",
            marginBottom: "1px",
            fontWeight: "100",
          }}
        >
          WELCOME
        </h1>

        <p
          style={{
            fontFamily: "Sans-serif",
            padding: "5px 20px",
            color: "#64748b",
            fontSize: "18px",
            boxShadow: "10px 4px 10px rgba(34, 36, 198, 0.08)",
            boxsizing: "border-box",
            
          }}
        >
          Select your role to continue
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          marginTop: "1px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {/* ADMIN CARD */}
        <div
          onClick={() => navigate("/login")}
          style={{
            width: "320px",
            height: "150px",
            borderRadius: "25px",
            cursor: "pointer",
            background:
              "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 15px 35px rgba(79,70,229,0.35)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform =
              "translateY(-8px) scale(1.03)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px) scale(1)";
          }}
        >
          <div style={{ fontSize: "60px" }}>👨‍💼</div>

          <h2
            style={{
              marginTop: "15px",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            ADMIN
          </h2>

          <p
            style={{
              marginTop: "1px",
              opacity: "0.9",
              fontSize: "15px",
            }}
          >
            Manage Complaints & Dashboard
          </p>
        </div>

        {/* STAFF CARD */}
        <div
          onClick={() => navigate("/raise-issue")}
          style={{
            width: "320px",
            height: "150px",
            borderRadius: "25px",
            cursor: "pointer",
            background:
              "linear-gradient(135deg, #10b981, #22c55e)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 15px 35px rgba(16,185,129,0.35)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform =
              "translateY(-8px) scale(1.03)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px) scale(1)";
          }}
        >
          <div style={{ fontSize: "60px" }}>👨‍🏫</div>

          <h2
            style={{
              marginTop: "15px",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            STAFF
          </h2>

          <p
            style={{
              marginTop: "1px",
              opacity: "0.9",
              fontSize: "15px",
            }}
          >
            Raise Cleanliness Complaint
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "#475569",
        }}
      >
        <h3
          style={{
            marginBottom: "1px",
            color: "#1e293b",
          }}
        >
          🏫 School Cleanliness Monitoring Portal
        </h3>

        <p
          style={{
            fontSize: "14px",
          }}
        >
          Creating a Cleaner & Better School Environment
        </p>
      </div>
    </div>
  );
}

export default LandingPage;