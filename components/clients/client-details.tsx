"use client"

import Link from "next/link"
import { ArrowLeft, Building, Calendar, Download, FileText, Mail, MapPin, Phone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Document {
  id: number
  name: string
  date: string
  size: string
}

interface Project {
  id: string
  name: string
  startDate: string
  budget: number
  status: string
}

interface Client {
  id: string
  companyName: string
  clientType: string
  primaryContact: string
  contactTitle: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  industry: string
  taxId: string
  notes: string
  activeProjects: number
  totalRevenue: number
  lastProjectDate: string
  documents: Document[]
  projects: Project[]
}

interface ClientDetailsProps {
  client: Client
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500"
      case "Completed":
        return "bg-green-500"
      case "On Hold":
        return "bg-yellow-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/clients" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{client.companyName}</CardTitle>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge>{client.clientType}</Badge>
                  <Badge variant="outline">{client.industry}</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Edit</Button>
                <Button>New Project</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {client.primaryContact}, {client.contactTitle}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {client.address}, {client.city}, {client.state} {client.zipCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Business Information</h3>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Tax ID / Business Number</p>
                        <p>{client.taxId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Industry</p>
                        <p>{client.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Client Type</p>
                        <p>{client.clientType}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Notes</h3>
                    <p className="mt-2 text-muted-foreground">{client.notes}</p>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 border-b px-4 py-3 font-medium">
                      <div>Project ID</div>
                      <div>Name</div>
                      <div>Budget</div>
                      <div>Status</div>
                    </div>
                    {client.projects.map((project) => (
                      <div key={project.id} className="grid grid-cols-4 px-4 py-3">
                        <div className="font-medium">{project.id}</div>
                        <div>{project.name}</div>
                        <div>{formatCurrency(project.budget)}</div>
                        <div>
                          <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  {client.documents.length > 0 ? (
                    <div className="space-y-2">
                      {client.documents.map((document) => (
                        <div key={document.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-blue-500" />
                            <div>
                              <p className="font-medium">{document.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {document.size} • Uploaded on {formatDate(document.date)}
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
                    <p className="text-center text-muted-foreground">No documents available</p>
                  )}

                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Upload Document
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
              <CardTitle>Client Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">{client.activeProjects}</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(client.totalRevenue)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Project</h3>
                <div className="mt-1 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(client.lastProjectDate)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
                <div className="mt-2 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    Create New Project
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Proposal
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Client
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
