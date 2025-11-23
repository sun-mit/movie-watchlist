# Movie Watchlist

A modern, responsive web app for managing your personal movie watchlist. Built with React, TypeScript, Vite, Tailwind CSS, Zustand. Integrates with TMDB API for movie data.

## Features

-   **Authentication**: Sign up, login, and manage your account (localStorage-based)
-   **Movie Search**: Search movies using TMDB API
-   **Watchlist**: Add/remove movies to your personal watchlist
-   **Movie Details**: View detailed info and trailers for each movie
-   **Responsive UI**: Mobile-friendly, animated, and visually appealing
-   **Protected Routes**: Only authenticated users can access main features
-   **State Management**: Zustand for global state
-   **API Integration**: Axios for TMDB API requests
-   **Styling**: Tailwind CSS, and custom gradients

## Tech Stack

-   React 19 + TypeScript
-   Vite
-   Tailwind CSS
-   Zustand
-   Framer Motion (animations)
-   Axios
-   React Router
-   TMDB API
-   TanStack Query

## Project Structure

```
movie-watchlist/
├── public/
│   └── logo.svg
├── src/
│   ├── api/           # TMDB API integration
│   ├── assets/        # Images and SVGs
│   ├── components/    # Reusable UI components
│   ├── pages/         # App pages (Home, Login, Signup, Details, Watchlist, Search)
│   ├── store/         # Zustand store for auth
│   ├── styles/        # Theme and global styles
│   ├── App.tsx        # Main app with routing
│   ├── main.tsx       # App entry point
│   └── index.css      # Tailwind base styles
├── index.html         # App HTML entry
├── package.json       # Dependencies and scripts
├── tailwind.config.cjs
├── vite.config.ts
├── tsconfig*.json     # TypeScript configs
└── README.md          # Project info
```

## Getting Started

1. **Clone the repo**
    ```bash
    git clone https://github.com/sun-mit/movie-watchlist.git
    cd movie-watchlist
    ```
2. **Install dependencies**
    ```bash
    yarn
    ```
3. **Set up TMDB API key**
    - Create a `.env` file in the root:
        ```env
        VITE_TMDB_API_KEY=your_tmdb_api_key_here
        ```
    - Get your API key from [TMDB](https://www.themoviedb.org/settings/api)
4. **Run the app**
    ```bash
    yarn dev
    ```

## Usage

-   **Sign Up/Login**: Create an account or log in (credentials stored in localStorage)
-   **Browse Movies**: Home page shows recent, popular, and top-rated movies
-   **Search**: Use the search page to find movies
-   **Details**: Click a movie for details and trailer
-   **Watchlist**: Add/remove movies to your personal watchlist

## Environment Variables

-   `VITE_TMDB_API_KEY`: Your TMDB API key

## Live link :

-   `https://movie-watchlist-neon-eight.vercel.app/`

Made by Amit Roy (sun-mit)
