import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardProjects } from "@/components/dashboard/dashboard-projects"
import { DashboardTasks } from "@/components/dashboard/dashboard-tasks"
import { DashboardFinancials } from "@/components/dashboard/dashboard-financials"
import { DashboardResources } from "@/components/dashboard/dashboard-resources"
import { DashboardDocuments } from "@/components/dashboard/dashboard-documents"
import { DashboardPurchaseOrders } from "@/components/dashboard/dashboard-purchase-orders"
import { DashboardWages } from "@/components/dashboard/dashboard-wages"
import { DashboardExpenses } from "@/components/dashboard/dashboard-expenses"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardPieChart } from "@/components/dashboard/dashboard-pie-chart"

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader title="Admin Dashboard" description="Complete system overview and management" />
  
      <DashboardStats />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-8 bg-background">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Project Status Overview</CardTitle>
                  <CardDescription>Current status of all active projects</CardDescription>
                </div>
                <Link href="/projects">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <DashboardProjects />
              </CardContent>
            </Card>
            <DashboardPieChart />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Tasks due in the next 7 days</CardDescription>
                </div>
                <Link href="/tasks">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <DashboardTasks limit={5} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Recent Purchase Orders</CardTitle>
                  <CardDescription>Recently created purchase orders</CardDescription>
                </div>
                <Link href="/purchase-orders">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <DashboardPurchaseOrders limit={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Recently uploaded or modified documents</CardDescription>
                </div>
                <Link href="/documents">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <DashboardDocuments limit={5} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>All Active Projects</CardTitle>
                <CardDescription>Status and progress of all your active construction projects</CardDescription>
              </div>
              <Link href="/projects/new">
                <Button>New Project</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardProjects extended={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Budget status, expenses, and financial metrics</CardDescription>
              </div>
              <div className="flex gap-2">
                <Link href="/budgets">
                  <Button variant="outline">Manage Budgets</Button>
                </Link>
                <Link href="/expenses">
                  <Button>View Expenses</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <DashboardFinancials />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6 pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>Recent purchase orders and their status</CardDescription>
              </div>
              <Link href="/purchase-orders">
                <Button>New Purchase Order</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardPurchaseOrders extended={true} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Wages</CardTitle>
                <CardDescription>Recent wage payments and their status</CardDescription>
              </div>
              <Link href="/wages">
                <Button>New Wage Entry</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardWages extended={true} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Expenses</CardTitle>
                <CardDescription>Recent expenses and their status</CardDescription>
              </div>
              <Link href="/expenses">
                <Button>New Expense</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardExpenses extended={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Task Management</CardTitle>
                <CardDescription>All tasks across your projects</CardDescription>
              </div>
              <Link href="/tasks/new">
                <Button>New Task</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardTasks extended={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Resource Management</CardTitle>
                <CardDescription>Equipment, materials, and labor resources</CardDescription>
              </div>
              <Link href="/resources/new">
                <Button>Add Resource</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardResources extended={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Document Management</CardTitle>
                <CardDescription>All project documents and files</CardDescription>
              </div>
              <Link href="/documents/upload">
                <Button>Upload Document</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DashboardDocuments extended={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view reports</CardDescription>
              </div>
              <Link href="/reports/new">
                <Button>Generate Report</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center">
                <Link href="/reports">
                  <Button>View All Reports</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
