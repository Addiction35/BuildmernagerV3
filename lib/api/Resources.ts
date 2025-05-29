// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchResources = async () => {
  const { data } = await axiosInstance.get('/resources');
  return data;
};

export const fetchResourceById = async (id) => {
  const { data } = await axiosInstance.get(`/resources/${id}`);
  return data;
};

export const createResource = async (orderData) => {
  const { data } = await axiosInstance.post('/resources', orderData);
  return data;
};

export const updateResource = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/resources/${id}`, updates);
  return data;
};

export const deleteResource= async (id) => {
  const { data } = await axiosInstance.delete(`/resources/${id}`);
  return data;
};