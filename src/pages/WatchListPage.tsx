import { useCallback, useState, type FC } from "react";
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
    vote_average?: number;
};

const Watchlist: FC = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const getWatchlistKey = useCallback(
        () => (user ? `watchlist_${user.email}` : null),
        [user]
    );
    const getWatchlistIds = useCallback(() => {
        const key = getWatchlistKey();
        if (!key) return [];
        return JSON.parse(localStorage.getItem(key) || "[]") as string[];
    }, [getWatchlistKey]);

    const {
        data: movies,
        isLoading,
        refetch,
    } = useQuery<Movie[]>({
        queryKey: ["watchlistMovies", user?.email],
        queryFn: async () => {
            const ids = Array.from(new Set(getWatchlistIds()));
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
                            vote_average: movie.vote_average,
                        });
                        seen.add(movie.id);
                    }
                } catch (err) {
                    console.error("Failed to fetch movie details:", err);
                }
            }
            return results;
        },
        enabled: !!user,
    });

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

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
            <div className="absolute inset-0 -z-20 animate-gradient-move bg-gradient-to-tr from-indigo-900 via-blue-800 to-pink-700 opacity-90" />
            <div className="absolute inset-0 -z-10 backdrop-blur-xl" />

            <motion.div
                className="absolute top-10 left-10 w-16 h-16 bg-pink-400/30 rounded-full blur-2xl pointer-events-none"
                animate={{
                    y: [0, 40, 0],
                    x: [0, 30, 0],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"
                animate={{
                    y: [0, -40, 0],
                    x: [0, -30, 0],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut",
                }}
            />
            {/* Center Pulse Animation */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-10 h-10 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
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
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl px-2 animate-fade-in"
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
                                        "0 0 40px 10px rgba(236,72,153,0.18)",
                                    rotate: [0, 2, -2, 0],
                                }}
                                className="relative bg-gradient-to-br from-white/10 via-pink-200/10 to-blue-200/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl flex flex-col overflow-hidden group hover:ring-4 hover:ring-pink-400/30 transition-all duration-300 cursor-pointer"
                                style={{
                                    width: "260px",
                                    minHeight: "340px",
                                    margin: "0 auto",
                                }}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                                <motion.img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
                                            : "https://via.placeholder.com/220x320?text=No+Image"
                                    }
                                    alt={movie.title}
                                    className="w-full max-h-72 sm:max-h-80 md:max-h-96 object-contain bg-black rounded-t-2xl group-hover:opacity-95 transition-opacity duration-300 shadow-lg"
                                    style={{ height: "auto" }}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut",
                                    }}
                                />
                                <div className="p-3 flex-1 flex flex-col justify-between">
                                    <motion.h2
                                        className="text-sm font-bold mb-1 text-white drop-shadow-lg group-hover:text-pink-300 transition-colors duration-300"
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
                                        className="text-blue-200 text-xs font-semibold mb-2 flex items-center gap-2"
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
                                        {typeof movie.vote_average ===
                                            "number" && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-yellow-400 text-black text-[0.7rem] font-bold ml-2">
                                                ★{" "}
                                                {movie.vote_average.toFixed(1)}
                                            </span>
                                        )}
                                    </motion.p>
                                    <motion.button
                                        whileTap={{ scale: 0.92 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(movie.id);
                                        }}
                                        className="mt-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-pink-600 hover:to-red-600 text-white px-3 py-1 rounded-lg font-bold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 border border-white/60 text-xs"
                                        style={{
                                            fontSize: "0.85rem",
                                            letterSpacing: "0.02em",
                                        }}
                                        whileHover={{ scale: 1.08 }}
                                        whileFocus={{ scale: 1.05 }}
                                    >
                                        Remove
                                    </motion.button>
                                </div>

                                <motion.div
                                    className="absolute inset-0 pointer-events-none rounded-2xl group-hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.18)] transition-all duration-300"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.7 }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
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
