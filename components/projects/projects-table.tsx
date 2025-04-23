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
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"

const projects = [
  {
    id: "PRJ001",
    name: "Riverside Apartments",
    client: "Riverside Development LLC",
    location: "123 River St, Riverside",
    status: "In Progress",
    value: "$1,250,000",
    startDate: "2023-05-15",
    endDate: "2024-08-30",
    progress: "65%",
  },
  {
    id: "PRJ002",
    name: "Downtown Office Renovation",
    client: "Metro Business Group",
    location: "456 Main St, Downtown",
    status: "Planning",
    value: "$450,000",
    startDate: "2023-07-10",
    endDate: "2024-01-15",
    progress: "15%",
  },
  {
    id: "PRJ003",
    name: "Hillside Residence",
    client: "Johnson Family",
    location: "789 Hill Rd, Hillside",
    status: "In Progress",
    value: "$780,000",
    startDate: "2023-03-20",
    endDate: "2024-02-28",
    progress: "40%",
  },
  {
    id: "PRJ004",
    name: "Community Center",
    client: "Oakville Municipality",
    location: "101 Oak Ave, Oakville",
    status: "Pending Approval",
    value: "$2,100,000",
    startDate: "2023-09-01",
    endDate: "2025-03-31",
    progress: "5%",
  },
  {
    id: "PRJ005",
    name: "Retail Store Fitout",
    client: "Fashion Outlet Inc.",
    location: "202 Mall Blvd, Shopville",
    status: "Completed",
    value: "$320,000",
    startDate: "2023-01-10",
    endDate: "2023-04-15",
    progress: "100%",
  },
  {
    id: "PRJ006",
    name: "Industrial Warehouse",
    client: "Logistics Pro LLC",
    location: "303 Industrial Pkwy, Warehouse District",
    status: "In Progress",
    value: "$1,850,000",
    startDate: "2023-04-05",
    endDate: "2024-06-30",
    progress: "55%",
  },
  {
    id: "PRJ007",
    name: "School Renovation",
    client: "Westside School District",
    location: "404 Education Blvd, Westside",
    status: "Planning",
    value: "$3,200,000",
    startDate: "2023-11-15",
    endDate: "2025-08-15",
    progress: "10%",
  },
  {
    id: "PRJ008",
    name: "Medical Center",
    client: "Healthcare Partners",
    location: "505 Health Way, Northside",
    status: "Pending Approval",
    value: "$4,500,000",
    startDate: "2024-01-10",
    endDate: "2026-03-31",
    progress: "2%",
  },
]

export function ProjectsTable() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])

  const toggleProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const toggleAll = () => {
    setSelectedProjects((prev) => (prev.length === projects.length ? [] : projects.map((project) => project.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedProjects.length === projects.length && projects.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all projects"
              />
            </TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProjects.includes(project.id)}
                  onCheckedChange={() => toggleProject(project.id)}
                  aria-label={`Select ${project.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{project.name}</div>
                <div className="text-xs text-muted-foreground">{project.location}</div>
              </TableCell>
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
              <TableCell>{project.value}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: project.progress }} />
                  </div>
                  <span className="text-xs font-medium">{project.progress}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs">
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </div>
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
                      <Link href={`/projects/${project.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/projects/${project.id}/edit`}>Edit Project</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Project
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
