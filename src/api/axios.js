import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://document-backend-3.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Function to check if backend is available
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(API_BASE_URL, { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

// Automatically attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 404:
          console.error('API endpoint not found:', error.config.url);
          error.message = 'API endpoint not available. Please check if the backend is properly configured.';
          break;
        case 500:
          error.message = 'Server error. Please try again later.';
          break;
        case 401:
          error.message = 'Unauthorized. Please login again.';
          // Optionally redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          break;
        case 403:
          error.message = 'Access forbidden.';
          break;
        default:
          error.message = error.response.data?.message || 'An error occurred.';
      }
    } else if (error.request) {
      // Network error
      error.message = 'Network error. Please check your connection.';
    } else {
      // Other error
      error.message = 'An unexpected error occurred.';
    }
    
    return Promise.reject(error);
  }
);

export default api; 