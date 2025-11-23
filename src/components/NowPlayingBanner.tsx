import React, { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import { motion, AnimatePresence } from "framer-motion";
import { MdPlayArrow, MdInfo, MdClose } from "react-icons/md";
import { getMovieVideos } from "../api/tmdbApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type TMDBMovie = {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    release_date: string;
    vote_average: number;
    overview?: string;
    genre_ids?: number[];
};

const NowPlayingBanner: React.FC<{ movies: TMDBMovie[] }> = ({ movies }) => {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (movies.length === 0) return;
        intervalRef.current = window.setInterval(() => {
            setCurrent((prev) => (prev + 1) % movies.length);
        }, 5000);
        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [movies]);

    const movie = movies.length > 0 ? movies[current] : null;
    const backdropUrl = movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : undefined;

    const {
        data: trailerData,
        isLoading: trailerLoading,
        isError: trailerError,
    } = useQuery({
        queryKey: ["movieTrailer", movie?.id, showTrailer],
        queryFn: () =>
            movie ? getMovieVideos(movie.id) : Promise.resolve({ results: [] }),
        enabled: showTrailer && !!movie,
        staleTime: 1000 * 60 * 5,
    });

    if (movies.length === 0) return null;

    const trailerKey =
        trailerData && Array.isArray(trailerData.results)
            ? trailerData.results.find(
                  (vid: { type: string; site: string; key: string }) =>
                      vid.type === "Trailer" && vid.site === "YouTube"
              )?.key || null
            : null;

    const handlePlayNow = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowTrailer(true);
    };

    const handleMoreInfo = (e: React.MouseEvent) => {
        e.preventDefault();
        if (movie) navigate(`/movie/${movie.id}`);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-[650px] rounded-3xl overflow-hidden mb-10 shadow-2xl"
            >
                {/* Now Playing Badge */}
                <div className="absolute top-6 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold shadow-lg text-lg">
                    <MdPlayArrow size={22} />
                    Now Playing
                </div>
                <AnimatePresence>
                    {backdropUrl && movie && (
                        <motion.img
                            key={backdropUrl}
                            src={backdropUrl}
                            alt={movie.title}
                            initial={{ scale: 1.05, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ filter: "brightness(0.6)" }}
                        />
                    )}
                </AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-pink-800/60"
                />
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="relative z-10 flex flex-col justify-center h-full px-12 items-start text-left"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.4,
                        }}
                        className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400"
                    >
                        {movie?.title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.5,
                        }}
                        className="flex items-center gap-4 mb-4 text-lg"
                    >
                        <span className="font-semibold text-pink-300">
                            {movie?.release_date?.slice(0, 4)}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-700/60 text-blue-200 text-sm font-semibold">
                            {movie?.genre_ids?.length
                                ? `Genre: ${movie?.genre_ids[0]}`
                                : ""}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-300 font-bold">
                            ★ {movie?.vote_average}
                        </span>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.6,
                        }}
                        className="max-w-2xl text-gray-200 mb-8 text-lg line-clamp-3 overflow-hidden"
                    >
                        {movie?.overview}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.7,
                        }}
                        className="flex gap-4"
                    >
                        <button
                            onClick={handlePlayNow}
                            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg transition-all scale-100 hover:scale-105 flex items-center gap-2"
                        >
                            <MdPlayArrow size={22} />
                            Trailer
                        </button>
                        <button
                            onClick={handleMoreInfo}
                            className="px-6 py-3 rounded-xl bg-gray-700/80 text-white font-bold shadow-lg transition-all scale-100 hover:scale-105 flex items-center gap-2"
                        >
                            <MdInfo size={22} />
                            More Info
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {showTrailer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
                        onClick={() => setShowTrailer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-black rounded-2xl shadow-2xl p-6 relative max-w-3xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-2 right-2 text-white text-2xl font-bold"
                                onClick={() => setShowTrailer(false)}
                            >
                                <MdClose size={28} />
                            </button>
                            {trailerLoading ? (
                                <div className="flex justify-center items-center py-20">
                                    <Loader />
                                </div>
                            ) : trailerError ? (
                                <div className="text-white text-center py-20">
                                    Error loading trailer.
                                </div>
                            ) : trailerKey ? (
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${trailerKey}`}
                                    title="Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-xl"
                                />
                            ) : (
                                <div className="text-white text-center py-20">
                                    No trailer available.
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
export default NowPlayingBanner;
