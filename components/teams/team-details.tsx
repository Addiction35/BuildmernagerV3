"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Mail, Phone, Star, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

interface TeamLead {
  id: string
  name: string
  role: string
  email: string
  phone: string
}

interface Project {
  id: string
  name: string
  startDate: string
  endDate: string
  status: string
}

interface Team {
  id: string
  name: string
  department: string
  description: string
  teamLead: TeamLead
  members: TeamMember[]
  specializations: string
  activeProjects: number
  completedProjects: number
  performance: number
  projects: Project[]
}

interface TeamDetailsProps {
  team: Team
}

export function TeamDetails({ team }: TeamDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
        <Link href="/teams" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teams
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{team.name}</CardTitle>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge>{team.department}</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Edit</Button>
                <Button>Assign Project</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Team Description</h3>
                    <p className="mt-2 text-muted-foreground">{team.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Team Lead</h3>
                    <div className="mt-2 rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {team.teamLead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{team.teamLead.name}</p>
                          <p className="text-sm text-muted-foreground">{team.teamLead.role}</p>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{team.teamLead.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{team.teamLead.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Specializations</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {team.specializations.split(", ").map((spec, index) => (
                        <Badge key={index} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Performance</h3>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{team.performance}% Performance Rating</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.round(team.performance / 20)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-none text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <Progress value={team.performance} className="mt-2" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="members" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-4 rounded-lg border p-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <User className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Add Team Member
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 border-b px-4 py-3 font-medium">
                      <div>Project ID</div>
                      <div>Name</div>
                      <div>Timeline</div>
                      <div>Status</div>
                    </div>
                    {team.projects.map((project) => (
                      <div key={project.id} className="grid grid-cols-4 px-4 py-3">
                        <div className="font-medium">{project.id}</div>
                        <div>{project.name}</div>
                        <div className="text-sm">
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </div>
                        <div>
                          <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Team Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">{team.activeProjects}</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{team.completedProjects}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Team Size</h3>
                <p className="mt-1 text-2xl font-bold">{team.members.length} Members</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
                <div className="mt-2 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Team Members
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Team Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Message Team
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
