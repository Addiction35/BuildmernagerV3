// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchWages = async () => {
  const { data } = await axiosInstance.get('/wages');
  return data;
};

export const fetchWageById = async (id) => {
  const { data } = await axiosInstance.get(`/wages/${id}`);
  return data;
};

export const createWage = async (orderData) => {
  const { data } = await axiosInstance.post('/wages', orderData);
  return data;
};

export const updateWage = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/wages/${id}`, updates);
  return data;
};

export const deleteWage= async (id) => {
  const { data } = await axiosInstance.delete(`/wages/${id}`);
  return data;
};

export const ApproveWage= async (id) => {
  const { data } = await axiosInstance.patch(`/wages/${id}/approve`);
  return data;
};
export const RejectWage= async (id) => {
  const { data } = await axiosInstance.patch(`/wages${id}/reject`);
  return data;
};