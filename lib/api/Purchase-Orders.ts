// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchPOs = async () => {
  const { data } = await axiosInstance.get('/purchase-orders');
  return data;
};

export const fetchPOById = async (id) => {
  const { data } = await axiosInstance.get(`/purchase-orders/${id}`);
  return data;
};

export const createPO = async (Pdata) => {
  const { data } = await axiosInstance.post('/purchase-orders', Pdata);
  return data;
};

export const updatePO = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/purchase-orders/${id}`, updates);
  return data;
};

export const deletePO = async (id) => {
  const { data } = await axiosInstance.delete(`/projects/${id}`);
  return data;
};
