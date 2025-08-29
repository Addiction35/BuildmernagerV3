"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Edit, Eye, MoreHorizontal, Share, Trash } from "lucide-react"
import { useDocuments } from "@/lib/hooks/documentQueries"
import { useSearchParams } from "next/navigation"


export function DocumentsTable() {

    const searchParams = useSearchParams()

  // Read params from URL
  const sort = searchParams.get("sort") || "newest"
  const q = searchParams.get("q") || ""
  const page = Number(searchParams.get("page") || 1)
  const limit = Number(searchParams.get("limit") || 10)

  // Call React Query hook with params
  const { data, isLoading, error } = useDocuments({ sort, q, page, limit })

  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const toggleDocument = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId],
    )
  }

  const toggleAll = () => {
    setSelectedDocuments((prev) => (prev.length === documents.length ? [] : documents.map((document) => document.id)))
  }


  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading documents</p>

  
const documents = data?.documents ?? []
const pagination = data?.pagination
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedDocuments.length === documents.length && documents.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all documents"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents?.map((document) => (
            <TableRow key={document._id}>
              <TableCell>
                <Checkbox
                  checked={selectedDocuments.includes(document.id)}
                  onCheckedChange={() => toggleDocument(document.id)}
                  aria-label={`Select ${document.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{document.name}</div>
                <div className="text-xs text-muted-foreground">{document.description}</div>
              </TableCell>
              <TableCell>{document.type}</TableCell>
              <TableCell>
                <Link href={`/projects/${document.projectId}`} className="text-blue-600 hover:underline">
                  {document.project}
                </Link>
              </TableCell>
              <TableCell>{document.size}</TableCell>
              <TableCell>{document.uploadedBy}</TableCell>
              <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    document.status === "Final" || document.status === "Approved"
                      ? "success"
                      : document.status === "For Review"
                        ? "default"
                        : document.status === "Draft"
                          ? "secondary"
                          : "outline"
                  }
                >
                  {document.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <Link href={`/documents/${document.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/documents/${document.id}/edit`}>Edit Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Document
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
