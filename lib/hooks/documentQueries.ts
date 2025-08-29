// lib/hooks/useDocumentQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createDocument,
  getAllDocuments,
  getDocumentsByProject,
  getDocumentById,
  updateDocumentById,
  softDeleteDocument,
  hardDeleteDocument,
} from "../api/documents"

// 🔹 GET all documents with query params
export const useDocuments = (params?: {
  type?: string
  sort?: "newest" | "A_Z" | "Z_A"
  q?: string
  page?: number
  limit?: number
}) =>
  useQuery({
    queryKey: ["documents", params],
    queryFn: () => getAllDocuments(params),
  })

// 🔹 GET documents by project with query params
export const useDocumentsByProject = (
  projectId: string,
  params?: {
    type?: string
    sort?: "newest" | "A_Z" | "Z_A"
    q?: string
    page?: number
    limit?: number
  }
) =>
  useQuery({
    queryKey: ["documents", "project", projectId, params],
    queryFn: () => getDocumentsByProject(projectId, params),
    enabled: !!projectId,
  })

// 🔹 GET single document
export const useDocument = (id: string) =>
  useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocumentById(id),
    enabled: !!id,
  })

// 🔹 CREATE document
export const useCreateDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: FormData }) =>
      createDocument(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] })
    },
  })
}

// 🔹 UPDATE document
export const useUpdateDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateDocumentById(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["document", id] })
    },
  })
}

// 🔹 SOFT delete
export const useSoftDeleteDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => softDeleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] })
    },
  })
}

// 🔹 HARD delete
export const useHardDeleteDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => hardDeleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] })
    },
  })
}
