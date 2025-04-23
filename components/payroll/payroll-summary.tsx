"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function PayrollSummary() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Payroll Summary Reports</h3>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <Tabs defaultValue="department">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="department">By Department</TabsTrigger>
          <TabsTrigger value="project">By Project</TabsTrigger>
          <TabsTrigger value="employee">By Employee</TabsTrigger>
        </TabsList>

        <TabsContent value="department" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Management</CardTitle>
                <CardDescription>5 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$25,000</div>
                <p className="text-xs text-muted-foreground">15% of total payroll</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engineering</CardTitle>
                <CardDescription>8 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$38,400</div>
                <p className="text-xs text-muted-foreground">23% of total payroll</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Trades</CardTitle>
                <CardDescription>10 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42,000</div>
                <p className="text-xs text-muted-foreground">25% of total payroll</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Administration</CardTitle>
                <CardDescription>3 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$9,600</div>
                <p className="text-xs text-muted-foreground">6% of total payroll</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Department Breakdown</CardTitle>
              <CardDescription>Payroll distribution by department</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Department chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="project" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Riverside Apartments</CardTitle>
                <CardDescription>8 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$31,200</div>
                <p className="text-xs text-muted-foreground">19% of total payroll</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Hillside Residence</CardTitle>
                <CardDescription>6 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,000</div>
                <p className="text-xs text-muted-foreground">14% of total payroll</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Downtown Office</CardTitle>
                <CardDescription>5 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$21,000</div>
                <p className="text-xs text-muted-foreground">13% of total payroll</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Community Center</CardTitle>
                <CardDescription>7 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$28,000</div>
                <p className="text-xs text-muted-foreground">17% of total payroll</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Breakdown</CardTitle>
              <CardDescription>Payroll distribution by project</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Project chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employee" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Earners</CardTitle>
              <CardDescription>Employees with highest earnings this period</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Employee earnings chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overtime Analysis</CardTitle>
              <CardDescription>Employees with most overtime hours</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Overtime chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
