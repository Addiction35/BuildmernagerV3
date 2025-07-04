// lib/hooks/useexpenseQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpense, deleteExpense, fetchExpenseById, fetchExpenses, updateExpense } from '../api/Expenses';


// GET all Expense
export const useExpenses = () =>
  useQuery({ queryKey: ['expense'], queryFn: fetchExpenses });

// GET single expense
export const useExpense = (id) =>
  useQuery({
    queryKey: ['expense', id],
    queryFn: () => fetchExpenseById(id),
    enabled: !!id, // Only fetch when id exists
  });

// CREATE expense
export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expense'] }),
  });
};

// UPDATE expense
export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ['expense', id] }),
  });
};

// DELETE expense
export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expense'] }),
  });
};
