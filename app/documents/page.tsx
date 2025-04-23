import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentsTable } from "@/components/documents/documents-table"
import { DocumentsFilter } from "@/components/documents/documents-filter"

export const metadata: Metadata = {
  title: "Documents | Construction Management",
  description: "Manage your construction documents",
}

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <div className="flex items-center gap-2">
          <Link href="/documents/new">
            <Button>Upload Document</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>View and manage all your construction documents</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentsFilter />
          <DocumentsTable />
        </CardContent>
      </Card>
    </div>
  )
}
