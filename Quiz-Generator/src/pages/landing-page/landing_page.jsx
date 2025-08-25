import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/landing_page_components/navbar"
import HeroSection from "../../components/landing_page_components/hero_section"
import AccessFormDialog from "../../components/landing_page_components/access_request_form"
import "./landing_page.css";

export default function LandingPage() {
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendEmail = () => {
    console.log("Form data:", formData);
    setShowAccessForm(false);
    navigate("/login");
  };

  const handleLogin = () => navigate("/login");
  const handleGetAccess = () => setShowAccessForm(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200/30 rounded-2xl rotate-12"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-200/30 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-pink-200/30 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-cyan-200/30 rounded-2xl -rotate-12"></div>
      </div>

      <Navigation onLogin={handleLogin} onGetAccess={handleGetAccess} />
      <HeroSection onGetAccess={handleGetAccess} />
      <AccessFormDialog
        open={showAccessForm}
        onOpenChange={setShowAccessForm}
        formData={formData}
        onChange={handleInputChange}
        onSend={handleSendEmail}
      />
    </div>
  );
}
