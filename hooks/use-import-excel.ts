"use client"

import { useState } from "react"

import type { EstimateData } from "@/types/estimate"
import axiosInstance from "@/lib/axios"

export function useImportExcel() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const importExcel = async (formData: FormData): Promise<EstimateData> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.post("/api/estimates/import-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to import Excel file"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    importExcel,
    isLoading,
    error,
  }
}