import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, deleteUser, fetchUserById, fetchUsers, updateUser } from '../api/users';

// GET all users
export const useUsers = () =>
  useQuery({ queryKey: ['users'], queryFn: fetchUsers });

// GET single user profile
export const useUser = (id) =>
  useQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id, // Only fetch when id exists
  });

// CREATE user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

// UPDATE user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ['users', id] }),
  });
};

// DELETE user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};
