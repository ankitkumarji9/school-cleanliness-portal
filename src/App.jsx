import { BrowserRouter, Routes, Route } from "react-router-dom";

import RaiseIssue from "./pages/RaiseIssue";
import Issues from "./pages/Issues";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import History from "./pages/History";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/raise-issue" element={<RaiseIssue />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;