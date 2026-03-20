import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.0.102:5000/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export const registerUser = (name, email, password) =>
    apiClient.post('/auth/register', { name, email, password });

export const loginUser = (email, password) =>
    apiClient.post('/auth/login', { email, password });

export const getMyProfile = () =>
    apiClient.get('/auth/profile');

export const sendChatMessage = (message, sessionId = null) =>
    apiClient.post('/chat/message', { message, sessionId });

export const getChatSessions = () =>
    apiClient.get('/chat/history');

export default apiClient;
