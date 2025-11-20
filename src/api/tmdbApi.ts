import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query: string) => {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
            api_key: TMDB_API_KEY,
            query,
        },
    });
    return response.data;
};
export const getPopularMovies = async () => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
        params: {
            api_key: TMDB_API_KEY,
        },
    });
    return response.data;
};

export const getTopRatedMovies = async () => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
        params: {
            api_key: TMDB_API_KEY,
        },
    });
    return response.data;
};

export const getMovieDetails = async (id: number | string) => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
        params: {
            api_key: TMDB_API_KEY,
        },
    });
    return response.data;
};
