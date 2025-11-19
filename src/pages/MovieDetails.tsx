import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Placeholder movie data
    const movie = {
        title: `Movie Title ${id}`,
        year: 2025,
        genre: "Action / Adventure",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        poster: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=500&auto=format&fit=crop",
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <Link
                to="/"
                className="flex items-center gap-2 mb-6 text-blue-400 hover:text-blue-500 transition-colors"
            >
                <ArrowBack />
                Back to Search
            </Link>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0 w-full md:w-64 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-400 mb-4">
                        {movie.genre} • {movie.year}
                    </p>
                    <p className="text-gray-200 mb-6">{movie.description}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all">
                            Add to Watchlist
                        </button>
                        <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-all">
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
