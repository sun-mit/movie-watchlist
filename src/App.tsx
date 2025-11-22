import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchResults from "./pages/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute";
const SearchPage = lazy(() => import("./pages/HomePage"));
const MovieDetails = lazy(() => import("./pages/MovieDetailsPage"));
const Watchlist = lazy(() => import("./pages/WatchListPage"));
const Login = lazy(() => import("./pages/LoginPage"));
const SignUp = lazy(() => import("./pages/SignUpPage"));

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
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <SearchPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <ProtectedRoute>
                                <SearchResults />
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
