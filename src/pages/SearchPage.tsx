import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    searchMovies,
    getPopularMovies,
    getTopRatedMovies,
} from "../api/tmdbApi";
import {
    Search as SearchIcon,
    SentimentDissatisfied as NoResultsIcon,
} from "@mui/icons-material";

// TMDB API returns different field names, so adapt as needed
import { MovieCard } from "../components/MovieCard";

const SearchPage: React.FC = () => {
    const [search, setSearch] = useState("");

    // Top rated movies query
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

    // Search query
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

    // Popular movies query
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

    const popularMovies: TMDBMovie[] =
        popularData && popularData.results ? popularData.results : [];
    const topRatedMovies: TMDBMovie[] =
        topRatedData && topRatedData.results ? topRatedData.results : [];
    const searchMoviesList: TMDBMovie[] =
        searchData && searchData.results ? searchData.results : [];

    return (
        <div className="min-h-screen w-full relative flex flex-col text-white font-sans p-6">
            {/* Vibrant Gradient & Glassmorphism Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 opacity-90" />
            <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />
            {/* Decorative Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex justify-center mb-10">
                <div className="relative w-full max-w-xl">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                        <SearchIcon fontSize="medium" />
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search movies..."
                        className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg border-2 border-gray-700 focus:border-blue-400 transition-all duration-200"
                        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)" }}
                    />
                </div>
            </div>

            {/* Section Title */}
            {search ? (
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Search Results
                    </h1>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Popular Movies
                        </h1>
                    </div>
                    {/* Popular Movies Grid */}
                    {isPopularLoading ? (
                        <div className="text-center mt-10 text-blue-400 animate-pulse">
                            Loading...
                        </div>
                    ) : isPopularError ? (
                        <div className="text-center mt-10 text-red-400">
                            Error:{" "}
                            {popularError instanceof Error
                                ? popularError.message
                                : "Failed to fetch popular movies."}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
                            {popularMovies.map((movie: TMDBMovie) => (
                                <MovieCard
                                    id={movie.id}
                                    title={movie.title}
                                    poster_path={movie.poster_path}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
                                    to={`/movie/${movie.id}`}
                                    color="blue"
                                />
                            ))}
                        </div>
                    )}
                    <div className="flex justify-between items-center mb-6 mt-8">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Top Rated Movies
                        </h1>
                        <span className="text-yellow-400 font-semibold">
                            Most Rating
                        </span>
                    </div>
                    {/* Top Rated Movies Grid */}
                    {isTopRatedLoading ? (
                        <div className="text-center mt-10 text-blue-400 animate-pulse">
                            Loading...
                        </div>
                    ) : isTopRatedError ? (
                        <div className="text-center mt-10 text-red-400">
                            Error:{" "}
                            {topRatedError instanceof Error
                                ? topRatedError.message
                                : "Failed to fetch top rated movies."}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
                            {topRatedMovies.map((movie: TMDBMovie) => (
                                <MovieCard
                                    id={movie.id}
                                    title={movie.title}
                                    poster_path={movie.poster_path}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
                                    to={`/movie/${movie.id}`}
                                    color="yellow"
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Search Results Loading/Error/No Results/Movie Grid */}
            {search && (
                <>
                    {isSearchLoading && (
                        <div className="text-center mt-20 text-blue-400 animate-pulse">
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
                            <div className="flex flex-col items-center justify-center mt-20 animate-fade-in">
                                <NoResultsIcon
                                    style={{ fontSize: 80 }}
                                    className="text-gray-500 mb-4 animate-bounce"
                                />
                                <p className="text-2xl text-gray-400 animate-fade-in">
                                    No movies found
                                </p>
                            </div>
                        )}
                    {!isSearchLoading &&
                        !isSearchError &&
                        searchMoviesList.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                                {searchMoviesList.map((movie: TMDBMovie) => (
                                    <MovieCard
                                        id={movie.id}
                                        title={movie.title}
                                        poster_path={movie.poster_path}
                                        release_date={movie.release_date}
                                        vote_average={movie.vote_average}
                                        to={`/movie/${movie.id}`}
                                        color="red"
                                    />
                                ))}
                            </div>
                        )}
                </>
            )}
            {/* Fade-in animation styles */}
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

export default SearchPage;
