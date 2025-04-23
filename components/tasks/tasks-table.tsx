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

const tasks = [
  {
    id: "TASK001",
    title: "Complete foundation inspection",
    description: "Inspect foundation work and prepare report",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    assignedTo: {
      id: "USR001",
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    status: "Completed",
    priority: "High",
    dueDate: "2023-06-15",
    createdDate: "2023-06-01",
  },
  {
    id: "TASK002",
    title: "Order electrical supplies",
    description: "Place order for all electrical components needed for phase 2",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    assignedTo: {
      id: "USR002",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    status: "In Progress",
    priority: "Medium",
    dueDate: "2023-06-20",
    createdDate: "2023-06-05",
  },
  {
    id: "TASK003",
    title: "Schedule plumbing subcontractor",
    description: "Coordinate with plumbing team for bathroom installations",
    projectId: "PRJ002",
    project: "Downtown Office Renovation",
    assignedTo: {
      id: "USR003",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    status: "Not Started",
    priority: "High",
    dueDate: "2023-06-25",
    createdDate: "2023-06-08",
  },
  {
    id: "TASK004",
    title: "Review architectural changes",
    description: "Review and approve proposed changes to floor plan",
    projectId: "PRJ003",
    project: "Hillside Residence",
    assignedTo: {
      id: "USR004",
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    status: "On Hold",
    priority: "Medium",
    dueDate: "2023-06-18",
    createdDate: "2023-06-02",
  },
  {
    id: "TASK005",
    title: "Prepare progress report",
    description: "Create monthly progress report for client meeting",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    assignedTo: {
      id: "USR001",
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    status: "In Progress",
    priority: "High",
    dueDate: "2023-06-30",
    createdDate: "2023-06-10",
  },
  {
    id: "TASK006",
    title: "Finalize material selections",
    description: "Get client approval on all finish materials",
    projectId: "PRJ004",
    project: "Community Center",
    assignedTo: {
      id: "USR002",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    status: "Not Started",
    priority: "Low",
    dueDate: "2023-07-05",
    createdDate: "2023-06-12",
  },
]

export function TasksTable() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const toggleAll = () => {
    setSelectedTasks((prev) => (prev.length === tasks.length ? [] : tasks.map((task) => task.id)))
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
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={() => toggleTask(task.id)}
                  aria-label={`Select ${task.title}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{task.title}</div>
                <div className="text-xs text-muted-foreground">{task.description}</div>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${task.projectId}`} className="text-blue-600 hover:underline">
                  {task.project}
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
