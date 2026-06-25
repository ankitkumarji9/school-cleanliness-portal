
import { useState, useEffect } from "react"; import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      navigate("/dashboard");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Successful");
    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>
      <SchoolHeader />



      <div style={styles.container}>
        
        
        <div style={styles.card}>
          
          <div style={styles.icon}>🔐</div>

          <h1 style={styles.title}>
            Admin Login
          </h1>

          <p style={styles.subtitle}>
            Sign in to access the School
            Cleanliness Management Dashboard
          </p>

          <form
            onSubmit={handleLogin}
            style={styles.form}
          >
            <div style={styles.field}>
              <label style={styles.label}>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                style={styles.input}
              />
              <div
                style={{
                  marginTop: "8px",
                  textAlign: "right",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#2563eb",
                    padding: 0,
                  }}
                >
                  {showPassword
                    ? "🙈 Hide Password"
                    : "👁️ Show Password"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={styles.loginBtn}
            >
              Login to Dashboard →
            </button>
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
      "linear-gradient(135deg, #78adf1 0%, #eef2ff 50%, #dcfce7 100%)",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background:
      "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "30px",
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.12)",
    border:
      "1px solid rgba(255,255,255,0.4)",
  },

  icon: {
    fontSize: "55px",
    textAlign: "center",
    marginBottom: "10px",
  },

  title: {
    textAlign: "center",
    color: "#1e293b",
    marginBottom: "10px",
    fontSize: "2rem",
    fontWeight: "700",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "30px",
    lineHeight: "1.6",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    marginBottom: "1px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "1px solid #e6951c",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
    background: "#262626",
  },
backButton: {
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "15px",
  padding: "0",
  textAlign: "left",
},
  loginBtn: {
    marginTop: "10px",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg,#2563eb,#06b6d4)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow:
      "0 10px 25px rgba(37,99,235,0.3)",
  },
};

export default Login;