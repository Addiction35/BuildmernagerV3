// lib/hooks/useProposalQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProposal, deleteProposal, fetchProposalById, fetchProposals, updateProposal } from '../api/proposals';


// GET all Proposals
export const useProposals = () =>
  useQuery({ queryKey: ['Proposal'], queryFn: fetchProposals });

// GET single Proposal
export const useProposal = (id) =>
  useQuery({
    queryKey: ['Proposal', id],
    queryFn: () => fetchProposalById(id),
    enabled: !!id, // Only fetch when id exists
  });

// CREATE Proposal
export const useCreateProposal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProposal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Proposal'] }),
  });
};

// UPDATE Proposal
export const useUpdateProposal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProposal,
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ['Proposal', id] }),
  });
};

// DELETE Proposal
export const useDeleteProposal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProposal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Proposal'] }),
  });
};
