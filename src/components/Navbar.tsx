import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useAuthStore from "../store/authStore";

const Navbar: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
            <Link
                to="/"
                className="text-2xl font-bold hover:text-blue-400 transition-colors"
            >
                Movie Watchlist
            </Link>

            <div className="flex items-center space-x-4">
                <Link
                    to="/"
                    className="hover:text-blue-400 transition-colors font-medium"
                >
                    Search
                </Link>

                {user && (
                    <Link
                        to="/watchlist"
                        className="hover:text-blue-400 transition-colors font-medium"
                    >
                        Watchlist
                    </Link>
                )}

                {user ? (
                    <Button
                        variant="outlined"
                        size="small"
                        color="inherit"
                        onClick={handleLogout}
                        className="border-white hover:border-blue-400 hover:text-blue-400"
                    >
                        Logout
                    </Button>
                ) : (
                    <Link to="/login">
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
