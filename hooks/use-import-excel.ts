"use client"

import { useState } from "react"
import axiosInstance from "@/lib/axios"

// --- Interfaces ---
export interface EstimateSubsection {
  id: string
  code: string
  name: string
  description: string
  quantity: number
  unit: string
  rate: number
  amount: number
  notes: string[]
}

export interface EstimateSection {
  id: string
  code: string
  name: string
  description: string
  quantity: number
  unit: string
  rate: number
  amount: number
  notes: string[]
  subsections: EstimateSubsection[]
}

export interface EstimateGroup {
  id: string
  code: string
  name: string
  description: string
  quantity: number
  unit: string
  rate: number
  amount: number
  notes: string[]
  sections: EstimateSection[]
}

// --- Hook ---
export function useImportExcel() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const importExcel = async (formData: FormData): Promise<EstimateGroup[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.post<EstimateGroup[]>("/upload-estimate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to import Excel file"
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
