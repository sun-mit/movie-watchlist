import React from "react";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import { SentimentDissatisfied as NoResultsIcon } from "@mui/icons-material";
import { MovieCard } from "../components/MovieCard";

const cardMotion = {
    hidden: { opacity: 0, y: 30, scale: 0.85 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: easeOut },
    },
};

export type TMDBMovie = {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    release_date: string;
    vote_average: number;
    overview?: string;
    genre_ids?: number[];
};

interface SearchResultsProps {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    movies: TMDBMovie[];
}

const SearchResults: React.FC<SearchResultsProps> = ({
    isLoading,
    isError,
    error,
    movies,
}) => {
    return (
        <>
            {isLoading && (
                <div className="text-center text-blue-300 animate-pulse mt-20">
                    Loading...
                </div>
            )}
            {isError && (
                <div className="text-center mt-20 text-red-400">
                    Error:{" "}
                    {error instanceof Error
                        ? error.message
                        : "Failed to fetch movies."}
                </div>
            )}
            {!isLoading && !isError && movies.length === 0 && (
                <motion.div
                    className="flex flex-col items-center justify-center mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <NoResultsIcon
                        style={{ fontSize: 80 }}
                        className="text-gray-500 mb-4 animate-bounce"
                    />
                    <p className="text-xl text-gray-300">No movies found</p>
                </motion.div>
            )}
            {!isLoading && !isError && movies.length > 0 && (
                <motion.div
                    className="w-full flex justify-center"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center"
                        variants={{
                            visible: { transition: { staggerChildren: 0.09 } },
                        }}
                        initial="hidden"
                        animate="visible"
                    >
                        {movies.map((movie) => (
                            <motion.div key={movie.id} variants={cardMotion}>
                                <MovieCard
                                    {...movie}
                                    to={`/movie/${movie.id}`}
                                    color="red"
                                    small
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default SearchResults;
