// lib/hooks/useProjectQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '@/lib/api/projects';

// GET all projects
export const useProjects = () =>
  useQuery({ queryKey: ['projects'], queryFn: fetchProjects });

// GET single project
export const useProject = (id) =>
  useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id, // Only fetch when id exists
  });

// CREATE project
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};

// UPDATE project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ['project', id] }),
  });
};

// DELETE project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};
