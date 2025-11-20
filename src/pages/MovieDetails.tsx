import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/tmdbApi";
import useAuthStore from "../store/authStore";

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    // Watchlist state in localStorage per user
    const getInitialWatchlist = () => {
        if (!user || !id) return false;
        const key = user ? `watchlist_${user.email}` : null;
        const list = key ? JSON.parse(localStorage.getItem(key) || "[]") : [];
        return list.includes(id);
    };
    const [inWatchlist, setInWatchlist] = useState(getInitialWatchlist());
    // Helper: get key for current user
    const getWatchlistKey = () => (user ? `watchlist_${user.email}` : null);

    // Check if movie is in watchlist
    // No useEffect needed for watchlist state

    // Toggle watchlist
    const handleToggleWatchlist = () => {
        if (!user || !id) return;
        const key = getWatchlistKey();
        let list = key ? JSON.parse(localStorage.getItem(key) || "[]") : [];
        if (list.includes(id)) {
            list = list.filter((mid: string) => mid !== id);
            setInWatchlist(false);
        } else {
            list.push(id);
            setInWatchlist(true);
        }
        if (key) localStorage.setItem(key, JSON.stringify(list));
    };

    const {
        data: movie,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["movieDetails", id],
        queryFn: () => getMovieDetails(id!),
        enabled: !!id,
    });

    return (
        <div className="min-h-screen w-full relative flex flex-col text-white font-sans p-6 pt-24">
            {/* Vibrant Gradient & Glassmorphism Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 opacity-90" />
            <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />
            {/* Decorative Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            {isLoading && (
                <div className="text-center mt-20 text-blue-400 animate-pulse">
                    Loading movie details...
                </div>
            )}
            {isError && (
                <div className="text-center mt-20 text-red-400">
                    Error:{" "}
                    {error instanceof Error
                        ? error.message
                        : "Failed to fetch movie details."}
                </div>
            )}
            {movie && (
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    {/* Animated Poster */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex-shrink-0 w-full md:w-[420px] lg:w-[520px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-black/60"
                    >
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                                    : "https://via.placeholder.com/780x1200?text=No+Image"
                            }
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            style={{ minHeight: "520px", maxHeight: "720px" }}
                        />
                    </motion.div>

                    {/* Animated Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.3,
                            }}
                            className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 drop-shadow-lg"
                        >
                            {movie.title}
                        </motion.h1>
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="px-4 py-2 rounded-xl bg-gradient-to-br from-blue-400/80 to-blue-700/60 backdrop-blur-xl text-base font-bold shadow-xl border border-blue-300/40 text-white">
                                {movie.release_date
                                    ? movie.release_date.slice(0, 4)
                                    : "N/A"}
                            </span>
                            {movie.runtime && (
                                <span className="px-4 py-2 rounded-xl bg-gray-800/60 text-base font-semibold">
                                    {movie.runtime} min
                                </span>
                            )}
                            {movie.vote_average && (
                                <span className="px-4 py-2 rounded-xl bg-yellow-400/20 text-base font-bold text-yellow-300">
                                    ★ {movie.vote_average.toFixed(1)}
                                </span>
                            )}
                            {movie.status && (
                                <span className="px-4 py-2 rounded-xl bg-blue-400/20 text-base font-semibold text-blue-300">
                                    {movie.status}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold text-gray-400">
                                Genres:{" "}
                            </span>
                            {movie.genres && movie.genres.length > 0
                                ? movie.genres
                                      .map(
                                          (g: { id: number; name: string }) =>
                                              g.name
                                      )
                                      .join(", ")
                                : "N/A"}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold text-gray-400">
                                Language:{" "}
                            </span>
                            {movie.original_language?.toUpperCase() || "N/A"}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold text-gray-400">
                                Budget:{" "}
                            </span>
                            {movie.budget
                                ? `$${movie.budget.toLocaleString()}`
                                : "N/A"}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold text-gray-400">
                                Revenue:{" "}
                            </span>
                            {movie.revenue
                                ? `$${movie.revenue.toLocaleString()}`
                                : "N/A"}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold text-gray-400">
                                Production Companies:{" "}
                            </span>
                            {movie.production_companies &&
                            movie.production_companies.length > 0
                                ? movie.production_companies
                                      .map(
                                          (c: { id: number; name: string }) =>
                                              c.name
                                      )
                                      .join(", ")
                                : "N/A"}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.4,
                            }}
                            className="mb-10"
                        >
                            <span className="font-semibold text-gray-400">
                                Overview:{" "}
                            </span>
                            <span className="text-gray-200 italic leading-relaxed text-lg">
                                {movie.overview || "No description available."}
                            </span>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.5,
                            }}
                            className="flex gap-4 mt-4"
                        >
                            <button
                                onClick={handleToggleWatchlist}
                                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${
                                    inWatchlist ? "opacity-80" : ""
                                }`}
                                disabled={!user}
                            >
                                {inWatchlist
                                    ? "Remove from Watchlist"
                                    : "Add to Watchlist"}
                            </button>
                            <button
                                onClick={() => navigate("/search")}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
                            >
                                Go Back to Search
                            </button>
                            {movie.homepage && (
                                <a
                                    href={movie.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
                                >
                                    Official Site
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            )}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.7s cubic-bezier(.4,0,.2,1);
                }
            `}</style>
        </div>
    );
};

export default MovieDetails;
