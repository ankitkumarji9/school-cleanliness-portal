
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

function Issues() {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setIssues(data || []);
  };

  const updateStatus = async (complaintId, newStatus) => {
    const { error } = await supabase
      .from("complaints")
      .update({ status: newStatus })
      .eq("id", complaintId);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    fetchIssues();
  };

  const resolveIssue = async (complaintId) => {
    const remarks = prompt("Enter Resolution Remarks");

    if (!remarks) return;

    const { error: complaintError } = await supabase
      .from("complaints")
      .update({
        status: "Resolved",
      })
      .eq("id", complaintId);

    if (complaintError) {
      console.log(complaintError);
      alert(complaintError.message);
      return;
    }

    const { error: resolutionError } = await supabase
      .from("resolutions")
      .insert([
        {
          complaint_id: complaintId,
          remarks: remarks,
        },
      ]);

    if (resolutionError) {
      console.log(resolutionError);
      alert(resolutionError.message);
      return;
    }

    alert("Complaint Resolved Successfully");
    fetchIssues();
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
          📋 All Complaints
        </h1>

        {issues.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              background: "#fff",
              borderRadius: "12px",
            }}
          >
            No complaints found.
          </div>
        ) : (
          issues.map((issue) => (
            <div
              key={issue.id}
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
                {issue.image_url ? (
                  <img
                    src={issue.image_url}
                    alt="Complaint"
                    onClick={() =>
                      window.open(issue.image_url, "_blank")
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
                  {issue.complaint_type}
                </h3>

                <p
                  style={{
                    margin: "4px 0",
                    fontSize: "clamp(11px,1.5vw,14px)",
                  }}
                >
                  <strong>👤 Staff:</strong> {issue.staff_name}
                </p>

                <p
                  style={{
                    margin: "4px 0",
                    fontSize: "clamp(11px,1.5vw,14px)",
                  }}
                >
                  <strong>📍 Location:</strong> {issue.location}
                </p>

                <p
                  style={{
                    margin: "4px 0",
                    color: "#6b7280",
                    fontSize: "clamp(10px,1.4vw,13px)",
                    lineHeight: "1.4",
                  }}
                >
                  {issue.description}
                </p>
              </div>

              {/* RIGHT STATUS + ACTIONS */}
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
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    background:
                      issue.status === "Resolved"
                        ? "#22c55e"
                        : issue.status === "In Progress"
                        ? "#f59e0b"
                        : "#ef4444",
                  }}
                >
                  {issue.status}
                </div>

                {issue.status === "Pending" && (
                  <button
                    onClick={() =>
                      updateStatus(issue.id, "In Progress")
                    }
                    style={{
                      border: "none",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "#2563eb",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    Progress
                  </button>
                )}

                {issue.status !== "Resolved" && (
                  <button
                    onClick={() => resolveIssue(issue.id)}
                    style={{
                      border: "none",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "#22c55e",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Issues;
