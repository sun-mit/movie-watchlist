import { useState, useRef, useEffect, type FC } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getMovieTrailer } from "../api/tmdbApi";
import { useQuery as useVideoQuery } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";

const GoBackButton: FC = () => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/search")}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold shadow-lg transition-all"
            style={{ marginLeft: "0.5rem" }}
        >
            Go Back to Search
        </button>
    );
};

const MovieDetails: FC = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    const { id } = useParams<{ id: string }>();
    const { user } = useAuthStore();

    const getInitialWatchlist = () => {
        if (!user || !id) return false;
        const key = user ? `watchlist_${user.email}` : null;
        const list = key ? JSON.parse(localStorage.getItem(key) || "[]") : [];
        return list.includes(id);
    };
    const [inWatchlist, setInWatchlist] = useState(getInitialWatchlist());

    const getWatchlistKey = () => (user ? `watchlist_${user.email}` : null);

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

    const { data: trailer } = useVideoQuery({
        queryKey: ["movieTrailer", id],
        queryFn: () => (id ? getMovieTrailer(id) : null),
        enabled: !!id,
    });

    const trailerSectionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, []);

    useEffect(() => {
        if (trailerSectionRef.current && trailer) {
            trailerSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [trailer]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen w-full relative flex flex-col text-white font-sans p-4 sm:p-6 pt-20 sm:pt-24"
        >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 opacity-90" />
            <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />

            <div className="absolute top-0 left-0 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-80 sm:h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
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
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center w-full"
                    style={{
                        alignItems: "stretch",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: "0 0 40px #a78bfa",
                        }}
                        className="flex-shrink-0 w-full sm:w-[320px] lg:w-[420px] xl:w-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-400/40 bg-black/60 hover:shadow-purple-400/40 transition-all duration-300 self-center"
                        style={{
                            minHeight: "320px",
                            maxHeight: "720px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                                    : "https://via.placeholder.com/780x1200?text=No+Image"
                            }
                            alt={movie.title}
                            className="w-full h-full object-cover rounded-2xl"
                            style={{
                                minHeight: "320px",
                                maxHeight: "720px",
                                boxShadow: "0 8px 32px 0 rgba(80,0,120,0.25)",
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                        className="flex-1 flex flex-col justify-center items-start self-center w-full lg:w-2/3 xl:w-1/2"
                        style={{ minWidth: 0 }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.3,
                            }}
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 drop-shadow-lg"
                            style={{
                                marginBottom: "1.5rem",
                                textAlign: "left",
                                wordBreak: "break-word",
                            }}
                            ref={titleRef}
                        >
                            {movie.title}
                        </motion.h1>

                        <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                            <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-xl bg-gradient-to-br from-blue-400/80 to-blue-700/60 backdrop-blur-xl text-xs sm:text-base font-bold shadow-xl border border-blue-300/40 text-white">
                                {movie.release_date
                                    ? movie.release_date.slice(0, 4)
                                    : "N/A"}
                            </span>
                            {movie.runtime && (
                                <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-xl bg-gray-800/60 text-xs sm:text-base font-semibold">
                                    {movie.runtime} min
                                </span>
                            )}
                            {movie.vote_average && (
                                <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-xl bg-yellow-400/20 text-xs sm:text-base font-bold text-yellow-300">
                                    ★ {movie.vote_average.toFixed(1)}
                                </span>
                            )}
                            {movie.status && (
                                <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-xl bg-blue-400/20 text-xs sm:text-base font-semibold text-blue-300">
                                    {movie.status}
                                </span>
                            )}
                        </div>
                        <div className="mb-2 sm:mb-4">
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
                        <div className="mb-2 sm:mb-4">
                            <span className="font-semibold text-gray-400">
                                Language:{" "}
                            </span>
                            {movie.original_language?.toUpperCase() || "N/A"}
                        </div>

                        <div className="mb-2">
                            <span className="font-semibold text-gray-400">
                                Release Date:{" "}
                            </span>
                            <span className="text-gray-200">
                                {movie.release_date
                                    ? movie.release_date
                                    : "N/A"}
                            </span>
                        </div>
                        <div className="mb-2 sm:mb-4">
                            <span className="font-semibold text-gray-400">
                                Budget:{" "}
                            </span>
                            {movie.budget
                                ? `$${movie.budget.toLocaleString()}`
                                : "N/A"}
                        </div>
                        <div className="mb-2 sm:mb-4">
                            <span className="font-semibold text-gray-400">
                                Revenue:{" "}
                            </span>
                            {movie.revenue
                                ? `$${movie.revenue.toLocaleString()}`
                                : "N/A"}
                        </div>
                        <div className="mb-2 sm:mb-4">
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
                            className="mb-6 sm:mb-10"
                        >
                            <span className="font-semibold text-gray-400">
                                Overview:{" "}
                            </span>
                            <span className="text-gray-200 italic leading-relaxed text-base sm:text-lg">
                                {movie.overview || "No description available."}
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.5,
                            }}
                            className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-4"
                        >
                            <button
                                onClick={handleToggleWatchlist}
                                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold shadow-lg transition-all ${
                                    inWatchlist ? "opacity-80" : ""
                                }`}
                                disabled={!user}
                            >
                                {inWatchlist
                                    ? "Remove from Watchlist"
                                    : "Add to Watchlist"}
                            </button>
                            {movie.homepage ? (
                                <>
                                    <a
                                        href={movie.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold shadow-lg transition-all"
                                    >
                                        Official Site
                                    </a>
                                    <GoBackButton />
                                </>
                            ) : (
                                <GoBackButton />
                            )}
                        </motion.div>
                    </motion.div>

                    {trailer ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}
                            className="mb-6 sm:mb-8 w-full lg:w-1/2 xl:w-1/3 flex justify-center"
                        >
                            <motion.div
                                ref={trailerSectionRef}
                                initial={{
                                    borderRadius: "50%",
                                    scale: 0.1,
                                    opacity: 0,
                                }}
                                animate={{
                                    borderRadius: "2.5rem",
                                    scale: 1,
                                    opacity: 1,
                                }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="aspect-video overflow-hidden border-4 border-purple-400/60 bg-gradient-to-br from-purple-900/80 via-black/90 to-pink-700/80 flex items-center justify-center animate-fade-in backdrop-blur-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
                                style={{
                                    minHeight: "180px",
                                    maxHeight: "320px",
                                    border: "4px solid #a78bfa",
                                    position: "relative",
                                    zIndex: 2,
                                    boxShadow:
                                        "0 0 60px #a78bfa, 0 8px 32px 0 rgba(80,0,120,0.25)",
                                    transform: "translateY(-10px)",
                                    marginLeft: "0",
                                }}
                            >
                                <motion.iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&enablejsapi=1&rel=0&controls=1`}
                                    title="Trailer"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        minHeight: "180px",
                                        maxHeight: "320px",
                                        borderRadius: "2rem",
                                        background: "black",
                                        boxShadow: "0 0 40px #a78bfa",
                                    }}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.1,
                                        borderRadius: "50%",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        borderRadius: "2rem",
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        ease: "easeOut",
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="mb-6 sm:mb-8 text-center text-base sm:text-lg text-gray-400 font-semibold"
                        >
                            No trailer available for this movie.
                        </motion.div>
                    )}
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
            `}</style>
        </motion.div>
    );
};

export default MovieDetails;
