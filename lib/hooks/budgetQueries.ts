// lib/hooks/useBudgetQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createBudget, deleteBudget, fetchBudgetById, fetchBudgets, updateBudget } from '../api/budgets';


// GET all Budgets
export const useBudgets = () =>
  useQuery({ queryKey: ['budget'], queryFn: fetchBudgets });

// GET single Budget
export const useBudget = (id) =>
  useQuery({
    queryKey: ['budget', id],
    queryFn: () => fetchBudgetById(id),
    enabled: !!id, // Only fetch when id exists
  });

// CREATE Budget
export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budget'] }),
  });
};

// UPDATE Budget
export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBudget,
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ['budget', id] }),
  });
};

// DELETE Budget
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budget'] }),
  });
};
