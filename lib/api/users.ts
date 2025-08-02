
import axiosInstance from '../axios';

export const fetchUsers = async () => {
  const { data } = await axiosInstance.get('/auth/users');
  return data.users;
};

export const fetchUserById = async (id) => {
  const { data } = await axiosInstance.get(`/tasks/${id}`);
  return data;
};

export const createUser = async (userData) => {
  const { data } = await axiosInstance.post('/tasks', userData);
  return data;
};

export const updateUser = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/tasks/${id}`, updates);
  return data;
};

export const deleteUser= async (id) => {
  const { data } = await axiosInstance.delete(`/tasks/${id}`);
  return data;
};