// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchEstimates = async () => {
  const { data } = await axiosInstance.get('/estimates');
  return data;
};

export const fetchEstimateById = async (id) => {
  const { data } = await axiosInstance.get(`/estimates/${id}`);
  return data;
};

export const createEstimate = async (orderData) => {
  const { data } = await axiosInstance.post('/estimates', orderData);
  return data;
};

export const updateEstimate = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/estimates/${id}`, updates);
  return data;
};

export const deleteEstimate= async (id) => {
  const { data } = await axiosInstance.delete(`/estimates/${id}`);
  return data;
};