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

const documents = [
  {
    id: "DOC001",
    name: "Riverside Apartments - Construction Contract.pdf",
    type: "Contract",
    size: "2.4 MB",
    uploadedBy: "John Smith",
    uploadDate: "2023-01-15",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    version: "1.0",
    status: "Final",
    description: "Main construction contract for Riverside Apartments project",
  },
  {
    id: "DOC002",
    name: "Downtown Office - Electrical Plans.dwg",
    type: "Drawing",
    size: "5.8 MB",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-03-10",
    projectId: "PRJ002",
    project: "Downtown Office Renovation",
    version: "2.1",
    status: "For Review",
    description: "Electrical layout plans for all floors",
  },
  {
    id: "DOC003",
    name: "Hillside Residence - Building Permit.pdf",
    type: "Permit",
    size: "1.2 MB",
    uploadedBy: "Michael Chen",
    uploadDate: "2023-02-20",
    projectId: "PRJ003",
    project: "Hillside Residence",
    version: "1.0",
    status: "Approved",
    description: "Approved building permit from city authorities",
  },
  {
    id: "DOC004",
    name: "Community Center - Structural Specifications.docx",
    type: "Specification",
    size: "3.5 MB",
    uploadedBy: "Emily Rodriguez",
    uploadDate: "2023-05-05",
    projectId: "PRJ004",
    project: "Community Center",
    version: "1.2",
    status: "Draft",
    description: "Structural specifications for foundation and framing",
  },
  {
    id: "DOC005",
    name: "Riverside Apartments - Soil Test Report.pdf",
    type: "Report",
    size: "8.7 MB",
    uploadedBy: "David Kim",
    uploadDate: "2023-01-05",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    version: "1.0",
    status: "Final",
    description: "Geotechnical report with soil testing results",
  },
  {
    id: "DOC006",
    name: "Retail Store - Interior Design Plans.dwg",
    type: "Drawing",
    size: "4.2 MB",
    uploadedBy: "Lisa Wang",
    uploadDate: "2023-01-20",
    projectId: "PRJ005",
    project: "Retail Store Fitout",
    version: "3.0",
    status: "Final",
    description: "Interior design and fixture layout plans",
  },
]

export function DocumentsTable() {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const toggleDocument = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId],
    )
  }

  const toggleAll = () => {
    setSelectedDocuments((prev) => (prev.length === documents.length ? [] : documents.map((document) => document.id)))
  }

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
          {documents.map((document) => (
            <TableRow key={document.id}>
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
