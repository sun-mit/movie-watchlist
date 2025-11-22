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
    hideActions?: boolean;
    small?: boolean;
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
    hideActions = false,
    small = false,
}) => {
    const colorStyles = colorMap[color];
    const cardClass = hideActions
        ? `rounded-xl overflow-hidden shadow-xl transition-all duration-300 relative group animate-fade-in border bg-black flex flex-col cursor-pointer border-gray-900 ${colorStyles.shadow}`
        : `rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.04] hover:shadow-black/70 transition-all duration-300 relative group animate-fade-in border border-gray-900 bg-black flex flex-col cursor-pointer ${colorStyles.shadow}`;
    return (
        <Link
            key={id}
            to={to}
            className={cardClass}
            style={{
                aspectRatio: "2/3",
                minHeight: small ? "240px" : "320px",
                maxHeight: small ? "340px" : "460px",
                textDecoration: "none",
            }}
        >
            <div
                className={`relative w-full h-full flex flex-col justify-end ${
                    hideActions
                        ? `hover:shadow-lg hover:border-${color}-400 transition-all duration-300`
                        : ""
                }`}
            >
                <img
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w400${poster_path}`
                            : "https://via.placeholder.com/400x600?text=No+Image"
                    }
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-95 rounded-xl"
                    style={{
                        transition: "opacity 0.5s",
                        minHeight: small ? "240px" : "320px",
                        maxHeight: small ? "300px" : "380px",
                    }}
                />
                {/* Glassy Rating Badge (Top Left) */}
                <div
                    className={`absolute top-2 left-2 bg-gradient-to-br from-white/30 via-white/10 to-white/5 backdrop-blur-xl px-2 py-1 rounded-lg text-xs font-bold shadow-xl border border-white/40 flex items-center gap-1 ${colorStyles.badge}`}
                    style={{
                        color: color === "yellow" ? "#222" : "#fff",
                        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.18)",
                    }}
                >
                    <FaStar className="text-yellow-400 text-xs" />
                    {vote_average ? vote_average.toFixed(1) : "N/A"}
                </div>
                {/* Year badge for small card */}
                {small && release_date && (
                    <div
                        className="absolute top-2 right-2 bg-black/70 text-gray-200 px-2 py-1 rounded-md text-xs font-semibold shadow"
                        style={{ letterSpacing: "0.5px" }}
                    >
                        {release_date.slice(0, 4)}
                    </div>
                )}
                {/* Title Overlay with Year */}
                <div
                    className="absolute bottom-0 left-0 w-full px-2 py-2 flex flex-col items-center justify-center bg-gradient-to-t from-black/95 via-black/70 to-transparent"
                    style={{
                        wordBreak: "break-word",
                        borderBottomLeftRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",
                        fontSize: small ? "0.75rem" : "0.95rem",
                    }}
                >
                    {small ? (
                        <span
                            className="text-white text-sm font-bold tracking-tight shadow mb-1 w-full truncate text-center"
                            title={title}
                            style={{ display: "block", maxWidth: "100%" }}
                        >
                            {title}
                        </span>
                    ) : (
                        <span className="text-white text-xl font-extrabold tracking-wide shadow-lg mb-2">
                            {title}
                            {release_date && (
                                <span className="text-gray-300 text-base font-semibold ml-1">
                                    ({release_date.slice(0, 4)})
                                </span>
                            )}
                        </span>
                    )}
                    {!hideActions && !small && (
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
                    )}
                </div>
            </div>
        </Link>
    );
};
