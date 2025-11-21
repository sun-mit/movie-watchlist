import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Logo from "../assets/logo.svg";

const Navbar: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {
        setShowConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        navigate("/login");
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

                <Link
                    to="/"
                    className="flex items-center gap-3 drop-shadow-lg group"
                >
                    <img
                        src={Logo}
                        alt="Movie Watchlist Logo"
                        className="w-9 h-9 transition-all duration-500 group-hover:scale-110 animate-logo-pop"
                    />
                    <span className="text-2xl font-bold transition-all duration-500 group-hover:scale-110 group-hover:text-blue-400">
                        Movie Watchlist
                    </span>
                </Link>

                <div className="flex items-center space-x-4">
                    {user && (
                        <>
                            <Link
                                to="/search"
                                className="nav-link font-medium animated-link"
                            >
                                Search
                            </Link>
                            <Link
                                to="/watchlist"
                                className="nav-link font-medium animated-link"
                            >
                                Watchlist
                            </Link>
                        </>
                    )}

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full transition-all logout-animate"
                            title="Logout"
                        >
                            <TbLogout className="w-6 h-6" />
                        </button>
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

            {showConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999] animate-fade-in">
                    <div className="bg-gradient-to-br from-black/90 via-gray-900 to-gray-800 text-white rounded-2xl p-7 w-80 shadow-2xl border border-white/10 animate-modal-bounce">
                        <h2 className="text-lg font-semibold mb-5 text-center">
                            Are you sure you want to logout?
                        </h2>

                        <div className="flex gap-4 mt-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all border border-gray-600 hover:scale-105"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmLogout}
                                className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all border border-red-700 font-semibold hover:scale-105"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <style>{`
                        @keyframes fadeIn {
                            0% { opacity: 0; }
                            100% { opacity: 1; }
                        }
                        .animate-fade-in {
                            animation: fadeIn 0.25s ease-out forwards;
                        }

                        @keyframes modalBounce {
                            0% { transform: scale(0.6) translateY(40px); opacity: 0; }
                            60% { transform: scale(1.05) translateY(-10px); opacity: 1; }
                            100% { transform: scale(1) translateY(0); }
                        }
                        .animate-modal-bounce {
                            animation: modalBounce 0.45s cubic-bezier(.68,-0.55,.27,1.55) forwards;
                        }
                    `}</style>
                </div>
            )}
        </>
    );
};

export default Navbar;
