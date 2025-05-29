"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import { useTask, useTasks } from "@/lib/hooks/taskQueries"

interface DashboardTasksProps {
  limit?: number
  extended?: boolean
}

export function DashboardTasks({ limit, extended = false }: DashboardTasksProps) {
  const { data: tasks, isLoading: loadProjects } = useTasks()

  const displayTasks = limit ? tasks.slice(0, limit) : tasks

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          {extended && <TableHead>Project</TableHead>}
          <TableHead>Assigned To</TableHead>
          {extended && <TableHead>Status</TableHead>}
          <TableHead>Priority</TableHead>
          <TableHead>Due Date</TableHead>
          {extended && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayTasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            {extended && (
              <TableCell>
                <Link href={`/projects/${task.projectId}`} className="text-blue-600 hover:underline">
                  {task.project}
                </Link>
              </TableCell>
            )}
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                  <AvatarFallback>{task.assignedTo.initials}</AvatarFallback>
                </Avatar>
                {extended && <span>{task.assignedTo.name}</span>}
              </div>
            </TableCell>
            {extended && (
              <TableCell>
                <Badge
                  variant={
                    task.status === "Completed"
                      ? "success"
                      : task.status === "In Progress"
                        ? "default"
                        : task.status === "Not Started"
                          ? "secondary"
                          : "outline"
                  }
                >
                  {task.status}
                </Badge>
              </TableCell>
            )}
            <TableCell>
              <Badge
                variant={
                  task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                }
              >
                {task.priority}
              </Badge>
            </TableCell>
            <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
            {extended && (
              <TableCell className="text-right">
                <Link href={`/tasks/${task.id}`}>
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
