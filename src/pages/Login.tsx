// src/pages/Login.tsx
import React, { useState } from "react";
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    ArrowForward as ArrowForwardIcon,
    Movie as MovieIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login: React.FC = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const bgImage =
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop";

    const handleLogin = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setError("");
        login({ name: "Test User", email });
        navigate("/"); // Navigate to home/search page after login
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black font-sans text-white">
            {/* Background */}
            <div
                className="absolute inset-0 z-0 animate-pulse-slow"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.3) blur(2px)",
                    transform: "scale(1.05)",
                }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[420px] px-4">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden group">
                    {/* Decorative Glow */}
                    <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/30 transition-colors duration-700" />

                    {/* Header */}
                    <div className="mb-8 text-center relative">
                        <div className="flex justify-center mb-4">
                            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                                <MovieIcon style={{ color: "white" }} />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Enter your credentials to access your watchlist.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white outline-none focus:bg-white/10 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent"
                                placeholder="Email"
                            />
                            <label className="absolute left-4 top-3.5 text-gray-400 text-xs transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-blue-400">
                                Email Address
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white outline-none focus:bg-white/10 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent pr-10"
                                placeholder="Password"
                            />
                            <label className="absolute left-4 top-3.5 text-gray-400 text-xs transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-blue-400">
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/25 flex items-center justify-center gap-2 mt-2"
                        >
                            <span>Sign In</span>
                            <ArrowForwardIcon
                                className={`transition-transform duration-300 ${
                                    isHovering ? "translate-x-1" : ""
                                }`}
                            />
                        </button>

                        {/* Helper */}
                        <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                            <p>Demo login: Any email works</p>
                            <a
                                href="#"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 text-xs mt-8">
                    &copy; 2025 StreamHub. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
