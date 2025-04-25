import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllClients, deleteClientById } from "@/lib/api/clients"

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteClientById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })
}
