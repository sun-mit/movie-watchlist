import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    searchMovies,
    getPopularMovies,
    getTopRatedMovies,
} from "../api/tmdbApi";
import { getRecentMovies } from "../api/tmdbApi";
import {
    Search as SearchIcon,
    SentimentDissatisfied as NoResultsIcon,
} from "@mui/icons-material";

import { MovieCard } from "../components/MovieCard";
import MovieSection from "../components/MovieSection";

import { motion, easeInOut } from "framer-motion";

// Fade-up animation for sections
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeInOut },
    },
};

// Fade-in for cards
const cardMotion = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: easeInOut },
    },
};

const SearchPage: React.FC = () => {
    const [search, setSearch] = useState("");

    const {
        data: topRatedData,
        isLoading: isTopRatedLoading,
        isError: isTopRatedError,
        error: topRatedError,
    } = useQuery({
        queryKey: ["topRatedMovies"],
        queryFn: getTopRatedMovies,
        enabled: !search,
    });

    const {
        data: recentData,
        isLoading: isRecentLoading,
        isError: isRecentError,
        error: recentError,
    } = useQuery({
        queryKey: ["recentMovies"],
        queryFn: getRecentMovies,
        enabled: !search,
    });

    const {
        data: searchData,
        isLoading: isSearchLoading,
        isError: isSearchError,
        error: searchError,
    } = useQuery({
        queryKey: ["searchMovies", search],
        queryFn: () =>
            search ? searchMovies(search) : Promise.resolve({ results: [] }),
        enabled: !!search,
    });

    const {
        data: popularData,
        isLoading: isPopularLoading,
        isError: isPopularError,
        error: popularError,
    } = useQuery({
        queryKey: ["popularMovies"],
        queryFn: getPopularMovies,
        enabled: !search,
    });

    type TMDBMovie = {
        id: number;
        title: string;
        poster_path: string | null;
        release_date: string;
        vote_average: number;
    };

    const popularMovies: TMDBMovie[] = popularData?.results
        ? popularData.results
        : [];
    const topRatedMovies: TMDBMovie[] = topRatedData?.results
        ? topRatedData.results
        : [];
    const searchMoviesList: TMDBMovie[] = searchData?.results
        ? searchData.results
        : [];
    const recentMovies: TMDBMovie[] = recentData?.results
        ? recentData.results
        : [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full relative flex flex-col text-white font-sans p-6 pt-28 overflow-x-hidden"
        >
            {/* Parallax Gradient Background */}
            <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 opacity-90"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "300% 300%" }}
            />

            <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />

            {/* Floating Blobs */}
            <motion.div
                className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
                animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Sticky Search Bar */}
            <motion.div
                className="sticky top-5 z-50 flex justify-center mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative w-full max-w-xl">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                        <SearchIcon fontSize="medium" />
                    </span>
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search movies..."
                        className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-gray-900/80 text-white shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                </div>
            </motion.div>

            {/* SEARCH RESULTS */}
            {search ? (
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-3xl font-bold tracking-tight mb-6">
                        Search Results
                    </h1>
                </motion.div>
            ) : (
                <>
                    <MovieSection
                        title="Recent Movies"
                        color="red"
                        movies={recentMovies}
                        isLoading={isRecentLoading}
                        isError={isRecentError}
                        error={recentError}
                        layout="row"
                    />
                    <MovieSection
                        title="Popular Movies"
                        color="blue"
                        movies={popularMovies}
                        isLoading={isPopularLoading}
                        isError={isPopularError}
                        error={popularError}
                    />
                    <MovieSection
                        title="Top Rated Movies"
                        color="yellow"
                        movies={topRatedMovies}
                        isLoading={isTopRatedLoading}
                        isError={isTopRatedError}
                        error={topRatedError}
                        subtitle="Most Rating"
                    />
                </>
            )}

            {search && (
                <>
                    {isSearchLoading && (
                        <div className="text-center text-blue-300 animate-pulse mt-20">
                            Loading...
                        </div>
                    )}
                    {isSearchError && (
                        <div className="text-center mt-20 text-red-400">
                            Error:{" "}
                            {searchError instanceof Error
                                ? searchError.message
                                : "Failed to fetch movies."}
                        </div>
                    )}
                    {!isSearchLoading &&
                        !isSearchError &&
                        searchMoviesList.length === 0 && (
                            <motion.div
                                className="flex flex-col items-center justify-center mt-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <NoResultsIcon
                                    style={{ fontSize: 80 }}
                                    className="text-gray-500 mb-4 animate-bounce"
                                />
                                <p className="text-xl text-gray-300">
                                    No movies found
                                </p>
                            </motion.div>
                        )}
                    {!isSearchLoading &&
                        !isSearchError &&
                        searchMoviesList.length > 0 && (
                            <motion.div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
                                variants={{
                                    visible: {
                                        transition: { staggerChildren: 0.06 },
                                    },
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                {searchMoviesList.map((movie) => (
                                    <motion.div
                                        key={movie.id}
                                        variants={cardMotion}
                                    >
                                        <MovieCard
                                            {...movie}
                                            to={`/movie/${movie.id}`}
                                            color="red"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                </>
            )}
        </motion.div>
    );
};

export default SearchPage;
