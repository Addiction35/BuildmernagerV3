"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ReportFieldSelector } from "@/components/reports/report-field-selector"
import { ReportPreview } from "@/components/reports/report-preview"
import { ReportSchedule } from "@/components/reports/report-schedule"

export function ReportBuilder() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("data-source")

  const handleNext = () => {
    if (activeTab === "data-source") setActiveTab("fields")
    else if (activeTab === "fields") setActiveTab("filters")
    else if (activeTab === "filters") setActiveTab("visualization")
    else if (activeTab === "visualization") setActiveTab("preview")
    else if (activeTab === "preview") setActiveTab("schedule")
    else if (activeTab === "schedule") {
      // Submit the report
      router.push("/reports")
    }
  }

  const handleBack = () => {
    if (activeTab === "fields") setActiveTab("data-source")
    else if (activeTab === "filters") setActiveTab("fields")
    else if (activeTab === "visualization") setActiveTab("filters")
    else if (activeTab === "preview") setActiveTab("visualization")
    else if (activeTab === "schedule") setActiveTab("preview")
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="data-source">Data Source</TabsTrigger>
            <TabsTrigger value="fields">Fields</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="data-source" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Data Source</CardTitle>
                <CardDescription>Choose the primary data source for your report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input id="report-name" placeholder="Enter report name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-description">Description</Label>
                  <Textarea id="report-description" placeholder="Enter report description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-source">Primary Data Source</Label>
                  <Select defaultValue="projects">
                    <SelectTrigger id="data-source">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="projects">Projects</SelectItem>
                      <SelectItem value="expenses">Expenses</SelectItem>
                      <SelectItem value="purchase-orders">Purchase Orders</SelectItem>
                      <SelectItem value="wages">Wages</SelectItem>
                      <SelectItem value="resources">Resources</SelectItem>
                      <SelectItem value="tasks">Tasks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="related-sources">Related Data Sources</Label>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="expenses-source" />
                      <label
                        htmlFor="expenses-source"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Expenses
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="purchase-orders-source" />
                      <label
                        htmlFor="purchase-orders-source"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Purchase Orders
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="wages-source" />
                      <label
                        htmlFor="wages-source"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Wages
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="resources-source" />
                      <label
                        htmlFor="resources-source"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Resources
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fields" className="mt-6">
            <ReportFieldSelector />
          </TabsContent>

          <TabsContent value="filters" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configure Filters</CardTitle>
                <CardDescription>Set up filters to narrow down the data in your report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date-range">Date Range</Label>
                      <Select defaultValue="last-30-days">
                        <SelectTrigger id="date-range">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                          <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                          <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                          <SelectItem value="year-to-date">Year to Date</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="status-filter">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Filters</Label>
                    <div className="rounded-md border p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <Select defaultValue="project">
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="project">Project</SelectItem>
                              <SelectItem value="client">Client</SelectItem>
                              <SelectItem value="amount">Amount</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="equals">
                            <SelectTrigger>
                              <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="not-equals">Not Equals</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="greater-than">Greater Than</SelectItem>
                              <SelectItem value="less-than">Less Than</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input placeholder="Enter value" />
                        </div>
                        <Button variant="outline" size="sm">
                          + Add Filter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visualization" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Visualization</CardTitle>
                <CardDescription>Select how you want to visualize your report data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed p-4 hover:border-primary">
                      <div className="h-32 w-full bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="table-viz" defaultChecked />
                      <label htmlFor="table-viz" className="text-sm font-medium leading-none">
                        Table
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed p-4 hover:border-primary">
                      <div className="h-32 w-full rounded-md bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bar-chart-viz" />
                      <label htmlFor="bar-chart-viz" className="text-sm font-medium leading-none">
                        Bar Chart
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed p-4 hover:border-primary">
                      <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pie-chart-viz" />
                      <label htmlFor="pie-chart-viz" className="text-sm font-medium leading-none">
                        Pie Chart
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed p-4 hover:border-primary">
                      <div className="h-32 w-full bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="line-chart-viz" />
                      <label htmlFor="line-chart-viz" className="text-sm font-medium leading-none">
                        Line Chart
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed p-4 hover:border-primary">
                      <div className="h-32 w-full bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="card-viz" />
                      <label htmlFor="card-viz" className="text-sm font-medium leading-none">
                        Summary Cards
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <ReportPreview />
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <ReportSchedule />
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardFooter className="flex justify-between px-0">
        <Button variant="outline" onClick={handleBack} disabled={activeTab === "data-source"}>
          Back
        </Button>
        <Button onClick={handleNext}>{activeTab === "schedule" ? "Create Report" : "Next"}</Button>
      </CardFooter>
    </Card>
  )
}
