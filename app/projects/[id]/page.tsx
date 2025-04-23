import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Project Details | Construction Management",
  description: "View project details",
}

// This would normally come from a database
const getProject = (id: string) => {
  const projects = [
    {
      id: "PRJ001",
      name: "Riverside Apartments",
      client: "Riverside Development LLC",
      location: "123 River St, Riverside",
      status: "In Progress",
      value: "$1,250,000",
      startDate: "2023-05-15",
      endDate: "2024-08-30",
      progress: "65%",
      description: "A luxury apartment complex with 48 units, featuring modern amenities and riverside views.",
      manager: "Sarah Johnson",
      contact: {
        name: "Robert Thompson",
        email: "robert@riversidedev.com",
        phone: "(555) 123-4567",
      },
    },
  ]

  return projects.find((project) => project.id === id)
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id)

  if (!project) {
    notFound()
  }

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
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
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
            {project.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/estimates/new?project=${project.id}`}>
            <Button variant="outline">Create Estimate</Button>
          </Link>
          <Link href={`/projects/${project.id}/edit`}>
            <Button>Edit Project</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Value</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.value}</div>
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
              {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
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
              <ProjectDetails project={project} />
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
              <ProjectDocuments projectId={project.id} />
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
              <ProjectTimeline projectId={project.id} />
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
              <ProjectFinancials projectId={project.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
