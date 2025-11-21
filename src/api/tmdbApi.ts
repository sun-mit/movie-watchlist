import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const END_POINTS = {
    SEARCH_MOVIES: "/search/movie",
    POPULAR_MOVIES: "/movie/popular",
    TOP_RATED_MOVIES: "/movie/top_rated",
    MOVIE_DETAILS: (id: number | string) => `/movie/${id}`,
    RECENT_MOVIES: "/movie/now_playing",
    MOVIE_TRAILERS: (id: number | string) => `/movie/${id}/videos`,
    SIMILIAR_MOVIES: (id: number | string) => `/movie/${id}/similar`,
};

export const searchMovies = async (query: string) => {
    const response = await axios.get(
        `${TMDB_BASE_URL}${END_POINTS.SEARCH_MOVIES}`,
        {
            params: {
                api_key: TMDB_API_KEY,
                query,
            },
        }
    );
    return response.data;
};
export const getPopularMovies = async () => {
    const response = await axios.get(
        `${TMDB_BASE_URL}${END_POINTS.POPULAR_MOVIES}`,
        {
            params: {
                api_key: TMDB_API_KEY,
            },
        }
    );
    return response.data;
};

export const getTopRatedMovies = async () => {
    const response = await axios.get(
        `${TMDB_BASE_URL}${END_POINTS.TOP_RATED_MOVIES}`,
        {
            params: {
                api_key: TMDB_API_KEY,
            },
        }
    );
    return response.data;
};

export const getMovieDetails = async (id: number | string) => {
    const response = await axios.get(
        `${TMDB_BASE_URL}${END_POINTS.MOVIE_DETAILS(id)}`,
        {
            params: {
                api_key: TMDB_API_KEY,
            },
        }
    );
    return response.data;
};

export const getRecentMovies = async () => {
    const response = await axios.get(
        `${TMDB_BASE_URL}${END_POINTS.RECENT_MOVIES}`,
        {
            params: {
                api_key: TMDB_API_KEY,
            },
        }
    );
    return response.data;
};

// Get videos (trailers) for a movie
export const getMovieVideos = async (id: number | string) => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/videos`, {
        params: {
            api_key: TMDB_API_KEY,
        },
    });
    return response.data;
};

export const getSimilarMovies = async (movieId: string) => {
    const response = await axios.get(
        `${TMDB_BASE_URL}${END_POINTS.SIMILIAR_MOVIES(movieId)}`,
        {
            params: {
                api_key: TMDB_API_KEY,
            },
        }
    );
    return response.data.results || [];
};

// Get the YouTube trailer for a movie
export const getMovieTrailer = async (movieId: string) => {
    const response = await axios.get(
        `${TMDB_BASE_URL}${END_POINTS.MOVIE_TRAILERS(movieId)}`,
        {
            params: {
                api_key: TMDB_API_KEY,
            },
        }
    );
    const videos = response.data.results;
    // Find YouTube trailer
    const trailer = videos?.find(
        (v: { type: string; site: string }) =>
            v.type === "Trailer" && v.site === "YouTube"
    );
    return trailer || null;
};
