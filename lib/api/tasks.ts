// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchTasks = async () => {
  const { data } = await axiosInstance.get('/tasks');
  return data;
};

export const fetchTaskById = async (id) => {
  const { data } = await axiosInstance.get(`/tasks/${id}`);
  return data;
};

export const createTask = async (orderData) => {
  const { data } = await axiosInstance.post('/tasks', orderData);
  return data;
};

export const updateTask = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/tasks/${id}`, updates);
  return data;
};

export const deleteTask= async (id) => {
  const { data } = await axiosInstance.delete(`/tasks/${id}`);
  return data;
};