"use client"

import type React from "react"
import { useState } from "react"
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

// 📝 Define validation schema with Zod
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  project: z.string().min(1, "Project is required"),
  assignee: z.string().min(1, "Assignee is required"),
  priority: z.string().min(1, "Priority is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(),
  startDate: z.date({ required_error: "Start date is required" }),
  dueDate: z.date({ required_error: "Due date is required" }),
})

type TaskFormValues = z.infer<typeof taskSchema>

export function TaskForm() {
  const { data: projects } = useProjects()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      project: "",
      assignee: "",
      priority: "",
      status: "",
      description: "",
      startDate: undefined,
      dueDate: undefined,
    },
  })

  const onSubmit = async (data: TaskFormValues) => {
    console.log("Form Data:", data)

    // In a real app, submit data to API
    toast({
      title: "Task created",
      description: "Your task has been created successfully.",
    })
    router.push("/tasks")
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
                <FormLabel htmlFor="assignee">Assignee</FormLabel>
                <Controller
                  control={control}
                  name="assignee"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="assignee">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="user1">John Doe</SelectItem>
                        <SelectItem value="user2">Jane Smith</SelectItem>
                        <SelectItem value="user3">Robert Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.assignee && (
                  <p className="text-sm text-red-500">{errors.assignee.message}</p>
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
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">{errors.startDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <FormLabel>Due Date</FormLabel>
                <Controller
                  control={control}
                  name="dueDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
          <Button type="submit">Create Task</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
