"use client"

import { useState } from "react"
import "./Login.css"

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields")
      return
    }

    // Add loading state
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)

      // Since there's no backend, just show success message
      alert(`Welcome back, ${formData.username}! Login successful.`)

      // Reset form
      setFormData({
        username: "",
        password: "",
        remember: false,
      })
    }, 2000)
  }

  const handleInputFocus = (e) => {
    e.target.parentElement.style.transform = "scale(1.02)"
  }

  const handleInputBlur = (e) => {
    e.target.parentElement.style.transform = "scale(1)"
  }

  return (
    <div className="font-sans h-screen bg-gradient-login flex justify-center items-center relative overflow-hidden">
      <div className="floating-shape absolute w-20 h-20 bg-blue-400/20 rounded-xl top-[15%] left-[10%] transform rotate-45"></div>
      <div className="floating-shape absolute w-15 h-15 bg-indigo-400/25 rounded-full top-[20%] right-[15%]"></div>
      <div className="floating-shape absolute w-10 h-10 bg-blue-400/20 rounded-lg bottom-[25%] right-[20%] transform rotate-[30deg]"></div>

      <div className="floating-shape absolute w-8 h-8 bg-pink-400/15 rounded-full top-[60%] left-[5%]"></div>
      <div className="floating-shape absolute w-12 h-12 bg-purple-400/20 rounded-lg bottom-[15%] left-[15%] transform rotate-12"></div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl w-full max-w-md text-center relative mx-5 sm:mx-0">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">LOGIN</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-gradient-button text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 active:translate-y-0 ${
              isLoading ? "loading opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing In" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
