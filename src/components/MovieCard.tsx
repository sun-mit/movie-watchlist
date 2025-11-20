import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import CustomButton from "./CustomButton";

export type MovieCardProps = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    to: string;
    color?: "blue" | "yellow" | "red";
};
const colorMap = {
    blue: {
        shadow: "hover:shadow-blue-500/50 hover:border-blue-400",
        badge: "bg-gradient-to-r from-blue-500/80 to-blue-400/60 border-blue-300/40",
    },
    yellow: {
        shadow: "hover:shadow-yellow-500/50 hover:border-yellow-400",
        badge: "bg-gradient-to-br from-yellow-300/60 via-yellow-200/40 to-white/20 backdrop-blur-xl border-yellow-200/40 text-gray-900",
    },
    red: {
        shadow: "hover:shadow-red-500/50 hover:border-red-400",
        badge: "bg-gradient-to-r from-red-400/70 to-red-300/40 border-red-300/40",
    },
};

export const MovieCard: React.FC<MovieCardProps> = ({
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    to,
    color = "blue",
}) => {
    const colorStyles = colorMap[color];
    return (
        <Link
            key={id}
            to={to}
            className={`rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.08] hover:shadow-black/70 transition-all duration-300 relative group animate-fade-in border border-gray-900 bg-black flex flex-col cursor-pointer ${colorStyles.shadow}`}
            style={{
                aspectRatio: "2/3",
                minHeight: "420px",
                maxHeight: "560px",
                textDecoration: "none",
            }}
        >
            <div className="relative w-full h-full flex flex-col justify-end">
                <img
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w400${poster_path}`
                            : "https://via.placeholder.com/400x600?text=No+Image"
                    }
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-95 rounded-2xl"
                    style={{ transition: "opacity 0.5s" }}
                />
                {/* Glassy Rating Badge (Top Left) */}
                <div
                    className={`absolute top-4 left-4 bg-gradient-to-br from-white/30 via-white/10 to-white/5 backdrop-blur-xl px-4 py-2 rounded-xl text-base font-bold shadow-xl border border-white/40 flex items-center gap-2 ${colorStyles.badge}`}
                    style={{
                        color: color === "yellow" ? "#222" : "#fff",
                        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)",
                    }}
                >
                    <FaStar className="text-yellow-400 text-base" />
                    {vote_average ? vote_average.toFixed(1) : "N/A"}
                </div>
                {/* Title Overlay with Year */}
                <div
                    className="absolute bottom-0 left-0 w-full px-4 py-5 flex flex-col items-center justify-center bg-gradient-to-t from-black/95 via-black/70 to-transparent"
                    style={{
                        wordBreak: "break-word",
                        borderBottomLeftRadius: "1rem",
                        borderBottomRightRadius: "1rem",
                    }}
                >
                    <span className="text-white text-xl font-extrabold tracking-wide shadow-lg mb-4">
                        {title}
                        {release_date && (
                            <span className="text-gray-300 text-base font-semibold ml-2">
                                ({release_date.slice(0, 4)})
                            </span>
                        )}
                    </span>
                    <div className="flex gap-2">
                        <Link
                            to={to}
                            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold shadow-lg transition-all text-sm hover:bg-white/30 hover:text-blue-200"
                            style={{
                                boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)",
                            }}
                        >
                            Details
                        </Link>
                        <CustomButton
                            variant="outlined"
                            className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold shadow-lg transition-all text-sm hover:bg-white/30 hover:text-green-200"
                        >
                            + Watchlist
                        </CustomButton>
                    </div>
                </div>
            </div>
        </Link>
    );
};
