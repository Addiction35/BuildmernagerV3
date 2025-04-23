"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"

interface DashboardProjectsProps {
  extended?: boolean
}

const projects = [
  {
    id: "PRJ001",
    name: "Riverside Apartments",
    client: "Riverside Development LLC",
    status: "In Progress",
    value: "$1,250,000",
    progress: "65%",
    dueDate: "2024-08-30",
  },
  {
    id: "PRJ002",
    name: "Downtown Office Renovation",
    client: "Metro Business Group",
    status: "Planning",
    value: "$450,000",
    progress: "15%",
    dueDate: "2024-01-15",
  },
  {
    id: "PRJ003",
    name: "Hillside Residence",
    client: "Johnson Family",
    status: "In Progress",
    value: "$780,000",
    progress: "40%",
    dueDate: "2024-02-28",
  },
  {
    id: "PRJ004",
    name: "Community Center",
    client: "Oakville Municipality",
    status: "Pending Approval",
    value: "$2,100,000",
    progress: "5%",
    dueDate: "2025-03-31",
  },
  {
    id: "PRJ005",
    name: "Retail Store Fitout",
    client: "Fashion Outlet Inc.",
    status: "Completed",
    value: "$320,000",
    progress: "100%",
    dueDate: "2023-04-15",
  },
]

export function DashboardProjects({ extended = false }: DashboardProjectsProps) {
  const displayProjects = extended ? projects : projects.slice(0, 5)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progress</TableHead>
          {extended && <TableHead>Value</TableHead>}
          {extended && <TableHead>Due Date</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayProjects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.client}</TableCell>
            <TableCell>
              <Badge
                variant={
                  project.status === "Completed"
                    ? "success"
                    : project.status === "In Progress"
                      ? "default"
                      : project.status === "Planning"
                        ? "secondary"
                        : "outline"
                }
              >
                {project.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: project.progress }} />
                </div>
                <span className="text-xs font-medium">{project.progress}</span>
              </div>
            </TableCell>
            {extended && <TableCell>{project.value}</TableCell>}
            {extended && <TableCell>{new Date(project.dueDate).toLocaleDateString()}</TableCell>}
            <TableCell className="text-right">
              <Link href={`/projects/${project.id}`}>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
