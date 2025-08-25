
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './pages/login/Login';
import AdminDashboard from './pages/dashboard/Dashboard';
import LandingPage from './pages/landing-page/landing_page';
import HomePage from './pages/home-page/home_page';
import Profile from './pages/profile/profile';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<AdminDashboard/>}/>
      <Route path="/home_page" element={<HomePage/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
}

export default App;
