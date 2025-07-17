import axios from 'axios';

const axiosInstance = axios.create({
  /** baseURL: 'https://backend-studio.onrender.com/api', // Replace with your backend API base URL **/
  baseURL: 'http://localhost:5001/api', // Replace with your backend API base URL
  withCredentials: true, // ✅ Send cookies/session tokens with every request
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach JWT token if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
