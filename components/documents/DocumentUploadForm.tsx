"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Loader2, ArrowLeft, Calendar, User, FileIcon, CheckCircle } from "lucide-react"
import { documentUploadSchema, type DocumentUploadFormData } from "@/lib/hooks/validations/documents"
import { useCreateDocument } from "@/lib/hooks/documentQueries"
import { useToast } from "@/hooks/use-toast"

interface DocumentUploadFormProps {
  projectId?: string
  onSuccess?: (data: any) => void
}

function FilePreview({ uploadedDocument, onBack }: { uploadedDocument: any; onBack: () => void }) {
  const getFileIcon = (type: string) => {
    if (type.includes("image")) return "🖼️"
    if (type.includes("pdf")) return "📄"
    if (type.includes("word") || type.includes("document")) return "📝"
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊"
    if (type.includes("powerpoint") || type.includes("presentation")) return "📊"
    return "📁"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-800"
      case "Final":
        return "bg-blue-100 text-blue-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "For Review":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <CardTitle className="text-green-700">Upload Successful!</CardTitle>
              <CardDescription>Your document has been uploaded and is ready for use.</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Preview Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{getFileIcon(uploadedDocument.type || "")}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 truncate">{uploadedDocument.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{uploadedDocument.type}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FileIcon className="h-4 w-4" />
                  {uploadedDocument.size}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(uploadedDocument.uploadDate || Date.now()).toLocaleDateString()}
                </span>
                {uploadedDocument.uploadedBy && (
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {uploadedDocument.uploadedBy}
                  </span>
                )}
              </div>
            </div>
            <Badge className={`${getStatusColor(uploadedDocument.status)} border-0`}>{uploadedDocument.status}</Badge>
          </div>
        </div>

        {/* Document Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-gray-700">Project ID</Label>
              <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                {uploadedDocument.projectId}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Version</Label>
              <p className="text-sm text-gray-900">{uploadedDocument.version}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-gray-700">Document ID</Label>
              <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                {uploadedDocument._id || uploadedDocument.id || "Generated after save"}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Upload Date</Label>
              <p className="text-sm text-gray-900">
                {new Date(uploadedDocument.uploadDate || Date.now()).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {uploadedDocument.description && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Description</Label>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">{uploadedDocument.description}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
            Upload Another Document
          </Button>
          <Button className="flex-1">View in Project</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function DocumentUploadForm({ projectId, onSuccess }: DocumentUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedDocument, setUploadedDocument] = useState<any>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<DocumentUploadFormData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      projectId: projectId || "",
      version: "1.0",
      status: "Draft",
    },
  })

  const uploadMutation = useCreateDocument()

  const handleMutationSuccess = (data: any) => {
    toast({
      title: "Success",
      description: "Document uploaded successfully!",
    })
    setUploadedDocument(data)
    onSuccess?.(data)
  }

  const handleBack = () => {
    setUploadedDocument(null)
    reset()
    setSelectedFile(null)
  }

  if (uploadedDocument) {
    return <FilePreview uploadedDocument={uploadedDocument} onBack={handleBack} />
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setValue("file", file)
      setValue("name", file.name.split(".")[0]) // Auto-fill name from filename
      setValue("type", file.type)
    }
  }

  const onSubmit = (data: DocumentUploadFormData) => {
    console.log("[v0] Form data being submitted:", data)
    console.log("[v0] Selected file:", selectedFile)

    const submitData = {
      file: selectedFile,
      name: data.name,
      type: data.type,
      version: data.version,
      description: data.description,
    }

    console.log(" Submit data structure:", submitData)

    uploadMutation.mutate(
      {
        projectId: data.projectId,
        data: submitData,
      },
      {
        onSuccess: handleMutationSuccess,
        onError: (error: any) => {
          console.log("[v0] Upload error:", error)
          toast({
            title: "Error",
            description: error.response?.data?.message || "Failed to upload document",
            variant: "destructive",
          })
        },
      },
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Document
        </CardTitle>
        <CardDescription>Upload a new document to the project. All fields marked with * are required.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project ID */}
          <div className="space-y-2">
            <Label htmlFor="projectId">Project ID *</Label>
            <Input id="projectId" {...register("projectId")} placeholder="Enter project ID" disabled={!!projectId} />
            {errors.projectId && (
              <Alert variant="destructive">
                <AlertDescription>{errors.projectId.message}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">File *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input id="file" type="file" onChange={handleFileChange} className="hidden" accept="*/*" />
              <Label
                htmlFor="file"
                className="cursor-pointer flex flex-col items-center gap-2 hover:text-primary transition-colors"
              >
                {selectedFile ? (
                  <>
                    <FileText className="h-8 w-8" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8" />
                    <div>
                      <p className="font-medium">Click to upload a file</p>
                      <p className="text-sm text-muted-foreground">or drag and drop</p>
                    </div>
                  </>
                )}
              </Label>
            </div>
            {errors.file && (
              <Alert variant="destructive">
                <AlertDescription>{errors.file.message}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Document Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Document Name *</Label>
            <Input id="name" {...register("name")} placeholder="Enter document name" />
            {errors.name && (
              <Alert variant="destructive">
                <AlertDescription>{errors.name.message}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Uploaded By */}
          <div className="space-y-2">
            <Label htmlFor="uploadedBy">Uploaded By</Label>
            <Input id="uploadedBy" {...register("uploadedBy")} placeholder="Enter uploader name" />
          </div>

          {/* Version and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input id="version" {...register("version")} placeholder="1.0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={watch("status")} onValueChange={(value) => setValue("status", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="For Review">For Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter document description (optional)"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={uploadMutation.isPending}>
            {uploadMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
