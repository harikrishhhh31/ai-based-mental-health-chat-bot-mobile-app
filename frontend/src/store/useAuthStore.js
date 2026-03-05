import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser, getMyProfile } from '../api/client';

const useAuthStore = create((set, get) => ({
    // ── State ────────────────────────────────────────────────────
    user: null,        // { _id, name, email }
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,

    // ── Actions ──────────────────────────────────────────────────

    /**
     * Register a new user account.
     * On success, saves JWT and navigates to Home.
     */
    register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await registerUser(name, email, password);
            const { token, ...user } = res.data;
            await AsyncStorage.setItem('userToken', token);
            set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed. Please try again.';
            set({ error: message, isLoading: false });
        }
    },

    /**
     * Log in with email and password.
     * On success, saves JWT to device storage.
     */
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await loginUser(email, password);
            const { token, ...user } = res.data;
            await AsyncStorage.setItem('userToken', token);
            set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed. Check your credentials.';
            set({ error: message, isLoading: false });
        }
    },

    /**
     * Restore session on app startup by reading the stored token.
     */
    restoreSession: async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) return;
            const res = await getMyProfile();
            set({ user: res.data, token, isAuthenticated: true });
        } catch {
            // Token may be expired — clear it
            await AsyncStorage.removeItem('userToken');
            set({ user: null, token: null, isAuthenticated: false });
        }
    },

    /**
     * Log out the current user.
     */
    logout: async () => {
        await AsyncStorage.removeItem('userToken');
        set({ user: null, token: null, isAuthenticated: false, error: null });
    },

    clearError: () => set({ error: null }),
}));

export default useAuthStore;
