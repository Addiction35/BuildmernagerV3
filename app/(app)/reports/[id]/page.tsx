import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportViewer } from "@/components/reports/report-viewer"
import { ReportControls } from "@/components/reports/report-controls"
import { Download, FileSpreadsheet, Printer, Share2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Report Details | Construction Management",
  description: "View and export report details",
}

// Mock function to get report data
function getReport(id: string) {
  const reports = [
    {
      id: "REP001",
      name: "Project Financial Summary",
      description: "Financial overview of all active projects",
      created: "2023-04-15T10:30:00Z",
      lastRun: "2023-06-20T14:45:00Z",
      type: "financial",
      status: "completed",
    },
    {
      id: "REP002",
      name: "Resource Allocation",
      description: "Analysis of resource allocation across projects",
      created: "2023-05-10T09:15:00Z",
      lastRun: "2023-06-19T11:30:00Z",
      type: "resources",
      status: "completed",
    },
    {
      id: "REP003",
      name: "Budget vs. Actual Expenses",
      description: "Comparison of budgeted vs. actual expenses",
      created: "2023-06-01T13:45:00Z",
      lastRun: "2023-06-18T16:20:00Z",
      type: "financial",
      status: "completed",
    },
  ]

  return reports.find((report) => report.id === id)
}

export default function ReportPage({ params }: { params: { id: string } }) {
  const report = getReport(params.id)

  if (!report) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{report.name}</h1>
          <p className="text-muted-foreground">{report.description}</p>
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
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="view">View Report</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="view" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4 flex flex-row items-center justify-between">
              <CardTitle>Report Results</CardTitle>
              <ReportControls />
            </CardHeader>
            <CardContent>
              <ReportViewer reportId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Raw Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Project</th>
                      <th className="px-4 py-2 text-left">Budget</th>
                      <th className="px-4 py-2 text-left">Expenses</th>
                      <th className="px-4 py-2 text-left">Variance</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2">Riverside Apartments</td>
                      <td className="px-4 py-2">$1,250,000</td>
                      <td className="px-4 py-2">$1,180,500</td>
                      <td className="px-4 py-2 text-green-600">$69,500</td>
                      <td className="px-4 py-2">In Progress</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">Downtown Office Complex</td>
                      <td className="px-4 py-2">$3,750,000</td>
                      <td className="px-4 py-2">$3,825,000</td>
                      <td className="px-4 py-2 text-red-600">-$75,000</td>
                      <td className="px-4 py-2">In Progress</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">Westside Mall Renovation</td>
                      <td className="px-4 py-2">$2,100,000</td>
                      <td className="px-4 py-2">$1,950,000</td>
                      <td className="px-4 py-2 text-green-600">$150,000</td>
                      <td className="px-4 py-2">Completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Report Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Report Information</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="text-sm">{new Date(report.created).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Run</p>
                      <p className="text-sm">{new Date(report.lastRun).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="text-sm capitalize">{report.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm capitalize">{report.status}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Schedule</h3>
                  <p className="text-sm text-muted-foreground mt-2">This report is not scheduled</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Sharing</h3>
                  <p className="text-sm text-muted-foreground mt-2">This report is private</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
