import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import useAuthStore from "../store/authStore";

const Navbar: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="relative text-white px-6 py-4 flex justify-between items-center overflow-hidden animate-gradient-move bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900">
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
                className="text-2xl font-bold transition-all duration-500 hover:scale-110 hover:text-blue-400 drop-shadow-lg"
            >
                <span className="inline-block animate-logo-pop">
                    Movie Watchlist
                </span>
            </Link>

            <div className="flex items-center space-x-4">
                {user && (
                    <>
                        <Link to="/search" className="nav-link font-medium">
                            Search
                        </Link>
                        <Link to="/watchlist" className="nav-link font-medium">
                            Watchlist
                        </Link>
                    </>
                )}

                {user ? (
                    <CustomButton
                        variant="outlined"
                        onClick={handleLogout}
                        className="border-white hover:border-blue-400 hover:text-blue-400"
                    >
                        Logout
                    </CustomButton>
                ) : (
                    <>
                        <Link to="/login">
                            <CustomButton variant="contained" className="mr-2">
                                Login
                            </CustomButton>
                        </Link>
                        <Link to="/signup">
                            <CustomButton
                                variant="outlined"
                                className="border-white hover:border-purple-400 hover:text-purple-400"
                            >
                                Sign Up
                            </CustomButton>
                        </Link>
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
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-logo-pop {
                    animation: logoPop 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards;
                }
                @keyframes logoPop {
                    0% { transform: scale(0.8); opacity: 0; }
                    80% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
