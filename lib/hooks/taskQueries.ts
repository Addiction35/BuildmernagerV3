// lib/hooks/useexpenseQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { createTask, deleteTask, fetchTaskById, fetchTasks, updateTask } from '../api/tasks';


// GET all Expense
export const useTasks = () =>
  useQuery({ queryKey: ['task'], queryFn: fetchTasks });

// GET single expense
export const useTask = (id) =>
  useQuery({
    queryKey: ['task', id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id, // Only fetch when id exists
  });

// CREATE expense
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['task'] }),
  });
};

// UPDATE expense
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ['task', id] }),
  });
};

// DELETE expense
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['task'] }),
  });
};
