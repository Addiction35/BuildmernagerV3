"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileText, FileImage, FileSpreadsheet } from "lucide-react"

interface DashboardDocumentsProps {
  limit?: number
  extended?: boolean
}

const documents = [
  {
    id: "DOC001",
    name: "Riverside Apartments - Construction Contract.pdf",
    type: "Contract",
    icon: FileText,
    uploadedBy: "John Smith",
    uploadDate: "2023-01-15",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    status: "Final",
  },
  {
    id: "DOC002",
    name: "Downtown Office - Electrical Plans.dwg",
    type: "Drawing",
    icon: FileImage,
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-03-10",
    projectId: "PRJ002",
    project: "Downtown Office Renovation",
    status: "For Review",
  },
  {
    id: "DOC003",
    name: "Hillside Residence - Building Permit.pdf",
    type: "Permit",
    icon: FileText,
    uploadedBy: "Michael Chen",
    uploadDate: "2023-02-20",
    projectId: "PRJ003",
    project: "Hillside Residence",
    status: "Approved",
  },
  {
    id: "DOC004",
    name: "Community Center - Budget Spreadsheet.xlsx",
    type: "Spreadsheet",
    icon: FileSpreadsheet,
    uploadedBy: "Emily Rodriguez",
    uploadDate: "2023-05-05",
    projectId: "PRJ004",
    project: "Community Center",
    status: "Draft",
  },
  {
    id: "DOC005",
    name: "Riverside Apartments - Soil Test Report.pdf",
    type: "Report",
    icon: FileText,
    uploadedBy: "David Kim",
    uploadDate: "2023-01-05",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    status: "Final",
  },
]

export function DashboardDocuments({ limit, extended = false }: DashboardDocumentsProps) {
  const displayDocuments = limit ? documents.slice(0, limit) : documents

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Document</TableHead>
          {extended && <TableHead>Type</TableHead>}
          {extended && <TableHead>Project</TableHead>}
          <TableHead>Uploaded By</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          {extended && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayDocuments.map((document) => (
          <TableRow key={document.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <document.icon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{document.name}</span>
              </div>
            </TableCell>
            {extended && <TableCell>{document.type}</TableCell>}
            {extended && (
              <TableCell>
                <Link href={`/projects/${document.projectId}`} className="text-blue-600 hover:underline">
                  {document.project}
                </Link>
              </TableCell>
            )}
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
            {extended && (
              <TableCell className="text-right">
                <Link href={`/documents/${document.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
