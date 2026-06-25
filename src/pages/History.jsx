
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("resolutions")
      .select(`
        id,
        remarks,
        resolved_at,
        complaints (
          id,
          location,
          image_url
        )
      `)
      .order("resolved_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    setHistory(data || []);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          ← Back to Dashboard
        </button>

        <h1
          style={{
            marginBottom: "25px",
            color: "#111827",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          📜 Resolution History
        </h1>

        {history.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              background: "#fff",
              padding: "40px",
              borderRadius: "12px",
            }}
          >
            No resolution history found.
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                background: "#fff",
                borderRadius: "16px",
                padding: "14px",
                marginBottom: "16px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              {/* LEFT IMAGE */}
              <div
                style={{
                  flexShrink: 0,
                }}
              >
                {item.complaints?.image_url ? (
                  <img
                    src={item.complaints.image_url}
                    alt="Complaint"
                    onClick={() =>
                      window.open(
                        item.complaints.image_url,
                        "_blank"
                      )
                    }
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      cursor: "pointer",
                      border: "2px solid #e5e7eb",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "#e5e7eb",
                      borderRadius: "12px",
                    }}
                  />
                )}
              </div>

              {/* CENTER DETAILS */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    color: "#111827",
                    fontSize: "clamp(14px,2vw,18px)",
                  }}
                >
                  Complaint #{item.complaints?.id}
                </h3>

                <p
                  style={{
                    margin: "4px 0",
                    fontSize: "clamp(11px,1.5vw,14px)",
                  }}
                >
                  <strong>📍 Location:</strong>{" "}
                  {item.complaints?.location}
                </p>

                <p
                  style={{
                    margin: "4px 0",
                    color: "#6b7280",
                    fontSize: "clamp(10px,1.4vw,13px)",
                    lineHeight: "1.4",
                  }}
                >
                  <strong>📝 Remarks:</strong>{" "}
                  {item.remarks}
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    background: "#22c55e",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Resolved
                </div>

                <div
                  style={{
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#6b7280",
                    maxWidth: "120px",
                  }}
                >
                  {new Date(
                    item.resolved_at
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
