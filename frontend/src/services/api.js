import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL,
});

// Request interceptor for token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    // Support both header formats for compatibility
    config.headers.token = token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    // If API returns success: false, we can handle it here or in components
    if (response.data && response.data.success === false) {
       // Optional: toast here if you want it globally
       // toast.error(response.data.message || 'Action failed');
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Handle specific status codes
    if (error.response?.status === 401) {
      // Unauthorized - clear token and maybe redirect
      localStorage.removeItem('token');
      // window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);
