import { useState, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import ConfirmDialog from "../components/ConfirmDialog";
import { MdArrowForward, MdMovieFilter } from "react-icons/md";
import stageBg from "../assets/bgImgSignUp.png";
import CustomButton from "../components/CustomButton";
import AuthCard from "../components/AuthCard";
import { motion } from "framer-motion";

const SignUp: FC = () => {
    const { register, user, logout } = useAuthStore();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [wasLoggedInOnMount] = useState(() => !!user);

    const bgImage = stageBg;

    const handleSignUp = (e?: FormEvent) => {
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
        navigate("/home");
    };

    const handleConfirmLogout = () => {
        logout();
        navigate("/");
    };

    const handleCancelLogout = () => {
        navigate("/home");
    };

    if (user && wasLoggedInOnMount) {
        return (
            <ConfirmDialog
                open={true}
                title="Logout Confirmation"
                message="You are already logged in. Do you want to logout?"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />
        );
    }

    return (
        <AuthCard
            title="Create Account"
            subtitle="Sign up to start your watchlist journey."
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
                        className="h-12 w-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/50"
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
            glowColor="purple-600"
            gradientFrom="black/60"
            gradientVia="transparent"
            gradientTo="black/90"
            copyright="© 2025 sun-mit. All rights reserved."
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
                onSubmit={handleSignUp}
                className="space-y-5"
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    className="relative group"
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white text-sm outline-none focus:bg-white/10 focus:border-purple-500 transition-all duration-300 peer placeholder-transparent"
                        placeholder="Name"
                    />
                    <label className="absolute left-4 top-1.5 text-gray-400 text-[10px] transition-all duration-200 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-purple-400 bg-transparent px-1">
                        Name
                    </label>
                </motion.div>
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white text-sm outline-none focus:bg-white/10 focus:border-purple-500 transition-all duration-300 peer placeholder-transparent"
                        placeholder="Email"
                    />
                    <label className="absolute left-4 top-1.5 text-gray-400 text-[10px] transition-all duration-200 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-purple-400 bg-transparent px-1">
                        Email Address
                    </label>
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    className="relative group"
                >
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white text-sm outline-none focus:bg-white/10 focus:border-purple-500 transition-all duration-300 peer placeholder-transparent"
                        placeholder="Password"
                    />
                    <label className="absolute left-4 top-1.5 text-gray-400 text-[10px] transition-all duration-200 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-purple-400 bg-transparent px-1">
                        Password
                    </label>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <CustomButton
                        type="submit"
                        className="w-full py-3.5 mt-2 flex items-center justify-center gap-2"
                    >
                        <span>Sign Up</span>
                        <MdArrowForward className="transition-transform duration-300" />
                    </CustomButton>
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    className="flex justify-between items-center mt-4 text-xs text-gray-400"
                >
                    <p>Already have an account?</p>
                    <a
                        href="/"
                        className="font-bold text-purple-500 hover:text-purple-400 transition-colors underline underline-offset-2 drop-shadow"
                    >
                        Login
                    </a>
                </motion.div>
            </motion.form>
        </AuthCard>
    );
};

export default SignUp;
