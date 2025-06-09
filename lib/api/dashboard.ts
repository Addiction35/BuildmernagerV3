import axiosInstance from '../axios';

export const fetchStats = async () => {
  const { data } = await axiosInstance.get('/dashboard');
  return data;
};