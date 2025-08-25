import { useNavigate } from "react-router-dom";
import FloatingShapes from "../../components/login_components/floating_shapes";
import LoginForm from "../../components/login_components/login_form";
import NavBar from "../../components/login_components/navbar";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleHomePage = () => navigate("/home_page");

  return (
    <>
    <NavBar/>
    <div className="font-sans h-screen bg-gradient-login flex justify-center items-center relative overflow-hidden">
      <FloatingShapes />
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl w-full max-w-md text-center relative mx-5 sm:mx-0">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">LOGIN</h1>
        <LoginForm onLoginSuccess={handleHomePage} />
      </div>
    </div>
    </>
    
  );
}
