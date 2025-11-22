import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Logo from "../assets/logo.svg";
import { FiHome, FiSearch, FiBookmark, FiMenu } from "react-icons/fi";

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
                <span className="text-lg sm:text-2xl font-bold transition-all duration-500">
                    Movie Watchlist
                </span>
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
                                <div className="absolute right-0 mt-2 w-56 bg-gray-900 text-white rounded-xl shadow-lg border border-white/10 z-50">
                                    <div className="px-5 py-4 border-b border-white/10">
                                        <div className="font-bold text-lg mb-1">
                                            {user.name}
                                        </div>
                                        <div className="text-sm text-gray-300">
                                            {user.email}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-5 py-3 font-semibold text-red-500 hover:bg-red-600 hover:text-white rounded-b-xl transition-all"
                                    >
                                        Logout
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
                                setShowProfileMenu(true);
                                setMobileMenuOpen(false);
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
                        {showProfileMenu && (
                            <div className="mt-2 w-full bg-gray-900 text-white rounded-xl shadow-lg border border-white/10 z-50">
                                <div className="px-5 py-4 border-b border-white/10">
                                    <div className="font-bold text-lg mb-1">
                                        {user.name}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        {user.email}
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-5 py-3 font-semibold text-red-500 hover:bg-red-600 hover:text-white rounded-b-xl transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
