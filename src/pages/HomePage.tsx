import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    getPopularMovies,
    getTopRatedMovies,
    getRecentMovies,
} from "../api/tmdbApi";
import NowPlayingBanner from "../components/NowPlayingBanner";

import MovieSection from "../components/MovieSection";

import { motion } from "framer-motion";

const SearchPage: React.FC = () => {
    const {
        data: topRatedData,
        isLoading: isTopRatedLoading,
        isError: isTopRatedError,
        error: topRatedError,
    } = useQuery({
        queryKey: ["topRatedMovies"],
        queryFn: getTopRatedMovies,
    });

    const {
        data: recentData,
        isLoading: isRecentLoading,
        isError: isRecentError,
        error: recentError,
    } = useQuery({
        queryKey: ["recentMovies"],
        queryFn: getRecentMovies,
    });

    const {
        data: popularData,
        isLoading: isPopularLoading,
        isError: isPopularError,
        error: popularError,
    } = useQuery({
        queryKey: ["popularMovies"],
        queryFn: getPopularMovies,
    });

    const nowPlayingMovies = recentData?.results ? recentData.results : [];

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

    const popularMovies: TMDBMovie[] = popularData?.results
        ? popularData.results
        : [];
    const topRatedMovies: TMDBMovie[] = topRatedData?.results
        ? topRatedData.results
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
            <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 opacity-90"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "300% 300%" }}
            />

            <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />

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

            <NowPlayingBanner movies={nowPlayingMovies} />

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
            />
        </motion.div>
    );
};

export default SearchPage;
