// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchPurchaseOrder = async () => {
  const { data } = await axiosInstance.get('/purchase-orders');
  return data;
};

export const fetchPurchaseOrderById = async (id) => {
  const { data } = await axiosInstance.get(`/purchase-orders/${id}`);
  return data;
};

export const createPurchaseOrder = async (orderData) => {
  const { data } = await axiosInstance.post('/purchase-orders', orderData);
  return data;
};

export const updatePurchaseOrder = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/purchase-orders/${id}`, updates);
  return data;
};

export const deletePurchaseOrder= async (id) => {
  const { data } = await axiosInstance.delete(`/purchase-orders/${id}`);
  return data;
};