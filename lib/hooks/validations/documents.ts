import { z } from "zod"

export const documentUploadSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  name: z.string().min(1, "Document name is required"),
  type: z.string().optional(),
  uploadedBy: z.string().optional(),
  version: z.string().default("1.0"),
  status: z.enum(["Draft", "Final", "Approved", "For Review"]).default("Draft"),
  description: z.string().optional(),
  file: z.instanceof(File, { message: "Please select a file to upload" }),
})

export type DocumentUploadFormData = z.infer<typeof documentUploadSchema>
