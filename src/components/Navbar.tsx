import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Logo from "../assets/logo.svg";
import { FiHome, FiSearch, FiBookmark, FiMenu, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    // Close profile dropdown when clicking outside
    useEffect(() => {
        if (!showProfileMenu) return;
        function handleClickOutside(event: MouseEvent) {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target as Node)
            ) {
                setShowProfileMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showProfileMenu]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleProfileClick = () => {
        setShowProfileMenu((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate("/");
    };

    return (
        <nav className="w-full fixed top-0 left-0 z-50 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between backdrop-blur-xl bg-white/10">
            <div className="flex items-center gap-2 sm:gap-3 drop-shadow-lg">
                <img
                    src={Logo}
                    alt="Movie Watchlist Logo"
                    className="w-8 h-8 sm:w-9 sm:h-9 transition-all duration-500"
                />
                <motion.span
                    className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: [1, 1.1, 1],
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                    style={{
                        backgroundSize: "200% 200%",
                        display: "inline-block",
                    }}
                >
                    Movie Watchlist
                </motion.span>
            </div>
            <div className="sm:hidden flex items-center">
                {user && (
                    <button
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label="Open menu"
                    >
                        <FiMenu size={28} />
                    </button>
                )}
            </div>
            <div className="hidden sm:flex items-center space-x-4">
                {user && (
                    <>
                        <Link
                            to="/home"
                            className={`font-medium flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-200 hover:bg-blue-700/30 ${
                                location.pathname === "/home"
                                    ? "text-blue-400 font-bold"
                                    : ""
                            }`}
                        >
                            <FiHome size={22} />
                            <span className="text-base">Home</span>
                        </Link>
                        <Link
                            to="/search"
                            className={`font-medium flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-200 hover:bg-blue-700/30 ${
                                location.pathname === "/search"
                                    ? "text-blue-400 font-bold"
                                    : ""
                            }`}
                        >
                            <FiSearch size={22} />
                            <span className="text-base">Search</span>
                        </Link>
                        <Link
                            to="/watchlist"
                            className={`font-medium flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-200 hover:bg-blue-700/30 ${
                                location.pathname === "/watchlist"
                                    ? "text-blue-400 font-bold"
                                    : ""
                            }`}
                        >
                            <FiBookmark size={22} />
                            <span className="text-base">Watchlist</span>
                        </Link>
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={handleProfileClick}
                                className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/10 focus:outline-none"
                            >
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-md">
                                    {user.name
                                        ? user.name.charAt(0).toUpperCase()
                                        : "U"}
                                </span>
                                <span className="font-semibold text-base text-white drop-shadow-sm">
                                    {user.name}
                                </span>
                            </button>
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 max-w-xs bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 bg-blue-900/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl border border-blue-300/40 z-50 animate-fade-in">
                                    <div className="flex flex-col items-center px-4 py-4 border-b border-white/20">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 flex items-center justify-center text-lg font-bold shadow-lg mb-2 border-2 border-white/30">
                                            {user.name
                                                ? user.name
                                                      .charAt(0)
                                                      .toUpperCase()
                                                : "U"}
                                        </div>
                                        <div className="font-bold text-base mb-1 text-blue-700 text-center drop-shadow">
                                            {user.name}
                                        </div>
                                        <div className="text-xs text-gray-600 mb-1 break-all text-center">
                                            {user.email}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-3 font-semibold text-red-500 hover:bg-red-500/20 rounded-b-2xl transition-all duration-200 text-sm justify-center"
                                    >
                                        <FiLogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            {user && mobileMenuOpen && (
                <div className="sm:hidden absolute top-full left-0 w-full bg-blue-950/95 text-white shadow-lg border-t border-white/10 z-40 animate-fade-in">
                    <div className="flex flex-col py-2 px-4 gap-2">
                        <Link
                            to="/home"
                            className={`font-medium flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700/30 ${
                                location.pathname === "/home"
                                    ? "text-blue-400 font-bold"
                                    : ""
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FiHome size={22} />
                            <span className="text-base">Home</span>
                        </Link>
                        <Link
                            to="/search"
                            className={`font-medium flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700/30 ${
                                location.pathname === "/search"
                                    ? "text-blue-400 font-bold"
                                    : ""
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FiSearch size={22} />
                            <span className="text-base">Search</span>
                        </Link>
                        <Link
                            to="/watchlist"
                            className={`font-medium flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700/30 ${
                                location.pathname === "/watchlist"
                                    ? "text-blue-400 font-bold"
                                    : ""
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FiBookmark size={22} />
                            <span className="text-base">Watchlist</span>
                        </Link>
                        <button
                            onClick={() => {
                                setShowProfileMenu((prev) => !prev);
                            }}
                            className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white/10"
                        >
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-md">
                                {user.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : "U"}
                            </span>
                            <span className="font-semibold text-base text-white drop-shadow-sm">
                                {user.name}
                            </span>
                        </button>
                    </div>
                </div>
            )}
            {/* Mobile profile dropdown rendered outside mobile menu for visibility */}
            {user && showProfileMenu && (
                <div className="sm:hidden fixed top-16 left-1/2 transform -translate-x-1/2 w-10/12 max-w-xs bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 bg-blue-900/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl border border-blue-300/40 z-50 animate-fade-in">
                    <div className="flex flex-col items-center px-4 py-4 border-b border-white/20">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 flex items-center justify-center text-lg font-bold shadow-lg mb-2 border-2 border-white/30">
                            {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"}
                        </div>
                        <div className="font-bold text-base mb-1 text-blue-700 text-center drop-shadow">
                            {user.name}
                        </div>
                        <div className="text-xs text-gray-600 mb-1 break-all text-center">
                            {user.email}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 font-semibold text-red-500 hover:bg-red-500/20 rounded-b-2xl transition-all duration-200 text-sm justify-center"
                    >
                        <FiLogOut size={16} /> Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
