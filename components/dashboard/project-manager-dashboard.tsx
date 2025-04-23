import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTasks } from "@/components/dashboard/dashboard-tasks"
import { DashboardResources } from "@/components/dashboard/dashboard-resources"
import { DashboardFinancials } from "@/components/dashboard/dashboard-financials"
import { Progress } from "@/components/ui/progress"

export function ProjectManagerDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader title="Project Manager Dashboard" description="Manage your projects and resources" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">8</CardTitle>
            <CardDescription>Active Projects</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">24</CardTitle>
            <CardDescription>Team Members</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">12</CardTitle>
            <CardDescription>Overdue Tasks</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">$1.2M</CardTitle>
            <CardDescription>Budget Allocated</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-background">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Status of all your active projects</CardDescription>
              </div>
              <Link href="/projects/new">
                <Button>New Project</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Downtown Office Building</h3>
                    <span className="text-sm text-green-600 font-medium">On Track</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>65% Complete</span>
                    <span>Due in 45 days</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Riverside Apartments</h3>
                    <span className="text-sm text-yellow-600 font-medium">At Risk</span>
                  </div>
                  <Progress value={32} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>32% Complete</span>
                    <span>Due in 60 days</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Community Center Renovation</h3>
                    <span className="text-sm text-red-600 font-medium">Delayed</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>78% Complete</span>
                    <span>Overdue by 15 days</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Highway Bridge Repair</h3>
                    <span className="text-sm text-green-600 font-medium">On Track</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>45% Complete</span>
                    <span>Due in 90 days</span>
                  </div>
                </div>

                <Link href="/projects" className="block text-center">
                  <Button variant="outline">View All Projects</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage your project teams</CardDescription>
              </div>
              <Link href="/teams">
                <Button>Manage Teams</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Downtown Office Building Team</h3>
                  <p className="text-sm text-muted-foreground mb-2">8 members</p>
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      JD
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      TS
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      MR
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      KL
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      +4
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Riverside Apartments Team</h3>
                  <p className="text-sm text-muted-foreground mb-2">6 members</p>
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      RB
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      AL
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      PK
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      +3
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Community Center Team</h3>
                  <p className="text-sm text-muted-foreground mb-2">5 members</p>
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      TJ
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      SM
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                      +3
                    </div>
                  </div>
                </div>

                <Link href="/teams" className="block text-center">
                  <Button variant="outline">View All Teams</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Task Management</CardTitle>
                <CardDescription>Manage tasks across all projects</CardDescription>
              </div>
              <Link href="/tasks/new">
                <Button>New Task</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardTasks extended={true} limit={10} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>Manage equipment and materials</CardDescription>
              </div>
              <Link href="/resources">
                <Button>Manage Resources</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardResources extended={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Budget Management</CardTitle>
                <CardDescription>Track project budgets and expenses</CardDescription>
              </div>
              <Link href="/budgets">
                <Button>Manage Budgets</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardFinancials />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
