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


const storedUser = localStorage.getItem("authUser");
const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;


const storedUsers = localStorage.getItem("authUsers");
const initialUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

const useAuthStore = create<AuthState>((set, get) => ({
    user: initialUser,
    users: initialUsers,
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

    register: ({ name, email, password }) => {
        let users = get().users;
        if (
            users.find((u: User & { password?: string }) => u.email === email)
        ) {
            return false; 
        }
        const newUser = { name, email, password };
        users = [...users, newUser];
        set({ users });
        localStorage.setItem("authUsers", JSON.stringify(users));
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
