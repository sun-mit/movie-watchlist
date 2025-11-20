import React from "react";
import { Link } from "react-router-dom";
import { Star as StarIcon } from "@mui/icons-material";

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
        badge: "bg-gradient-to-r from-yellow-400/80 to-yellow-300/60 border-yellow-300/40 text-gray-900",
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
            className={`rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.08] hover:shadow-black/70 transition-all duration-300 relative group animate-fade-in border border-gray-900 bg-black flex flex-col ${colorStyles.shadow}`}
            style={{
                aspectRatio: "2/3",
                minHeight: "420px",
                maxHeight: "560px",
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
                {/* Enhanced Glassy Rating Badge */}
                <div
                    className={`absolute top-4 right-4 bg-gradient-to-br from-white/30 via-white/10 to-white/5 backdrop-blur-xl px-4 py-2 rounded-xl text-base font-bold shadow-xl border border-white/40 flex items-center gap-2 ${colorStyles.badge}`}
                    style={{
                        color: color === "yellow" ? "#222" : "#fff",
                        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)",
                    }}
                >
                    <StarIcon className="text-yellow-400" fontSize="small" />
                    {vote_average ? vote_average.toFixed(1) : "N/A"}
                </div>
                {/* Enhanced Year Badge */}
                <div
                    className="absolute top-4 left-4 bg-gradient-to-br from-white/30 via-white/10 to-white/5 backdrop-blur-xl px-3 py-1 rounded-xl text-sm font-semibold shadow-xl border border-white/40"
                    style={{
                        color: "#fff",
                        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)",
                    }}
                >
                    {release_date ? release_date.slice(0, 4) : "N/A"}
                </div>
                {/* Netflix-style Title Overlay */}
                <div
                    className="absolute bottom-0 left-0 w-full px-4 py-5 flex items-center justify-center bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white text-xl font-extrabold tracking-wide shadow-lg"
                    style={{
                        wordBreak: "break-word",
                        borderBottomLeftRadius: "1rem",
                        borderBottomRightRadius: "1rem",
                    }}
                >
                    {title}
                </div>
            </div>
        </Link>
    );
};
