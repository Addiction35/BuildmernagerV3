"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { useProjects } from "@/lib/hooks/projectQueries"
import { cn } from "@/lib/utils"
import {  useUsers } from "@/lib/hooks/userQueries"
import { useCreateTask } from "@/lib/hooks/taskQueries"

// 📝 Define validation schema with Zod
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

  const {mutate, isLoading, isSuccess} = useCreateTask();

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

  const onSubmit = async (data: TaskFormValues) => {
    console.log("Form Data:", data)
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Task created",
          description: "Your task has been created successfully.",
        })
        router.push("/tasks")
      },
      onError: (error) => {
        toast({
          title: "Error creating task",
          description: error.message || "Something went wrong",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Details</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Row 1: Title and Project */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
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
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Controller
                  control={control}
                  name="project"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="project">
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
                  <p className="text-sm text-red-500">{errors.project.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Assignee and Priority */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="assignedTo">Assignee</FormLabel>
                <Controller
                  control={control}
                  name="assignedTo"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="assignee">
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
                  <p className="text-sm text-red-500">{errors.assignedTo.message}</p>
                )}
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
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.priority && (
                  <p className="text-sm text-red-500">{errors.priority.message}</p>
                )}
              </div>
            </div>

            {/* Row 3: Start Date and Due Date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel>Start Date</FormLabel>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="startDate"
                        type="date"
                        value={field.value ? field.value.split("T")[0] : ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                {errors.startDate && (
                  <p className="text-sm text-red-500">{errors.startDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <FormLabel>Due Date</FormLabel>
                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="dueDate"
                        type="date"
                        value={field.value ? field.value.split("T")[0] : ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                {errors.dueDate && (
                  <p className="text-sm text-red-500">{errors.dueDate.message}</p>
                )}
              </div>
            </div>

            {/* Row 4: Status */}
            <div className="space-y-2">
              <FormLabel htmlFor="status">Status</FormLabel>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            {/* Row 5: Description */}
            <div className="space-y-2">
              <FormLabel htmlFor="description">Description</FormLabel>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    id="description"
                    placeholder="Enter task description"
                    className="min-h-[120px]"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} >
            {isLoading ? "creating" : "Create Task"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
