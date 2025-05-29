// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchBudgets = async () => {
  const { data } = await axiosInstance.get('/purchase-orders');
  return data;
};

export const fetchBudgetById = async (id) => {
  const { data } = await axiosInstance.get(`/purchase-orders/${id}`);
  return data;
};

export const createBudget = async (budgetData) => {
  const { data } = await axiosInstance.post('/purchase-orders', budgetData);
  return data;
};

export const updateBudget = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/purchase-orders/${id}`, updates);
  return data;
};

export const deleteBudget= async (id) => {
  const { data } = await axiosInstance.delete(`/purchase-orders/${id}`);
  return data;
};