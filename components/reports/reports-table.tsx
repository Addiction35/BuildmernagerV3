"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Copy, MoreHorizontal, Play, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ReportsTableProps {
  scheduled?: boolean
}

export function ReportsTable({ scheduled = false }: ReportsTableProps) {
  // Mock data for reports
  const [reports, setReports] = useState([
    {
      id: "REP001",
      name: "Project Financial Summary",
      description: "Financial overview of all active projects",
      created: "2023-04-15T10:30:00Z",
      lastRun: "2023-06-20T14:45:00Z",
      type: "financial",
      status: "completed",
      schedule: scheduled ? "Weekly on Monday" : null,
    },
    {
      id: "REP002",
      name: "Resource Allocation",
      description: "Analysis of resource allocation across projects",
      created: "2023-05-10T09:15:00Z",
      lastRun: "2023-06-19T11:30:00Z",
      type: "resources",
      status: "completed",
      schedule: scheduled ? "Monthly on 1st" : null,
    },
    {
      id: "REP003",
      name: "Budget vs. Actual Expenses",
      description: "Comparison of budgeted vs. actual expenses",
      created: "2023-06-01T13:45:00Z",
      lastRun: "2023-06-18T16:20:00Z",
      type: "financial",
      status: "completed",
      schedule: scheduled ? "Daily at 6:00 AM" : null,
    },
    {
      id: "REP004",
      name: "Project Timeline Analysis",
      description: "Analysis of project timelines and milestones",
      created: "2023-06-05T11:20:00Z",
      lastRun: "2023-06-17T09:30:00Z",
      type: "timeline",
      status: "completed",
      schedule: scheduled ? "Weekly on Friday" : null,
    },
    {
      id: "REP005",
      name: "Vendor Performance",
      description: "Evaluation of vendor performance metrics",
      created: "2023-06-10T15:40:00Z",
      lastRun: "2023-06-16T13:15:00Z",
      type: "vendors",
      status: "completed",
      schedule: scheduled ? "Bi-weekly on Monday" : null,
    },
  ])

  const getTypeColor = (type: string) => {
    const types: Record<string, string> = {
      financial: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      resources: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      timeline: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      vendors: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    }
    return types[type] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Created</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Last Run</th>
            {scheduled && <th className="px-4 py-3 text-left font-medium text-muted-foreground">Schedule</th>}
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <Link href={`/reports/${report.id}`} className="font-medium hover:underline">
                    {report.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">{report.description}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge variant="outline" className={getTypeColor(report.type)}>
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{new Date(report.created).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-muted-foreground">{new Date(report.lastRun).toLocaleDateString()}</td>
              {scheduled && (
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{report.schedule}</span>
                  </div>
                </td>
              )}
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/reports/${report.id}`}>
                      <Play className="h-4 w-4" />
                      <span className="sr-only">Run</span>
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        Run Report
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
