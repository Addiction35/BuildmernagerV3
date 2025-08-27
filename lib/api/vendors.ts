// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchVendors = async () => {
  const { data } = await axiosInstance.get('/vendors');
  return data;
};

export const fetchVendorById = async (id) => {
  const { data } = await axiosInstance.get(`/vendors/${id}`);
  return data;
};

export const createVendor = async (vendorData) => {
  const { data } = await axiosInstance.post('/vendors', vendorData);
  return data;
};

export const updateVendor = async ({updates, id}) => {
  const { data } = await axiosInstance.put(`/vendors/${id}`, updates);
  return data;
};

export const deleteVendor = async (id) => {
  const { data } = await axiosInstance.delete(`/vendors/${id}`);
  return data;
};