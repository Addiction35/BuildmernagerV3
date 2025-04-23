import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AlertCircle, Clock } from "lucide-react"

export function QADashboard() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader title="QA Dashboard" description="Quality assurance and inspection management" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">15</CardTitle>
            <CardDescription>Pending Inspections</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">8</CardTitle>
            <CardDescription>Issues Reported</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">92%</CardTitle>
            <CardDescription>Quality Score</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">5</CardTitle>
            <CardDescription>Inspections Today</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="inspections" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-background">
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Upcoming Inspections</CardTitle>
                <CardDescription>Scheduled quality inspections</CardDescription>
              </div>
              <Link href="/inspections/new">
                <Button>Schedule Inspection</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Downtown Office Building - Floor 3</h3>
                      <p className="text-sm text-muted-foreground">Scheduled for Apr 25, 2023 - 10:00 AM</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Riverside Apartments - Plumbing</h3>
                      <p className="text-sm text-muted-foreground">Scheduled for Apr 26, 2023 - 2:00 PM</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Community Center - Electrical</h3>
                      <p className="text-sm text-muted-foreground">Scheduled for Apr 27, 2023 - 9:00 AM</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                  </div>
                </div>

                <Link href="/inspections" className="block text-center">
                  <Button variant="outline">View All Inspections</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Quality Issues</CardTitle>
                <CardDescription>Reported issues and defects</CardDescription>
              </div>
              <Link href="/issues/new">
                <Button>Report Issue</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Downtown Office Building - Drywall Cracks</h3>
                      <p className="text-sm text-muted-foreground">Reported on Apr 20, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">High Priority</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Riverside Apartments - Pipe Leakage</h3>
                      <p className="text-sm text-muted-foreground">Reported on Apr 22, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">High Priority</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Community Center - Paint Quality</h3>
                      <p className="text-sm text-muted-foreground">Reported on Apr 23, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Medium Priority</span>
                    </div>
                  </div>
                </div>

                <Link href="/issues" className="block text-center">
                  <Button variant="outline">View All Issues</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Quality Reports</CardTitle>
                <CardDescription>Generated quality assurance reports</CardDescription>
              </div>
              <Link href="/reports/new">
                <Button>Generate Report</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Downtown Office Building - Monthly QA Report</h3>
                      <p className="text-sm text-muted-foreground">Generated on Apr 1, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Riverside Apartments - Plumbing Inspection Report</h3>
                      <p className="text-sm text-muted-foreground">Generated on Apr 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Community Center - Electrical Safety Report</h3>
                      <p className="text-sm text-muted-foreground">Generated on Apr 18, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <Link href="/reports" className="block text-center">
                  <Button variant="outline">View All Reports</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Quality Standards</CardTitle>
                <CardDescription>Reference materials and checklists</CardDescription>
              </div>
              <Link href="/standards/new">
                <Button>Add Standard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Building Code Compliance Checklist</h3>
                      <p className="text-sm text-muted-foreground">Last updated on Mar 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Electrical Installation Standards</h3>
                      <p className="text-sm text-muted-foreground">Last updated on Feb 28, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Plumbing Quality Guidelines</h3>
                      <p className="text-sm text-muted-foreground">Last updated on Mar 10, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <Link href="/standards" className="block text-center">
                  <Button variant="outline">View All Standards</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
