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
import {  useProjects } from "@/lib/hooks/projectQueries"

export function ProjectsTable() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])

  const { data: projects, isLoading } = useProjects()
console.log(projects);
  const toggleProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const toggleAll = () => {
    setSelectedProjects((prev) => (prev.length === projects.length ? [] : projects.map((project) => project.id)))
  }
    if (isLoading) {
      return <div>Loading...</div>
    }

  if (!projects || projects.length === 0) 
  {
    return <div>No projects available</div>;
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
            <TableRow key={project._id}>
              <TableCell>
                <Checkbox
                  checked={selectedProjects.includes(project._id)}
                  onCheckedChange={() => toggleProject(project._id)}
                  aria-label={`Select ${project.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{project.name}</div>
                <div className="text-xs text-muted-foreground">{project.location}</div>
              </TableCell>
              <TableCell>{project.client?.primaryContact}</TableCell>
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
                      <Link href={`/projects/${project._id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/projects/${project._id}/edit`}>Edit Project</Link>
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
