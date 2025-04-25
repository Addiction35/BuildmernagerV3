import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Replace with your backend API base URL
});

export default axiosInstance;
