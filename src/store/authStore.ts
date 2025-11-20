// src/store/authStore.ts
import { create } from "zustand";

interface User {
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    login: (userData: { email: string; password: string }) => boolean;
    logout: () => void;
    register: (userData: {
        name: string;
        email: string;
        password: string;
    }) => boolean;
    users: User[];
}

// Load user from localStorage if available
const storedUser = localStorage.getItem("authUser");
const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

// Load users from localStorage or initialize with empty array
const storedUsers = localStorage.getItem("authUsers");
const initialUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

const useAuthStore = create<AuthState>((set, get) => ({
    user: initialUser,
    users: initialUsers,

    // Login checks credentials against registered users
    login: ({ email, password }) => {
        const users = get().users;
        const found = users.find(
            (u: User & { password?: string }) =>
                u.email === email && u.password === password
        );
        if (found) {
            set({ user: { name: found.name, email: found.email } });
            localStorage.setItem(
                "authUser",
                JSON.stringify({ name: found.name, email: found.email })
            );
            return true;
        }
        return false;
    },

    // Register adds a new user if email not taken
    register: ({ name, email, password }) => {
        let users = get().users;
        if (
            users.find((u: User & { password?: string }) => u.email === email)
        ) {
            return false; // Email already exists
        }
        const newUser = { name, email, password };
        users = [...users, newUser];
        set({ users });
        localStorage.setItem("authUsers", JSON.stringify(users));
        // Optionally log in after registration
        set({ user: { name, email } });
        localStorage.setItem("authUser", JSON.stringify({ name, email }));
        return true;
    },

    logout: () => {
        set({ user: null });
        localStorage.removeItem("authUser");
    },
}));

export default useAuthStore;
