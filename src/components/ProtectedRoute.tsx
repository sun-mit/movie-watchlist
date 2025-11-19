import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuthStore();

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // Logged in, render children
    return <>{children}</>;
};

export default ProtectedRoute;
