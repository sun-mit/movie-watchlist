import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Logo from "../assets/logo.svg";

const Navbar: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleProfileClick = () => {
        setShowProfileMenu((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate("/");
    };

    return (
        <>
            <nav className="w-full fixed top-0 left-0 z-50 text-white px-6 py-4 flex justify-between items-center backdrop-blur-lg">
                <style>{`
                    @keyframes gradientMove {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient-move {
                        background-size: 200% 200%;
                        animation: gradientMove 8s ease-in-out infinite;
                    }
                `}</style>

                <div className="flex items-center gap-3 drop-shadow-lg">
                    <img
                        src={Logo}
                        alt="Movie Watchlist Logo"
                        className="w-9 h-9 transition-all duration-500 animate-logo-pop"
                    />
                    <span className="text-2xl font-bold transition-all duration-500">
                        Movie Watchlist
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    {user && (
                        <>
                            <Link
                                to="/search"
                                className={`nav-link font-medium animated-link ${
                                    location.pathname === "/search"
                                        ? "text-blue-400 font-bold"
                                        : ""
                                }`}
                            >
                                Search
                            </Link>
                            <Link
                                to="/watchlist"
                                className={`nav-link font-medium animated-link ${
                                    location.pathname === "/watchlist"
                                        ? "text-blue-400 font-bold"
                                        : ""
                                }`}
                            >
                                Watchlist
                            </Link>
                            {/* Profile dropdown trigger */}
                            <div className="relative">
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
                                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 text-white rounded-xl shadow-lg border border-white/10 z-50 animate-modal-bounce">
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

                <style>{`
                    .nav-link {
                        opacity: 0;
                        transform: translateY(-10px);
                        animation: navLinkIn 0.8s forwards;
                    }
                    .nav-link:nth-child(1) { animation-delay: 0.2s; }
                    .nav-link:nth-child(2) { animation-delay: 0.4s; }

                    @keyframes navLinkIn {
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .animated-link {
                        transition: all 0.25s ease;
                    }
                    .animated-link:hover {
                        transform: translateY(-2px) scale(1.08);
                        text-shadow: 0 0 8px rgba(135,206,250,0.9);
                        color: #60a5fa;
                    }

                    .animate-logo-pop {
                        animation: logoPop 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards;
                    }
                    @keyframes logoPop {
                        0% { transform: scale(0.8); opacity: 0; }
                        80% { transform: scale(1.1); opacity: 1; }
                        100% { transform: scale(1); }
                    }

                    .logout-animate {
                        transition: 0.25s ease;
                    }
                    .logout-animate:hover {
                        transform: rotate(15deg) scale(1.2);
                        background-color: rgba(255, 75, 75, 0.25);
                    }
                    .logout-animate:active {
                        transform: rotate(0deg) scale(0.9);
                    }
                `}</style>
            </nav>
        </>
    );
};

export default Navbar;
