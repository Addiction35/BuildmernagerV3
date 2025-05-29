// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchPayrolls = async () => {
  const { data } = await axiosInstance.get('/payroll');
  return data;
};

export const fetchPayrollById = async (id) => {
  const { data } = await axiosInstance.get(`/payroll/${id}`);
  return data;
};

export const createPayroll = async (orderData) => {
  const { data } = await axiosInstance.post('/payroll', orderData);
  return data;
};

export const updatePayroll = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/payroll/${id}`, updates);
  return data;
};

export const deletePayroll= async (id) => {
  const { data } = await axiosInstance.delete(`/payroll/${id}`);
  return data;
};