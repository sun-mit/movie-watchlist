import React from "react";
import { motion } from "framer-motion";
import AutoSlider from "./AutoSlider";
import { MovieCard } from "../components/MovieCard";

export type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
};

interface MovieSectionProps {
    title: string;
    color: "red" | "blue" | "yellow";
    movies: Movie[];
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    layout?: "grid" | "row";
    subtitle?: string;
}

const cardMotion = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4 },
    },
};

const MovieSection: React.FC<MovieSectionProps> = ({
    title,
    color,
    movies,
    isLoading,
    isError,
    error,
    layout = "grid",
    subtitle,
}) => {
    return (
        <>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6 },
                    },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={
                    subtitle
                        ? "flex justify-between items-center mb-6 mt-2"
                        : "mb-6"
                }
            >
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {subtitle && (
                    <span className="text-yellow-400 font-semibold">
                        {subtitle}
                    </span>
                )}
            </motion.div>
            {isLoading ? (
                <div className="text-center text-blue-300 animate-pulse mt-10">
                    Loading...
                </div>
            ) : isError ? (
                <div className="text-center text-red-400 mt-10">
                    Error:{" "}
                    {error instanceof Error
                        ? error.message
                        : `Failed to load ${title.toLowerCase()}.`}
                </div>
            ) : layout === "row" ? (
                <motion.div
                    className="flex gap-8 pb-4 mb-14 relative"
                    style={{
                        overflow: "hidden",
                        WebkitOverflowScrolling: "touch",
                    }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <AutoSlider>
                        {movies.map((movie) => (
                            <motion.div
                                key={movie.id}
                                variants={cardMotion}
                                className="min-w-[180px] mx-2"
                            >
                                <MovieCard
                                    {...movie}
                                    to={`/movie/${movie.id}`}
                                    color={color}
                                    hideActions={layout === "row"}
                                />
                            </motion.div>
                        ))}
                    </AutoSlider>
                </motion.div>
            ) : (
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-14"
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {movies.map((movie) => (
                        <motion.div key={movie.id} variants={cardMotion}>
                            <MovieCard
                                {...movie}
                                to={`/movie/${movie.id}`}
                                color={color}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </>
    );
};

export default MovieSection;
