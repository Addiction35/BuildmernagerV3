// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchExpenses = async () => {
  const { data } = await axiosInstance.get('/expenses');
  return data;
};

export const fetchExpenseById = async (id) => {
  const { data } = await axiosInstance.get(`/expenses/${id}`);
  return data;
};

export const createExpense = async (orderData) => {
  const { data } = await axiosInstance.post('/expenses', orderData);
  return data;
};

export const updateExpense = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/expenses/${id}`, updates);
  return data;
};

export const DeleteExpense= async (id) => {
  const { data } = await axiosInstance.delete(`/expenses/${id}`);
  return data;
};
export const ApproveExpense= async (id) => {
  const { data } = await axiosInstance.patch(`/expenses/${id}/approve`);
  return data;
};
export const RejectExpense= async (id) => {
  const { data } = await axiosInstance.patch(`/expenses/${id}/reject`);
  return data;
};