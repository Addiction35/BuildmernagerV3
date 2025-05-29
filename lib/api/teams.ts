// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchTeams = async () => {
  const { data } = await axiosInstance.get('/teams');
  return data;
};

export const fetchTeamById = async (id) => {
  const { data } = await axiosInstance.get(`/teams/${id}`);
  return data;
};

export const createTeam = async (orderData) => {
  const { data } = await axiosInstance.post('/teams', orderData);
  return data;
};

export const updateTeam = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/teams/${id}`, updates);
  return data;
};

export const deleteTeam= async (id) => {
  const { data } = await axiosInstance.delete(`/teams/${id}`);
  return data;
};