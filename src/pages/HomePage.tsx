import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center px-4">
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-lg">
                    Welcome to Movie Watchlist
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 mb-10">
                    Discover trending, popular, and top-rated movies. Build your
                    own watchlist and explore like Netflix!
                </p>
                <Link to="/login">
                    <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
