import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdArrowForward, MdMovieFilter } from "react-icons/md";
import CustomButton from "../components/CustomButton";
import bgImage from "../assets/bgImg.png";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import AuthCard from "../components/AuthCard";
import { motion } from "framer-motion";

const Login: React.FC = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        const success = login({ email, password });
        if (!success) {
            setError("Invalid credentials or user not registered.");
            return;
        }
        setError("");
        navigate("/search");
    };

    return (
        <AuthCard
            title="Welcome Back"
            subtitle="Enter your credentials to access your watchlist."
            icon={
                <div className="flex justify-center mb-4">
                    <motion.div
                        animate={{
                            y: [0, -6, 0],
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            ease: "easeInOut",
                        }}
                        className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                                repeat: Infinity,
                                duration: 6,
                                ease: "linear",
                            }}
                        >
                            <MdMovieFilter className="text-black text-3xl" />
                        </motion.div>
                    </motion.div>
                </div>
            }
            error={error}
            bgImage={bgImage}
            glowColor="blue-600"
            gradientFrom="black/60"
            gradientVia="transparent"
            gradientTo="black/90"
            copyright="© 2025 Amit roy. All rights reserved."
            footer={null}
        >
            <motion.form
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 },
                    },
                }}
                onSubmit={handleLogin}
                className="space-y-5"
            >
                {/* Email */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    className="relative group"
                >
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
                </motion.div>

                {/* Password */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    className="relative group"
                >
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
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <CustomButton
                        type="submit"
                        className="w-full py-3.5 mt-2 flex items-center justify-center gap-2"
                    >
                        <span>Sign In</span>
                        <MdArrowForward className="transition-transform duration-300" />
                    </CustomButton>
                </motion.div>

                {/* Footer Link */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    className="flex justify-between items-center mt-4 text-xs text-gray-400"
                >
                    <p>Don't have an account?</p>
                    <a
                        href="/signup"
                        className="hover:text-purple-400 transition-colors"
                    >
                        Sign Up
                    </a>
                </motion.div>
            </motion.form>
        </AuthCard>
    );
};

export default Login;
