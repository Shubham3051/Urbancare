import axios from 'axios';

// Create an instance of axios with custom configuration
export const apiClient = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your API base URL
    timeout: 10000,
});

// Interceptor to automatically add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
