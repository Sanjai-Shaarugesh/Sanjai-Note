import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Create an axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

// Request interceptor for adding authorization token
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem(ACCESS_TOKEN);
    
    // If token exists, add it to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

// Response interceptor (optional, but often useful)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error:", error.response.data);
      
      // Handle specific error scenarios
      if (error.response.status === 401) {
        // Unauthorized - potentially remove token and redirect to login
        localStorage.removeItem(ACCESS_TOKEN);
        // Optionally redirect to login page
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;