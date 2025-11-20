// src/pages/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { MdArrowForward, MdMovie } from "react-icons/md";
import stageBg from "../assets/bgImgSignUp.png";
import CustomButton from "../components/CustomButton";

const SignUp: React.FC = () => {
    const { register } = useAuthStore();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const bgImage = stageBg;

    const handleSignUp = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!name || !email || !password) {
            setError("Please fill all fields.");
            return;
        }
        const success = register({ name, email, password });
        if (!success) {
            setError("Email already exists. Try logging in.");
            return;
        }
        setError("");
        navigate("/search"); // Go to search after signup
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

            {/* Sign Up Card */}
            <div className="relative z-10 w-full max-w-[520px] px-4">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden group">
                    {/* Decorative Glow */}
                    <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/30 transition-colors duration-700" />

                    {/* Header */}
                    <div className="mb-8 text-center relative">
                        <div className="flex justify-center mb-4">
                            <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/50">
                                <MdMovie className="text-white text-3xl" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Sign up to start your watchlist journey.
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
                    <form onSubmit={handleSignUp} className="space-y-5">
                        {/* Name */}
                        <div className="relative group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white outline-none focus:bg-white/10 focus:border-purple-500 transition-all duration-300 peer placeholder-transparent"
                                placeholder="Name"
                            />
                            <label className="absolute left-4 top-3.5 text-gray-400 text-xs transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-purple-400">
                                Name
                            </label>
                        </div>
                        {/* Email */}
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white outline-none focus:bg-white/10 focus:border-purple-500 transition-all duration-300 peer placeholder-transparent"
                                placeholder="Email"
                            />
                            <label className="absolute left-4 top-3.5 text-gray-400 text-xs transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-purple-400">
                                Email Address
                            </label>
                        </div>
                        {/* Password */}
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white outline-none focus:bg-white/10 focus:border-purple-500 transition-all duration-300 peer placeholder-transparent"
                                placeholder="Password"
                            />
                            <label className="absolute left-4 top-3.5 text-gray-400 text-xs transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-purple-400">
                                Password
                            </label>
                        </div>
                        {/* Submit */}
                        <CustomButton
                            type="submit"
                            className="w-full py-3.5 mt-2 flex items-center justify-center gap-2"
                        >
                            <span>Sign Up</span>
                            <MdArrowForward className="transition-transform duration-300" />
                        </CustomButton>
                        {/* Helper */}
                        <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                            <p>Already have an account?</p>
                            <a
                                href="/login"
                                className="hover:text-purple-400 transition-colors"
                            >
                                Login
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

export default SignUp;
