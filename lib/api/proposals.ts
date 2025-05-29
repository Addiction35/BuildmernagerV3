// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchProposals= async () => {
  const { data } = await axiosInstance.get('/proposals');
  return data;
};

export const fetchPurchaseOrderById = async (id) => {
  const { data } = await axiosInstance.get(`/proposals/${id}`);
  return data;
};

export const createProposal= async (orderData) => {
  const { data } = await axiosInstance.post('/proposals', orderData);
  return data;
};

export const updateProposal= async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/proposals/${id}`, updates);
  return data;
};

export const deleteProposal= async (id) => {
  const { data } = await axiosInstance.delete(`/proposals/${id}`);
  return data;
};