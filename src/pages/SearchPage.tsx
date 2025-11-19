import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Movie as MovieIcon,
    Search as SearchIcon,
    SentimentDissatisfied as NoResultsIcon,
    Star as StarIcon,
} from "@mui/icons-material";

interface Movie {
    id: number;
    title: string;
    year: number;
    poster: string;
    rating?: number;
}

const movies: Movie[] = [
    {
        id: 1,
        title: "The Great Adventure",
        year: 2025,
        poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop",
        rating: 4.5,
    },
    {
        id: 2,
        title: "Space Odyssey",
        year: 2024,
        poster: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=400&auto=format&fit=crop",
        rating: 4.2,
    },
    {
        id: 3,
        title: "Mystery Island",
        year: 2023,
        poster: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=400&auto=format&fit=crop",
        rating: 3.8,
    },
    {
        id: 4,
        title: "City of Shadows",
        year: 2025,
        poster: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=400&auto=format&fit=crop",
        rating: 4.7,
    },
    {
        id: 5,
        title: "Ocean’s Secret",
        year: 2024,
        poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
        rating: 4.0,
    },
    {
        id: 6,
        title: "The Last Horizon",
        year: 2023,
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop",
        rating: 3.9,
    },
    {
        id: 7,
        title: "Neon Nights",
        year: 2025,
        poster: "https://images.unsplash.com/photo-1517638851339-4a0a1b06f68e?q=80&w=400&auto=format&fit=crop",
        rating: 4.6,
    },
    {
        id: 8,
        title: "Forgotten Realms",
        year: 2024,
        poster: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=400&auto=format&fit=crop",
        rating: 4.1,
    },
    {
        id: 9,
        title: "Rogue Planet",
        year: 2023,
        poster: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400&auto=format&fit=crop",
        rating: 3.7,
    },
    {
        id: 10,
        title: "Eternal Flame",
        year: 2025,
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop",
        rating: 4.8,
    },
];

const SearchPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 justify-center">
                <MovieIcon fontSize="large" />
                Movie Search
            </h1>

            {/* Centered search bar with icon */}
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

            {/* No results animation */}
            {filteredMovies.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 animate-fade-in">
                    <NoResultsIcon
                        style={{ fontSize: 80 }}
                        className="text-gray-500 mb-4 animate-bounce"
                    />
                    <p className="text-2xl text-gray-400 animate-fade-in">
                        No movies found
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {filteredMovies.map((movie) => (
                        <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 hover:shadow-red-700/40 transition-all duration-300 relative group animate-fade-in border border-gray-800"
                            style={{
                                aspectRatio: "2/3",
                                minHeight: "420px",
                                maxHeight: "560px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                className="relative"
                                style={{
                                    flex: "1 1 auto",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-full object-cover group-hover:opacity-90"
                                    style={{
                                        height: "400px",
                                        aspectRatio: "2/3",
                                        transition: "opacity 0.5s",
                                        borderRadius: "0.75rem 0.75rem 0 0",
                                    }}
                                />
                                {/* Year overlay */}
                                <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                                    {movie.year}
                                </div>
                            </div>
                            <div
                                className="px-4 py-3 flex flex-col gap-2 bg-gradient-to-t from-gray-900/90 to-gray-900/60"
                                style={{ borderRadius: "0 0 0.75rem 0.75rem" }}
                            >
                                <h2 className="text-lg font-semibold group-hover:text-red-400 transition-colors duration-200 truncate">
                                    {movie.title}
                                </h2>
                                {/* Rating star */}
                                <div className="flex items-center gap-1 mt-1">
                                    <StarIcon
                                        className="text-yellow-400"
                                        fontSize="small"
                                    />
                                    <span className="text-base text-gray-300 font-medium">
                                        {movie.rating?.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
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
