import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-studio.onrender.com/api', // Replace with your backend API base URL
});

export default axiosInstance;
