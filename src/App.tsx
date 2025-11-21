import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Watchlist = lazy(() => import("./pages/WatchListPage"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

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
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected */}
                    <Route
                        path="/search"
                        element={
                            <ProtectedRoute>
                                <SearchPage />
                            </ProtectedRoute>
                        }
                    />
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
