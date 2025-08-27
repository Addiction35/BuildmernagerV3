// lib/api/clients.ts
import axiosInstance from "@/lib/axios"

import type { Client, ClientFormData } from "@/types/clients"

export const createClient = async (data: ClientFormData) => {
  const response = await axiosInstance.post("/clients", data)
  return response.data
}

export const getAllClients = async (): Promise<Client[]> => {
  const response = await axiosInstance.get("/clients")
  return response.data.data
}

export const GetClientById = async (id) => {
  const response = await axiosInstance.get(`/clients/${id}`)
  return response.data.client
}


export const UpdateClientById = async (id, payload) => {
  const response = await axiosInstance.put(`/clients/${id}`, payload);
  return response.data.client; // Return the updated client directly
};

export const deleteClientById = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/clients/${id}`)
}
