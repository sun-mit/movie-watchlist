import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const END_POINTS = {
    SEARCH_MOVIES: "/search/movie",
    POPULAR_MOVIES: "/movie/popular",
    TOP_RATED_MOVIES: "/movie/top_rated",
    MOVIE_DETAILS: (id: number | string) => `/movie/${id}`,
    RECENT_MOVIES: "/movie/now_playing",
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
