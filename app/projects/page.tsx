import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectsTable } from "@/components/projects/projects-table"
import { ProjectsFilter } from "@/components/projects/projects-filter"

export const metadata: Metadata = {
  title: "Projects | Construction Management",
  description: "Manage your construction projects",
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <div className="flex items-center gap-2">
          <Link href="/projects/new">
            <Button>New Project</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>View and manage all your construction projects</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectsFilter />
          <ProjectsTable />
        </CardContent>
      </Card>
    </div>
  )
}
