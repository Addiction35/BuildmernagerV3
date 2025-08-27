"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Project {
  _id: string
  name: string
  client: {
    _id: string
    primaryContact: string
  }
  location: string
  status: string
  estimatedBudget: number
  actualSpent: number
  value: number
  balance: number
  startDate: string
  endDate: string
  progress: string
  type: string
  manager: string
  supervisor: string
  contactName: string
  contactRole: string
  contactEmail: string
  contactPhone: string
  projectNumber: string
}

// Mock data
const mockProject: Project = {
  _id: "68ac539ca6e143292281d928",
  name: "Test Project 1",
  client: {
    _id: "68ac5358a6e143292281d921",
    primaryContact: "Edwin Frank",
  },
  location: "Nairobi, KENYA",
  status: "planning",
  estimatedBudget: 0,
  actualSpent: 0,
  value: 33398069.307279997,
  balance: 0,
  startDate: "2025-08-25",
  endDate: "2025-08-26",
  progress: "0%",
  type: "commercial",
  manager: "Brian manoti",
  supervisor: "Brian manoti",
  contactName: "justine mogaka",
  contactRole: "Mwewe",
  contactEmail: "mogakamorekerwa@gmail.com",
  contactPhone: "0101986647",
  projectNumber: "PRJ001",
}

// Mock API functions
const fetchProject = async (id: string): Promise<Project> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockProject
}

const updateProject = async (id: string, projectData: Partial<Project>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (Math.random() > 0.1) {
    return { ...mockProject, ...projectData, updatedAt: new Date().toISOString() }
  } else {
    throw new Error("Failed to update project")
  }
}

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const projectId = params.id as string

  const [formData, setFormData] = useState<Partial<Project>>({})

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject(projectId),
  })

  const updateProjectMutation = useMutation({
    mutationFn: (data: Partial<Project>) => updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
      toast({
        title: "Success",
        description: "Project updated successfully!",
      })
      router.push("/projects")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      })
    },
  })

  useEffect(() => {
    if (project) {
      setFormData(project)
    }
  }, [project])

  const handleInputChange = (field: keyof Project, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProjectMutation.mutate(formData)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading project...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-destructive">Error loading project. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Edit Project</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential project details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="e.g., Nairobi, KENYA"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Project Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="progress">Progress</Label>
                  <Input
                    id="progress"
                    value={formData.progress || ""}
                    onChange={(e) => handleInputChange("progress", e.target.value)}
                    placeholder="e.g., 25%"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>Budget and value details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedBudget">Estimated Budget</Label>
                    <Input
                      id="estimatedBudget"
                      type="number"
                      value={formData.estimatedBudget || 0}
                      onChange={(e) => handleInputChange("estimatedBudget", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Project Value</Label>
                    <Input
                      id="value"
                      type="number"
                      value={formData.value || 0}
                      onChange={(e) => handleInputChange("value", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="actualSpent">Actual Spent</Label>
                    <Input
                      id="actualSpent"
                      type="number"
                      value={formData.actualSpent || 0}
                      onChange={(e) => handleInputChange("actualSpent", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="balance">Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      value={formData.balance || 0}
                      onChange={(e) => handleInputChange("balance", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>Project start and end dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate || ""}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate || ""}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Information */}
            <Card>
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
                <CardDescription>Project management team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manager">Project Manager *</Label>
                    <Input
                      id="manager"
                      value={formData.manager || ""}
                      onChange={(e) => handleInputChange("manager", e.target.value)}
                      placeholder="Enter manager name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervisor">Supervisor *</Label>
                    <Input
                      id="supervisor"
                      value={formData.supervisor || ""}
                      onChange={(e) => handleInputChange("supervisor", e.target.value)}
                      placeholder="Enter supervisor name"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Client and project contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName || ""}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactRole">Contact Role</Label>
                    <Input
                      id="contactRole"
                      value={formData.contactRole || ""}
                      onChange={(e) => handleInputChange("contactRole", e.target.value)}
                      placeholder="Enter contact role"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail || ""}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone || ""}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link href="/projects">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={updateProjectMutation.isPending}>
                {updateProjectMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
