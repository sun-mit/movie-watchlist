import React from "react";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const Watchlist: React.FC = () => {
    const { user } = useAuthStore();

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900">
                <h2 className="text-2xl font-bold mb-4">
                    You need to login first
                </h2>
                <Link
                    to="/login"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all"
                >
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>

            {/* Placeholder for movies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                    >
                        <div className="h-48 bg-gray-700 animate-pulse" />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-1">
                                Movie {i + 1}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Genre • Year
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Watchlist;
