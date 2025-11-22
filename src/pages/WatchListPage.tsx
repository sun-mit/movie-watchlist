import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../components/Toast";
import useAuthStore from "../store/authStore";
import { getMovieDetails } from "../api/tmdbApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
};

const Watchlist: React.FC = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

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

    // Query: fetch all movie details for watchlist, prevent duplicates
    const {
        data: movies,
        isLoading,
        refetch,
    } = useQuery<Movie[]>({
        queryKey: ["watchlistMovies", user?.email],
        queryFn: async () => {
            const ids = Array.from(new Set(getWatchlistIds())); // Remove duplicate IDs
            const results: Movie[] = [];
            const seen = new Set<number>();
            for (const id of ids) {
                try {
                    const movie = await getMovieDetails(id);
                    if (!seen.has(movie.id)) {
                        results.push({
                            id: movie.id,
                            title: movie.title,
                            poster_path: movie.poster_path,
                            release_date: movie.release_date,
                        });
                        seen.add(movie.id);
                    }
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

    return (
        <div className="min-h-screen w-full relative flex flex-col items-center justify-start text-white font-sans pt-24 overflow-x-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 -z-20 animate-gradient-move bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 opacity-95" />
            <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />
            {/* Floating Glows */}
            <motion.div
                className="absolute top-0 left-0 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl pointer-events-none"
                animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"
                animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut",
                }}
            />
            {/* Sparkle Animation */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                }}
                style={{ translate: "-50% -50%" }}
            />

            <motion.h1
                className="text-5xl md:text-6xl font-extrabold mb-10 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 drop-shadow-2xl animate-fade-in"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                Your Watchlist
            </motion.h1>
            {isLoading ? (
                <motion.div
                    className="text-center text-blue-400 animate-pulse mt-20 text-xl font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    Loading watchlist...
                </motion.div>
            ) : !Array.isArray(movies) || movies.length === 0 ? (
                <motion.div
                    className="text-center text-gray-300 mt-20 text-lg animate-fade-in"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Your watchlist is empty.
                </motion.div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl px-2 animate-fade-in"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.12 },
                        },
                    }}
                >
                    <AnimatePresence>
                        {movies.map((movie: Movie, idx: number) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, scale: 0.8, y: 60 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.7, y: 60 }}
                                transition={{
                                    duration: 0.7,
                                    ease: "easeOut",
                                    delay: idx * 0.09,
                                }}
                                whileHover={{
                                    scale: 1.07,
                                    boxShadow:
                                        "0 0 60px 20px rgba(236,72,153,0.25)",
                                    rotate: [0, 2, -2, 0],
                                }}
                                className="relative bg-gradient-to-br from-white/10 via-pink-200/10 to-blue-200/10 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden group hover:ring-4 hover:ring-pink-400/30 transition-all duration-300 cursor-pointer"
                                style={{ minHeight: "440px" }}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                                <motion.img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
                                            : "https://via.placeholder.com/400x600?text=No+Image"
                                    }
                                    alt={movie.title}
                                    className="w-full h-64 object-cover rounded-t-3xl group-hover:opacity-95 transition-opacity duration-300 shadow-lg"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut",
                                    }}
                                />
                                <div className="p-7 flex-1 flex flex-col justify-between">
                                    <motion.h2
                                        className="text-2xl font-bold mb-2 text-white drop-shadow-lg group-hover:text-pink-300 transition-colors duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2,
                                        }}
                                    >
                                        {movie.title}
                                    </motion.h2>
                                    <motion.p
                                        className="text-blue-200 text-base font-semibold mb-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.3,
                                        }}
                                    >
                                        {movie.release_date
                                            ? movie.release_date.slice(0, 4)
                                            : "Year N/A"}
                                    </motion.p>
                                    <motion.button
                                        whileTap={{ scale: 0.92 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(movie.id);
                                        }}
                                        className="mt-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        whileHover={{ scale: 1.08 }}
                                        whileFocus={{ scale: 1.05 }}
                                    >
                                        <span className="inline-block animate-bounce-x">
                                            ❌
                                        </span>{" "}
                                        Remove
                                    </motion.button>
                                </div>
                                {/* Card Glow on Hover */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none rounded-3xl group-hover:shadow-[0_0_60px_20px_rgba(236,72,153,0.35)] transition-all duration-300"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.7 }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.7s cubic-bezier(.4,0,.2,1);
                }
                @keyframes gradient-move {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-move {
                    background-size: 200% 200%;
                    animation: gradient-move 12s ease-in-out infinite;
                }
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(6px); }
                }
                .animate-bounce-x {
                    animation: bounce-x 1.2s infinite;
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
