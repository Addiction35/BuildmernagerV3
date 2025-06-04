"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ProjectDetails } from "@/components/projects/project-details"
import { ProjectDocuments } from "@/components/projects/project-documents"
import { ProjectTimeline } from "@/components/projects/project-timeline"
import { ProjectFinancials } from "@/components/projects/project-financials"
import { ArrowLeft, Building2, CalendarRange, FileText, Receipt } from "lucide-react"
import { use } from "react"
import { useProject } from "@/lib/hooks/projectQueries"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = use(params) ?? {}; // ✅ unwrap the promise

  const { data: project, isLoading, error } = useProject(id)

  if (isLoading) return <div>Loading...</div>
  if (error || !project) return notFound()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/projects">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{project?.name || "Untitled Project"}</h1>
          <Badge
            variant={
              project?.status === "Completed"
                ? "success"
                : project?.status === "In Progress"
                  ? "default"
                  : project?.status === "Planning"
                    ? "secondary"
                    : "outline"
            }
          >
            {project?.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
            {project?._id && (
              <>
                <Link href={`/estimates/new?project=${project._id}`}>
                  <Button variant="outline">Create Estimate</Button>
                </Link>
                <Link href={`/projects/${project._id}/edit`}>
                  <Button>Edit Project</Button>
                </Link>
              </>
            )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Value</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project?.value ?? "N/A"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
            <CalendarRange className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
          <div className="text-sm">
            {project?.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "N/A"}{" "}
            -{" "}
            {project?.endDate
              ? new Date(project.endDate).toLocaleDateString()
              : "N/A"}
          </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>View and manage project information</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectDetails project={project ?? {}} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
              <CardDescription>Manage estimates, proposals, purchase orders, and other documents</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectDocuments projectId={project?._id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>View project milestones and schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectTimeline projectId={project?._id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <CardTitle>Project Financials</CardTitle>
              <CardDescription>Track project budget, expenses, and financial metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectFinancials projectId={project?._id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
