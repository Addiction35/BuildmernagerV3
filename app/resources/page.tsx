import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResourcesTable } from "@/components/resources/resources-table"
import { ResourcesFilter } from "@/components/resources/resources-filter"

export const metadata: Metadata = {
  title: "Resources | Construction Management",
  description: "Manage your construction resources",
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <div className="flex items-center gap-2">
          <Link href="/resources/new">
            <Button>New Resource</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
          <CardDescription>View and manage all your construction resources</CardDescription>
        </CardHeader>
        <CardContent>
          <ResourcesFilter />
          <ResourcesTable />
        </CardContent>
      </Card>
    </div>
  )
}
