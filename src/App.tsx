import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Watchlist = lazy(() => import("./pages/WatchListPage"));
const Login = lazy(() => import("./pages/Login"));

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Suspense
                fallback={
                    <div className="text-center mt-20 text-white">
                        Loading...
                    </div>
                }
            >
                <Routes>
                    {/* Public */}
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected */}
                    <Route
                        path="/movie/:id"
                        element={
                            <ProtectedRoute>
                                <MovieDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/watchlist"
                        element={
                            <ProtectedRoute>
                                <Watchlist />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
