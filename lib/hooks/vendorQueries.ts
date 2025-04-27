// lib/hooks/useProjectQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createVendor, deleteVendor, fetchVendorById, fetchVendors, updateVendor } from '../api/vendors';


// GET all  Vendors
export const useVendors = () =>
  useQuery({ queryKey: ['vendors'], queryFn: fetchVendors });

// GET single  Vendor
export const useVendor = (id) =>
  useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchVendorById(id),
    enabled: !!id, // Only fetch when id exists
  });

// CREATE  Vendor
export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVendor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendors'] }),
  });
};

// UPDATE  Vendor
export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVendor,
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ['vendors', id] }),
  });
};

// DELETE  Vendor
export const useDeleteVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVendor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vendors'] }),
  });
};
