"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useProjects } from "@/lib/hooks/projectQueries";

interface DashboardProjectsProps {
  extended?: boolean;
}

export function DashboardProjects({ extended = false }: DashboardProjectsProps) {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading projects...</div>;
  }

  if (error || !projects) {
    return <div className="p-4 text-sm text-red-500">Failed to load projects.</div>;
  }

  const displayProjects = extended ? projects : projects.slice(0, 5);

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
          <TableRow key={project._id}>
            <TableCell className="font-medium">{project.name || "Unnamed Project"}</TableCell>
            <TableCell>{project.client.primaryContact || "Unknown Client"}</TableCell>
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
                {project.status || "Unknown"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: project.progress ?? "0%" }}
                  />
                </div>
                <span className="text-xs font-medium">{project.progress ?? "0%"}</span>
              </div>
            </TableCell>
            {extended && <TableCell>{project.value ?? "N/A"}</TableCell>}
            {extended && (
              <TableCell>
                {project.dueDate
                  ? new Date(project.dueDate).toLocaleDateString()
                  : "No due date"}
              </TableCell>
            )}
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
  );
}
