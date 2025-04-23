"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, DollarSign, PieChart, TrendingUp } from "lucide-react"

interface ReportViewerProps {
  reportId: string
}

export function ReportViewer({ reportId }: ReportViewerProps) {
  const [viewType, setViewType] = useState("table")

  // This would be fetched based on the reportId in a real application
  const reportData = {
    title: "Project Financial Summary",
    data: [
      {
        project: "Riverside Apartments",
        status: "In Progress",
        budget: 1250000,
        expenses: 1180500,
        variance: 69500,
      },
      {
        project: "Downtown Office Complex",
        status: "In Progress",
        budget: 3750000,
        expenses: 3825000,
        variance: -75000,
      },
      {
        project: "Westside Mall Renovation",
        status: "Completed",
        budget: 2100000,
        expenses: 1950000,
        variance: 150000,
      },
      {
        project: "Harbor View Condos",
        status: "Planning",
        budget: 4500000,
        expenses: 450000,
        variance: 4050000,
      },
      {
        project: "Central Park Landscaping",
        status: "In Progress",
        budget: 850000,
        expenses: 720000,
        variance: 130000,
      },
    ],
    summary: {
      totalProjects: 5,
      totalBudget: 12450000,
      totalExpenses: 8125500,
      totalVariance: 4324500,
    },
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="table" onValueChange={setViewType} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <BarChart className="h-4 w-4" />
            <span>Bar</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <PieChart className="h-4 w-4" />
            <span>Pie</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Line</span>
          </Button>
        </div>
      </div>

      {viewType === "table" && (
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Project</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Budget</th>
                  <th className="px-4 py-3 text-left font-medium">Expenses</th>
                  <th className="px-4 py-3 text-left font-medium">Variance</th>
                </tr>
              </thead>
              <tbody>
                {reportData.data.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-3">{row.project}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          row.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : row.status === "In Progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }
                      >
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{formatCurrency(row.budget)}</td>
                    <td className="px-4 py-3">{formatCurrency(row.expenses)}</td>
                    <td
                      className={`px-4 py-3 ${
                        row.variance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {row.variance >= 0 ? "+" : ""}
                      {formatCurrency(row.variance)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t bg-muted/50 font-medium">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">{formatCurrency(reportData.summary.totalBudget)}</td>
                  <td className="px-4 py-3">{formatCurrency(reportData.summary.totalExpenses)}</td>
                  <td
                    className={`px-4 py-3 ${
                      reportData.summary.totalVariance >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {reportData.summary.totalVariance >= 0 ? "+" : ""}
                    {formatCurrency(reportData.summary.totalVariance)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {viewType === "chart" && (
        <div className="flex justify-center p-8">
          <div className="h-80 w-full max-w-3xl rounded-md bg-muted p-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Chart visualization</p>
              <p className="text-xs text-muted-foreground mt-2">
                In a real application, this would be a chart visualization of the report data
              </p>
            </div>
          </div>
        </div>
      )}

      {viewType === "cards" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{reportData.summary.totalProjects}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <DollarSign className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold">{formatCurrency(reportData.summary.totalBudget)}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <DollarSign className="h-6 w-6 text-green-700 dark:text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold">{formatCurrency(reportData.summary.totalExpenses)}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                  <DollarSign className="h-6 w-6 text-orange-700 dark:text-orange-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget Variance</p>
                  <p
                    className={`text-2xl font-bold ${
                      reportData.summary.totalVariance >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {reportData.summary.totalVariance >= 0 ? "+" : ""}
                    {formatCurrency(reportData.summary.totalVariance)}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    reportData.summary.totalVariance >= 0
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  <TrendingUp
                    className={`h-6 w-6 ${
                      reportData.summary.totalVariance >= 0
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
