import logo from "../assets/logo.png";

function SchoolHeader() {
  return (
<div
  style={{
    width: "100%",
    boxSizing: "border-box",   // ← ADD THIS
    background: "linear-gradient(135deg, #ffffff, #eff6ff)",
    padding: "10px 15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    borderBottom: "1px solid #e2e8f0",
  }}
>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "0px",
          flexWrap: "nowrap",
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="School Logo"
          style={{
            width: "clamp(45px, 8vw, 65px)",
            height: "auto",
            objectFit: "contain",
            flexShrink: 0,
          }}
        />

        {/* School Details */}
        <div
          style={{
            justifyContent: "center",
            minWidth: 0,
            flex: 1,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#1e3a8a",
              fontSize: "clamp(30px, 3vw, 24px)",
              fontWeight: "700",
              lineHeight: "1.2",
            }}
          >
            Chinmaya Vidyalaya
          </h1>

          <p
            style={{
              margin: "4px 0",
              color: "#475569",
              fontSize: "clamp(11px, 2vw, 16px)",
              fontStyle: "italic",
              lineHeight: "1.3",
            }}
          >
            "Actions are louder than expression of thoughts."
          </p>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "clamp(10px, 1.8vw, 14px)",
              lineHeight: "1.3",
            }}
          >
            School Cleanliness Monitoring Portal
          </p>
        </div>
      </div>
    </div>
  );
}

export default SchoolHeader;