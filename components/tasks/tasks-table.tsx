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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { useTasks } from "@/lib/hooks/taskQueries"

export function TasksTable() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const toggleAll = () => {
    setSelectedTasks((prev) => (prev.length === tasks.length ? [] : tasks.map((task) => task.id)))
  }

  
    const { data: tasks, isLoading } = useTasks()
  
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (!tasks || tasks.length === 0) 
    {
      return <div>No tasks available</div>;
    }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTasks.length === tasks.length && tasks.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all tasks"
              />
            </TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>
                <Checkbox
                  checked={selectedTasks.includes(task._id)}
                  onCheckedChange={() => toggleTask(task._id)}
                  aria-label={`Select ${task.title}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{task.title}</div>
                <div className="text-xs text-muted-foreground">{task.description}</div>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${task.project._id}`} className="text-blue-600 hover:underline">
                  {task.project.name}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                    <AvatarFallback>{task.assignedTo.initials}</AvatarFallback>
                  </Avatar>
                  <span>{task.assignedTo.name}</span>
                </div>
              </TableCell>
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
                      <Link href={`/tasks/${task.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/tasks/${task.id}/edit`}>Edit Task</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Task
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
