import { useState } from "react";

export default function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInputFocus = (e) => {
    e.target.parentElement.style.transform = "scale(1.02)";
  };

  const handleInputBlur = (e) => {
    e.target.parentElement.style.transform = "scale(1)";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setFormData({ username: "", password: "", remember: false });
      onLoginSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Username Field */}
      <div className="text-left">
        <label htmlFor="username" className="block mb-2 text-slate-500 text-sm font-medium">
          Username
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">👤</span>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            value={formData.username}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full pl-12 pr-5 py-4 bg-slate-700 text-white rounded-lg text-base outline-none transition-all duration-300 placeholder-slate-400 focus:bg-slate-800 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-slate-700/30"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="text-left">
        <label htmlFor="password" className="block mb-2 text-slate-500 text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">🔒</span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full pl-12 pr-5 py-4 bg-slate-700 text-white rounded-lg text-base outline-none transition-all duration-300 placeholder-slate-400 focus:bg-slate-800 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-slate-700/30"
          />
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex justify-start items-center text-sm mb-6">
        <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            checked={formData.remember}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          Remember me
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-4 bg-gradient-button text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 active:translate-y-0 ${
          isLoading ? "loading opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Signing In" : "Sign In"}
      </button>
    </form>
  );
}
