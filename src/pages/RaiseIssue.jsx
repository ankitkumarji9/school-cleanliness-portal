
import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

function RaiseIssue() {
  const [staffName, setStaffName] = useState("");
  const [phone, setPhone] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("complaint-images")
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("complaint-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("complaints").insert([
        {
          staff_name: staffName,
          phone,
          complaint_type: complaintType,
          location,
          description,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      alert("Complaint Submitted Successfully ✅");

      clearForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const clearForm = () => {
    setStaffName("");
    setPhone("");
    setComplaintType("");
    setLocation("");
    setDescription("");
    setImage(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
        
{/* <button
  onClick={() => navigate("/dashboard")}
  style={{
    border: "none",
    background: "#4f46e5",
    color: "white",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "600",
    fontSize: "14px",
    display: "inline-block",
  }}
>
  ← Back to Dashboard
</button> */}


          <h1 style={styles.title}>🧹 Raise Complaint</h1>

          <p style={styles.subtitle}>
            Help maintain a clean, safe and healthy campus environment.
          </p>
        </div>

        {/* Form Card */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              <div>
                <label style={styles.label}>Staff Name *</label>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="Enter Staff Name"
                />
              </div>

              <div>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Complaint Type *</label>

              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                required
                style={styles.input}
              >
                <option value="">Select Complaint Type</option>
                <option value="Classroom">📚 Classroom</option>
                <option value="Library">📖 Library</option>
                <option value="Water">💧 Water</option>
                <option value="Electricity">⚡ Electricity</option>
                <option value="Cleanliness">🧹 Cleanliness</option>
                <option value="Furniture">🪑 Furniture</option>
                <option value="Plumbing">🔧 Plumbing</option>
                <option value="Security">🛡 Security</option>
                <option value="Others">📍 Others</option>
              </select>
            </div>

            <div style={styles.grid}>
              <div>
                <label style={styles.label}>Location *</label>

                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  style={styles.input}
                >
                  <option value="">Select Location</option>
                  <option value="Main Building">Main Building</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Classroom Block">Classroom Block</option>
                  <option value="Library">Library</option>
                  <option value="Playground">Playground</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Canteen">Canteen</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>Image Upload</label>

                <input
                  type="file"
                  accept="image/*"
                  // capture="environment"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Description</label>

              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue..."
                style={styles.textarea}
              />
            </div>

            {image && (
              <div style={styles.previewContainer}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={styles.preview}
                />
              </div>
            )}

            <div style={styles.buttonRow}>
              <button type="submit" style={styles.submitBtn}>
                🚀 Submit Complaint
              </button>

              <button
                type="button"
                onClick={clearForm}
                style={styles.clearBtn}
              >
                🗑 Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 50%, #eef2ff 100%)",
    padding: "20px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  title: {
    fontSize: "2.2rem",
    marginBottom: "10px",
    color: "#1e293b",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "1rem",
  },

  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 15px 40px rgba(211, 96, 96, 0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px",
    marginBottom: "20px",
  },

  field: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbeafe",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbeafe",
    resize: "vertical",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  previewContainer: {
    marginBottom: "20px",
  },

  preview: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "16px",
    border: "2px solid #e2e8f0",
  },

  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "20px",
  },

  submitBtn: {
    flex: 1,
    minWidth: "220px",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#2563eb,#06b6d4)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
  },

  clearBtn: {
    flex: 1,
    minWidth: "220px",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#ef4444,#f97316)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
  },

  backBtn: {
    border: "none",
    background: "#ffffff",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(11, 11, 11, 0.08)",
  },
};

export default RaiseIssue;
