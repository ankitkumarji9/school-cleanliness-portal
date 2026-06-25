import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import NotificationBell from "../components/NotificationBell";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import logo from "../assets/logo.png";

function Dashboard() {
    const [total, setTotal] = useState(0);
    const [pending, setPending] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [resolved, setResolved] = useState(0);
    const [historyCount, setHistoryCount] = useState(0);
    const [recentComplaints, setRecentComplaints] = useState([]);
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        const { data, error } = await supabase
            .from("complaints")
            .select("*");

        if (error) {
            console.log(error);
            return;
        }

        setTotal(data.length);

        setPending(
            data.filter(
                (item) => item.status === "Pending"
            ).length
        );

        setInProgress(
            data.filter(
                (item) => item.status === "In Progress"
            ).length
        );

        setResolved(
            data.filter(
                (item) => item.status === "Resolved"
            ).length
        );

        const { count } = await supabase
            .from("resolutions")
            .select("*", {
                count: "exact",
                head: true,
            });

        setHistoryCount(count || 0);
        const { data: recentData } = await supabase
            .from("complaints")
            .select("*")
            .order("created_at", {
                ascending: false,
            })
            .limit(2);

        setRecentComplaints(recentData || []);
    };

    return (
        <div>

<div
  style={{
    width: "100%",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #ffffff, #eff6ff)",
    padding: "9px 20px",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  }}
>
  <div
    style={{
      maxWidth: "1300px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "70px 1fr 70px",
      alignItems: "center",
      gap: "12px",
    }}
  >
    {/* Left - Logo */}
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <img
        src={logo}
        alt="School Logo"
        style={{
          width: "clamp(45px, 7vw, 60px)",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>

    {/* Center - School Details */}
    <div
      style={{
        textAlign: "center",
        minWidth: 0,
      }}
    >
      <h1
        style={{
          margin: 0,
          color: "#1e3a8a",
          fontSize: "clamp(18px, 3vw, 28px)",
          fontWeight: "700",
          lineHeight: "1.2", }}
      >
        CHINMAYA VIDYALAYA
      </h1>

      <p
        style={{
          margin: "1px 0",
          color: "#b95c5c",
          fontStyle: "italic",
          fontSize: "clamp(11px, 1.8vw, 16px)",
        }}
      >
        "Actions are louder than expression of thoughts."
      </p>

      <p
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: "clamp(10px, 1.5vw, 14px)",
        }}
      >
        School Cleanliness Monitoring Portal
      </p>
    </div>

    {/* Right - Notification Bell */}
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <NotificationBell />
    </div>
  </div>
</div>
            {/* Navigation Bar */}

            <Navbar />

            {/* Statistics Section */}
            
            {/* Statistics Section */}

<div
  style={{
    padding: "13px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "15px",
      color: "#426fec",
    }}
  >
    Dashboard Statistics
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "15px",
    }}
  >
    {/* Total Complaints */}
    <div
      style={{
        background: "#1678f9",
        color: "#fff",
        borderRadius: "12px",
        padding: "15px",
        textAlign: "center",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        Total Complaints
      </h3>

      <h1
        style={{
          margin: "10px 0 0",
          fontSize: "30px",
        }}
      >
        {total}
      </h1>
    </div>

    {/* Pending
    <div
      style={{
        background: "#dc2626",
        color: "#fff",
        borderRadius: "12px",
        padding: "15px",
        textAlign: "center",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        Pending
      </h3>

      <h1
        style={{
          margin: "10px 0 0",
          fontSize: "30px",
        }}
      >
        {pending}
      </h1>
    </div> */}

    {/* In Progress */}
    <div
      style={{
        background: "#f7680f",
        color: "#fff",
        borderRadius: "12px",
        padding: "15px",
        textAlign: "center",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        In Progress
      </h3>

      <h1
        style={{
          margin: "10px 0 0",
          fontSize: "30px",
        }}
      >
        {inProgress}
      </h1>
    </div>

    {/* Resolved */}
    <div
      style={{
        background: "#22c55e",
        color: "#fff",
        borderRadius: "12px",
        padding: "15px",
        textAlign: "center",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        Resolved
      </h3>

      <h1
        style={{
          margin: "10px 0 0",
          fontSize: "30px",
        }}
      >
        {resolved}
      </h1>
    </div>

    {/* History */}
    <div
      style={{
        background: "#d30fff",
        color: "#fff",
        borderRadius: "12px",
        padding: "15px",
        textAlign: "center",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        History
      </h3>

      <h1
        style={{
          margin: "10px 0 0",
          fontSize: "30px",
        }}
      >
        {historyCount}
      </h1>
    </div>
  </div>
</div>
            {/* Recent Complaints Section */}

{/* Recent Complaints Section */}
<div
  style={{
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "0 20px",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
      color: "#ffffff",
      textAlign: "center",
    }}
  >
    Recent Complaints
  </h2>

  {recentComplaints.map((complaint) => (
    <div
      key={complaint.id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "clamp(8px,2vw,25px)",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "20px",
        padding: "clamp(10px,2vw,20px)",
        marginBottom: "20px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        backdropFilter: "blur(10px)",
        flexWrap: "nowrap",
        overflow: "hidden",
        transition: "0.3s ease",
      }}
    >
      {/* LEFT IMAGE */}
      <div
        style={{
          flexShrink: 0,
        }}
      >
        {complaint.image_url && (
          <img
            src={complaint.image_url}
            alt="Complaint"
            style={{
              width: "clamp(70px,18vw,180px)",
              height: "clamp(60px,13vw,130px)",
              objectFit: "cover",
              borderRadius: "14px",
              border: "2px solid #e2e8f0",
              display: "block",
            }}
          />
        )}
      </div>

      {/* CENTER DETAILS */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <h3
          style={{
            margin: "0 0 10px",
            color: "#0f172a",
            fontSize: "clamp(15px,2vw,26px)",
            fontWeight: "700",
            lineHeight: "1.2",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {complaint.complaint_type}
        </h3>

        <p
          style={{
            margin: "6px 0",
            color: "#64748b",
            fontSize: "clamp(11px,1.4vw,17px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          📍 <strong>Location:</strong> {complaint.location}
        </p>

        <p
          style={{
            margin: "6px 0",
            color: "#64748b",
            fontSize: "clamp(11px,1.4vw,17px)",
            whiteSpace: "nowrap",
          }}
        >
          📅 {new Date(complaint.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* RIGHT STATUS */}
      <div
        style={{
          marginLeft: "auto",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            padding: "clamp(5px,1vw,12px) clamp(10px,2vw,24px)",
            borderRadius: "50px",
            fontWeight: "700",
            fontSize: "clamp(10px,1.2vw,16px)",
            whiteSpace: "nowrap",
            textAlign: "center",

            color:
              complaint.status === "Pending"
                ? "#dc2626"
                : complaint.status === "In Progress"
                ? "#ca8a04"
                : "#16a34a",

            backgroundColor:
              complaint.status === "Pending"
                ? "#fee2e2"
                : complaint.status === "In Progress"
                ? "#fef3c7"
                : "#dcfce7",

            boxShadow:
              complaint.status === "Pending"
                ? "0 0 15px rgba(220,38,38,0.2)"
                : complaint.status === "In Progress"
                ? "0 0 15px rgba(202,138,4,0.2)"
                : "0 0 15px rgba(22,163,74,0.2)",
          }}
        >
          {complaint.status}
        </span>
      </div>
    </div>
  ))}

  <div
    style={{
      textAlign: "center",
      marginTop: "20px",
    }}
  >
    <Link
      to="/issues"
      style={{
        textDecoration: "none",
        background: "linear-gradient(135deg,#2563eb,#7c3aed)",
        color: "#fff",
        padding: "12px 28px",
        borderRadius: "12px",
        fontWeight: "700",
        fontSize: "18px",
        display: "inline-block",
        boxShadow: "0 10px 25px rgba(37,99,235,0.3)",
      }}
    >
      Show More →
    </Link>
  </div>
</div>

        </div>
        
    );
}

export default Dashboard;