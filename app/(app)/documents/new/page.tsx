import { DocumentUploadForm } from "@/components/documents/DocumentUploadForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Document | Construction Management",
  description: "Upload New document",
}

export default function NewDocumentPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload New Document</h1>
          <p className="text-muted-foreground">Upload New Document project</p>
        </div>
      </div>

      <DocumentUploadForm />
    </div>
  )
}
