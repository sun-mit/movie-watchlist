import { useState, type MouseEvent } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import useAuthStore from "../store/authStore";

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

export const MovieCard: FC<MovieCardProps> = ({
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

    const { user } = useAuthStore();
    const watchlistKey = user ? `watchlist_${user.email}` : null;
    const [inWatchlist, setInWatchlist] = useState(() => {
        if (!watchlistKey) return false;
        const ids = JSON.parse(localStorage.getItem(watchlistKey) || "[]");
        return ids.includes(id.toString());
    });
    const handleToggleWatchlist = (e: MouseEvent) => {
        e.preventDefault();
        if (!watchlistKey) return;
        let ids = JSON.parse(localStorage.getItem(watchlistKey) || "[]");
        if (ids.includes(id.toString())) {
            ids = ids.filter((mid: string) => mid !== id.toString());
            setInWatchlist(false);
        } else {
            ids.push(id.toString());
            setInWatchlist(true);
        }
        localStorage.setItem(watchlistKey, JSON.stringify(ids));
    };

    // If hideActions is true (used for grid/recent movies), wrap the card in a Link
    if (hideActions) {
        return (
            <Link
                to={to}
                key={id}
                className={cardClass}
                style={{
                    aspectRatio: "2/3",
                    minHeight: small ? "240px" : "320px",
                    maxHeight: small ? "340px" : "460px",
                    textDecoration: "none",
                    display: "block",
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

                    {small && release_date && (
                        <div
                            className="absolute top-2 right-2 bg-black/70 text-gray-200 px-2 py-1 rounded-md text-xs font-semibold shadow"
                            style={{ letterSpacing: "0.5px" }}
                        >
                            {release_date.slice(0, 4)}
                        </div>
                    )}

                    <div
                        className="absolute bottom-0 left-0 w-full px-3 py-3 flex flex-col items-start justify-center border-b border-white/10"
                        style={{
                            wordBreak: "break-word",
                            borderBottomLeftRadius: "0.5rem",
                            borderBottomRightRadius: "0.5rem",
                            fontSize: small ? "0.75rem" : "0.95rem",
                            background: "rgba(0,0,0,0.65)",
                            boxShadow: "0 4px 32px 0 rgba(0,0,0,0.85)",
                            width: "100%",
                            left: 0,
                            bottom: 0,
                            position: "absolute",
                        }}
                    >
                        {small ? (
                            <span
                                className="text-white text-sm font-bold tracking-tight shadow mb-1 w-full truncate text-left"
                                title={title}
                                style={{ display: "block", maxWidth: "100%" }}
                            >
                                {title}
                            </span>
                        ) : (
                            <div className="flex flex-col w-full">
                                <div className="flex items-center w-full mb-1">
                                    <span
                                        className="text-white text-base sm:text-lg font-extrabold tracking-wide truncate flex-1"
                                        title={title}
                                        style={{
                                            textShadow:
                                                "0 4px 16px rgba(0,0,0,0.85), 0 1px 0 #fff",
                                            display: "block",
                                        }}
                                    >
                                        {title}
                                    </span>
                                    {release_date && (
                                        <span
                                            className="text-gray-300 text-sm font-semibold ml-2"
                                            style={{
                                                textShadow:
                                                    "0 2px 8px #000, 0 1px 0 #fff",
                                                background: "rgba(0,0,0,0.35)",
                                                borderRadius: "0.25rem",
                                                padding: "0 0.25rem",
                                            }}
                                        >
                                            {release_date.slice(0, 4)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div
            key={id}
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
                {!hideActions && !small && (
                    <button
                        className="absolute top-2 right-2 z-10 bg-transparent border-none p-0 m-0 cursor-pointer"
                        title={
                            inWatchlist
                                ? "Remove from Watchlist"
                                : "Add to Watchlist"
                        }
                        onClick={handleToggleWatchlist}
                        style={{ outline: "none" }}
                    >
                        <FaBookmark
                            className={
                                inWatchlist
                                    ? "text-green-400 text-xl drop-shadow"
                                    : "text-white text-xl hover:text-green-400 transition-colors drop-shadow"
                            }
                        />
                    </button>
                )}
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

                {small && release_date && (
                    <div
                        className="absolute top-2 right-2 bg-black/70 text-gray-200 px-2 py-1 rounded-md text-xs font-semibold shadow"
                        style={{ letterSpacing: "0.5px" }}
                    >
                        {release_date.slice(0, 4)}
                    </div>
                )}

                <div
                    className="absolute bottom-0 left-0 w-full px-3 py-3 flex flex-col items-start justify-center border-b border-white/10"
                    style={{
                        wordBreak: "break-word",
                        borderBottomLeftRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",
                        fontSize: small ? "0.75rem" : "0.95rem",
                        background: "rgba(0,0,0,0.65)",
                        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.85)",
                        width: "100%",
                        left: 0,
                        bottom: 0,
                        position: "absolute",
                    }}
                >
                    {small ? (
                        <span
                            className="text-white text-sm font-bold tracking-tight shadow mb-1 w-full truncate text-left"
                            title={title}
                            style={{ display: "block", maxWidth: "100%" }}
                        >
                            {title}
                        </span>
                    ) : (
                        <div className="flex flex-col w-full">
                            <div className="flex items-center w-full mb-1">
                                <span
                                    className="text-white text-base sm:text-lg font-extrabold tracking-wide truncate flex-1"
                                    title={title}
                                    style={{
                                        textShadow:
                                            "0 4px 16px rgba(0,0,0,0.85), 0 1px 0 #fff",
                                        display: "block",
                                    }}
                                >
                                    {title}
                                </span>
                                {release_date && (
                                    <span
                                        className="text-gray-300 text-sm font-semibold ml-2"
                                        style={{
                                            textShadow:
                                                "0 2px 8px #000, 0 1px 0 #fff",
                                            background: "rgba(0,0,0,0.35)",
                                            borderRadius: "0.25rem",
                                            padding: "0 0.25rem",
                                        }}
                                    >
                                        {release_date.slice(0, 4)}
                                    </span>
                                )}
                            </div>
                            {!hideActions && !small && (
                                <Link
                                    to={to}
                                    className="inline-block mt-1 px-4 py-2 rounded-lg border border-yellow-100/10 text-white font-bold transition-all text-sm bg-transparent hover:bg-gradient-to-r hover:from-blue-800 hover:via-purple-800 hover:to-pink-800 hover:text-white hover:shadow-lg"
                                    style={{
                                        letterSpacing: "0.03em",
                                        width: "100%",
                                        display: "block",
                                    }}
                                >
                                    <span className="flex items-center gap-2">
                                        <FiArrowRight className="w-4 h-4" />
                                        Details
                                    </span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
