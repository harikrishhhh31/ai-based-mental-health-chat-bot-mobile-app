import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser, getMyProfile } from '../api/client';

const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,

    register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await registerUser(name, email, password);
            const { token, ...user } = res.data;
            await AsyncStorage.setItem('userToken', token);
            set({ user, token, isAuthenticated: true, isLoading: false });
            return { success: true, user };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed. Please try again.';
            set({ error: message, isLoading: false, isAuthenticated: false });
            return { success: false, error: message };
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await loginUser(email, password);
            const { token, ...user } = res.data;
            await AsyncStorage.setItem('userToken', token);
            set({ user, token, isAuthenticated: true, isLoading: false });
            return { success: true, user };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed. Check your credentials.';
            set({ error: message, isLoading: false });
            return { success: false, error: message };
        }
    },

    restoreSession: async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) return;
            const res = await getMyProfile();
            set({ user: res.data, token, isAuthenticated: true });
        } catch {
            await AsyncStorage.removeItem('userToken');
            set({ user: null, token: null, isAuthenticated: false });
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem('userToken');
        set({ user: null, token: null, isAuthenticated: false, error: null });
    },

    clearError: () => set({ error: null }),
}));

export default useAuthStore;
