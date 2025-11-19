// src/store/authStore.ts
import { create } from "zustand";

interface User {
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

// Load user from localStorage if available
const storedUser = localStorage.getItem("authUser");
const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

const useAuthStore = create<AuthState>((set) => ({
    user: initialUser,

    login: (userData: User) => {
        set({ user: userData });
        localStorage.setItem("authUser", JSON.stringify(userData));
    },

    logout: () => {
        set({ user: null });
        localStorage.removeItem("authUser");
    },
}));

export default useAuthStore;
