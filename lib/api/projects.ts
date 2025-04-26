// lib/queries/projectQueries.js
import axiosInstance from '../axios';

export const fetchProjects = async () => {
  const { data } = await axiosInstance.get('/projects');
  return data;
};

export const fetchProjectById = async (id) => {
  const { data } = await axiosInstance.get(`/projects/${id}`);
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await axiosInstance.post('/projects', projectData);
  return data;
};

export const updateProject = async ({ id, updates }) => {
  const { data } = await axiosInstance.put(`/projects/${id}`, updates);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await axiosInstance.delete(`/projects/${id}`);
  return data;
};
