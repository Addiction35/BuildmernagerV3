"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { useProjects } from "@/lib/hooks/projectQueries"
import { useUsers } from "@/lib/hooks/userQueries"
import { useCreateTask } from "@/lib/hooks/taskQueries"
import { Loader2 } from "lucide-react"

// Validation schema
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  project: z.string().min(1, "Project is required"),
  assignedTo: z.string().min(1, "Assignee is required"),
  priority: z.string().min(1, "Priority is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(),
  startDate: z.date({ required_error: "Start date is required" }),
  dueDate: z.date({ required_error: "Due date is required" }),
})

type TaskFormValues = z.infer<typeof taskSchema>

export function TaskForm() {
  const { data: projects } = useProjects()
  const { data: users } = useUsers()
  const router = useRouter()
  const { mutate, isLoading } = useCreateTask()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      project: "",
      assignedTo: "",
      priority: "",
      status: "",
      description: "",
      startDate: undefined,
      dueDate: undefined,
    },
  })

  const onSubmit = (data: TaskFormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "✅ Task Created",
          description: "Your task has been created successfully.",
        })
        router.push("/tasks")
      },
      onError: (error) => {
        toast({
          title: "❌ Error Creating Task",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      },
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Details</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CardContent className="space-y-6">
          {/* Title & Project */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FormLabel htmlFor="title">Task Title</FormLabel>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    {...field}
                    className={errors.title ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="project">Project</Label>
              <Controller
                control={control}
                name="project"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="project" className={errors.project ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {projects?.map((project) => (
                        <SelectItem key={project._id} value={project._id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.project && (
                <p className="text-xs text-red-500">{errors.project.message}</p>
              )}
            </div>
          </div>

          {/* Assignee & Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FormLabel htmlFor="assignedTo">Assignee</FormLabel>
              <Controller
                control={control}
                name="assignedTo"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="assignedTo" className={errors.assignedTo ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {users?.map((user) => (
                        <SelectItem key={user._id} value={user._id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.assignedTo && (
                <p className="text-xs text-red-500">{errors.assignedTo.message}</p>
              )}
            </div>

            <div>
              <FormLabel htmlFor="priority">Priority</FormLabel>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="priority" className={errors.priority ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <p className="text-xs text-red-500">{errors.priority.message}</p>
              )}
            </div>
          </div>
              <div className="space-y-2">
                <FormLabel htmlFor="priority">Priority</FormLabel>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.priority && (
                  <p className="text-sm text-red-500">{errors.priority.message}</p>
                )}
              </div>
            </div>

          {/* Start Date & Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FormLabel>Start Date</FormLabel>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Input
                    id="startDate"
                    type="date"
                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    className={errors.startDate ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.startDate && (
                <p className="text-xs text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <FormLabel>Due Date</FormLabel>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <Input
                    id="dueDate"
                    type="date"
                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    className={errors.dueDate ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.dueDate && (
                <p className="text-xs text-red-500">{errors.dueDate.message}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="status" className={errors.status ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-xs text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                  {...field}
                />
              )}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className={`transition transform ${isLoading ? "opacity-70 scale-95" : "active:scale-95 hover:scale-105"}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Task"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
