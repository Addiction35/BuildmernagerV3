"use client"

import { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle, Clock, Download, FileText, Paperclip } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { fetchTaskById } from "@/lib/api/tasks" // Replace with your actual API

export default function TaskDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // ✅ same pattern as PurchaseOrderPage
  const [newComment, setNewComment] = useState("")

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id,
  })

  if (isLoading) return <p className="text-center py-10">Loading task...</p>
  if (error || !task) return <p className="text-center py-10 text-red-500">Task not found</p>

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-gray-500"
      case "In Progress":
        return "bg-blue-500"
      case "Review":
        return "bg-yellow-500"
      case "Completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "High":
        return "bg-orange-500"
      case "Urgent":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // API call to add comment
    setNewComment("")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/tasks" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{task.title}</CardTitle>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge className={`${getStatusColor(task.status)} text-white`}>{task.status}</Badge>
                  <Badge className={`${getPriorityColor(task.priority)} text-white`}>{task.priority}</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Edit</Button>
                <Select defaultValue={task.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="comments">Comments </TabsTrigger>
                  <TabsTrigger value="attachments">Attachments </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Description</h3>
                    <p className="mt-2 text-muted-foreground">{task.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Progress</h3>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{task.completionPercentage}% Complete</span>
                        <span className="text-sm text-muted-foreground">
                          {task.completionPercentage === 100 ? (
                            <span className="flex items-center text-green-500">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              In Progress
                            </span>
                          )}
                        </span>
                      </div>
                      <Progress value={task.completionPercentage} className="mt-2" />
                    </div>
                  </div>
                </TabsContent>



                <TabsContent value="attachments" className="space-y-4">
                  {task.attachments.length > 0 ? (
                    <div className="space-y-2">
                      {task.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-blue-500" />
                            <div>
                              <p className="font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {attachment.size} • Uploaded by {attachment.uploadedBy} on {formatDate(attachment.date)}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No attachments</p>
                  )}

                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Add Attachment
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assignee</h3>
                <div className="mt-1 flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>
                      {task.assignedTo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{task.assignedTo.name}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Project</h3>
                <p className="mt-1">{task.project.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                <div className="mt-1 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(task.startDate)}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                <div className="mt-1 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Activity</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                    <div>
                      <p className="text-sm">Task created</p>
                      <p className="text-xs text-muted-foreground">{formatDate(task.startDate)}</p>
                    </div>
                  </div>
                  {task.comments.length > 0 && (
                    <div className="flex items-start space-x-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm">
                          {task.comments.length} comment{task.comments.length > 1 ? "s" : ""} added
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Latest on {formatDate(task.comments[task.comments.length - 1].date)}
                        </p>
                      </div>
                    </div>
                  )}
                  {task.status === "Completed" && (
                    <div className="flex items-start space-x-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                      <div>
                        <p className="text-sm">Task completed</p>
                        <p className="text-xs text-muted-foreground">{formatDate(task.endDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
