"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileSpreadsheet, Printer } from "lucide-react"

export function ReportPreview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Report Preview</CardTitle>
            <CardDescription>Preview how your report will look</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3 mx-6 mt-2">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Project Name</th>
                    <th className="px-4 py-2 text-left">Project Status</th>
                    <th className="px-4 py-2 text-left">Total Budget</th>
                    <th className="px-4 py-2 text-left">Total Expenses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">Riverside Apartments</td>
                    <td className="px-4 py-2">In Progress</td>
                    <td className="px-4 py-2">$1,250,000</td>
                    <td className="px-4 py-2">$1,180,500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Downtown Office Complex</td>
                    <td className="px-4 py-2">In Progress</td>
                    <td className="px-4 py-2">$3,750,000</td>
                    <td className="px-4 py-2">$3,825,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Westside Mall Renovation</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">$2,100,000</td>
                    <td className="px-4 py-2">$1,950,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Harbor View Condos</td>
                    <td className="px-4 py-2">Planning</td>
                    <td className="px-4 py-2">$4,500,000</td>
                    <td className="px-4 py-2">$450,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Central Park Landscaping</td>
                    <td className="px-4 py-2">In Progress</td>
                    <td className="px-4 py-2">$850,000</td>
                    <td className="px-4 py-2">$720,000</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t font-medium">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">$12,450,000</td>
                    <td className="px-4 py-2">$8,125,500</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="chart" className="p-6">
            <div className="flex justify-center">
              <div className="h-80 w-full max-w-3xl rounded-md bg-muted p-4 flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization will appear here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="summary" className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">3 in progress, 1 completed, 1 planning</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,450,000</div>
                  <p className="text-xs text-muted-foreground">Across all projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,125,500</div>
                  <p className="text-xs text-muted-foreground">65.3% of total budget</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Budget Variance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$4,324,500</div>
                  <p className="text-xs text-muted-foreground">34.7% under budget</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
