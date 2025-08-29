import axiosInstance from "../axios"


// Types (adjust if you already have proper Document types)
export interface DocumentFormData {
  type?: string
  version?: string
  status?: "Draft" | "Final" | "Approved" | "For Review"
  description?: string
  file?: File // 👈 important for upload
}

export interface Document {
  _id: string
  projectId: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadDate: string
  version: string
  status: string
  description?: string
  filePath?: string
  isDeleted: boolean
}

// 🔹 Create (Upload) a Document
export const createDocument = async (projectId: string, data: DocumentFormData) => {
  const formData = new FormData()
  if (data.file) formData.append("file", data.file)
  if (data.type) formData.append("type", data.type)
  if (data.version) formData.append("version", data.version)
  if (data.status) formData.append("status", data.status)
  if (data.description) formData.append("description", data.description)

  const response = await axiosInstance.post(`/documents/projects/${projectId}/documents`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data.documents
}

// 🔹 Get all documents (with optional query params: type, sort, q, page, limit)
export const getAllDocuments = async (params?: Record<string, string | number>) => {
  const response = await axiosInstance.get("/documents", { params })
  return response.data
}

// 🔹 Get documents by project
export const getDocumentsByProject = async (projectId: string, params?: Record<string, string | number>) => {
  const response = await axiosInstance.get(`/documents/projects/${projectId}/documents`, { params })
  return response.data
}

// 🔹 Get document by ID
export const getDocumentById = async (id: string) => {
  const response = await axiosInstance.get(`/documents/${id}`)
  return response.data
}

// 🔹 Update document
export const updateDocumentById = async (id: string, payload: Partial<Document>) => {
  const response = await axiosInstance.put(`/documents/${id}`, payload)
  return response.data
}

// 🔹 Soft delete
export const softDeleteDocument = async (id: string) => {
  const response = await axiosInstance.delete(`/documents/${id}`)
  return response.data
}

// 🔹 Hard delete
export const hardDeleteDocument = async (id: string) => {
  const response = await axiosInstance.delete(`/documents/${id}/hard`)
  return response.data
}
