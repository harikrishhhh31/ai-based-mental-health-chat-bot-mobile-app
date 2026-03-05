import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Change this to your computer's local IP when testing on a real device ───
// Run `ipconfig` in your terminal and look for "IPv4 Address" under Wi-Fi
// Example: 'http://10.88.92.215:5000'
// For Android emulator, use 'http://10.0.2.2:5000'
const BASE_URL = 'http://10.88.92.215:5000/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ── Attach JWT automatically to every request ─────────────────
apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Auth API calls ────────────────────────────────────────────
export const registerUser = (name, email, password) =>
    apiClient.post('/auth/register', { name, email, password });

export const loginUser = (email, password) =>
    apiClient.post('/auth/login', { email, password });

export const getMyProfile = () =>
    apiClient.get('/auth/profile');

// ── Chat API calls ────────────────────────────────────────────
export const sendChatMessage = (message, sessionId = null) =>
    apiClient.post('/chat/message', { message, sessionId });

export const getChatSessions = () =>
    apiClient.get('/chat/sessions');

export default apiClient;
