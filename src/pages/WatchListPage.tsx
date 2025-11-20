import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../components/Toast";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";
import { getMovieDetails } from "../api/tmdbApi";
import { useQuery } from "@tanstack/react-query";

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
};

const Watchlist: React.FC = () => {
    const { user } = useAuthStore();

    // Get watchlist movie IDs for current user
    const getWatchlistKey = React.useCallback(
        () => (user ? `watchlist_${user.email}` : null),
        [user]
    );
    const getWatchlistIds = React.useCallback(() => {
        const key = getWatchlistKey();
        if (!key) return [];
        return JSON.parse(localStorage.getItem(key) || "[]") as string[];
    }, [getWatchlistKey]);

    // Query: fetch all movie details for watchlist
    const {
        data: movies,
        isLoading,
        refetch,
    } = useQuery<Movie[]>({
        queryKey: ["watchlistMovies", user?.email],
        queryFn: async () => {
            const ids = getWatchlistIds();
            const results: Movie[] = [];
            for (const id of ids) {
                try {
                    const movie = await getMovieDetails(id);
                    results.push({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date,
                    });
                } catch {
                    // skip failed fetch
                }
            }
            return results;
        },
        enabled: !!user,
    });

    // Toast state
    const [toast, setToast] = React.useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    // Remove movie from watchlist with toast
    const handleRemove = (id: number) => {
        const key = getWatchlistKey();
        if (!key) return;
        let ids = getWatchlistIds();
        ids = ids.filter((mid: string) => mid !== id.toString());
        localStorage.setItem(key, JSON.stringify(ids));
        refetch();
        setToast({ message: "Removed from watchlist!", type: "success" });
    };

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
        <div className="min-h-screen w-full relative flex flex-col items-center justify-start text-white font-sans">
            {/* Vibrant Gradient & Glassmorphism Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 opacity-90" />
            <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />
            {/* Decorative Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

            <h1 className="text-4xl md:text-5xl font-extrabold mb-10 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 drop-shadow-lg animate-fade-in">
                Your Watchlist
            </h1>
            {isLoading ? (
                <div className="text-center text-blue-400 animate-pulse mt-20 text-xl font-semibold">
                    Loading watchlist...
                </div>
            ) : !Array.isArray(movies) || movies.length === 0 ? (
                <div className="text-center text-gray-300 mt-20 text-lg animate-fade-in">
                    Your watchlist is empty.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl px-2 animate-fade-in">
                    <AnimatePresence>
                        {movies.map((movie: Movie, idx: number) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: idx * 0.08,
                                }}
                                whileHover={{
                                    scale: 1.04,
                                    boxShadow:
                                        "0 0 40px 10px rgba(236,72,153,0.18)",
                                }}
                                className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden group"
                                style={{ minHeight: "420px" }}
                            >
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
                                            : "https://via.placeholder.com/400x600?text=No+Image"
                                    }
                                    alt={movie.title}
                                    className="w-full h-64 object-cover rounded-t-3xl group-hover:opacity-95 transition-opacity duration-300"
                                />
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg group-hover:text-pink-300 transition-colors duration-300">
                                        {movie.title}
                                    </h2>
                                    <p className="text-blue-200 text-base font-semibold mb-4">
                                        {movie.release_date
                                            ? movie.release_date.slice(0, 4)
                                            : "Year N/A"}
                                    </p>
                                    <motion.button
                                        whileTap={{ scale: 0.92 }}
                                        onClick={() => handleRemove(movie.id)}
                                        className="mt-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    >
                                        Remove
                                    </motion.button>
                                </div>
                                {/* Card Glow on Hover */}
                                <div className="absolute inset-0 pointer-events-none rounded-3xl group-hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.25)] transition-all duration-300" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
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
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default Watchlist;
