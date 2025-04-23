"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Clock, DollarSign, FileText, Users } from "lucide-react"

export function ReportTemplates() {
  const templates = [
    {
      id: "template-1",
      name: "Financial Summary",
      description: "Overview of financial performance across all projects",
      icon: DollarSign,
      category: "Financial",
      complexity: "Medium",
    },
    {
      id: "template-2",
      name: "Resource Allocation",
      description: "Analysis of resource distribution and utilization",
      icon: Users,
      category: "Resources",
      complexity: "High",
    },
    {
      id: "template-3",
      name: "Project Timeline",
      description: "Visualization of project timelines and milestones",
      icon: Clock,
      category: "Timeline",
      complexity: "Medium",
    },
    {
      id: "template-4",
      name: "Budget vs. Actual",
      description: "Comparison of budgeted vs. actual expenses",
      icon: BarChart3,
      category: "Financial",
      complexity: "Medium",
    },
    {
      id: "template-5",
      name: "Document Status",
      description: "Status of all documents across projects",
      icon: FileText,
      category: "Documents",
      complexity: "Low",
    },
  ]

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      Financial: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Resources: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Timeline: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Documents: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    }
    return categories[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  const getComplexityColor = (complexity: string) => {
    const complexities: Record<string, string> = {
      Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return complexities[complexity] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <template.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={getCategoryColor(template.category)}>
                {template.category}
              </Badge>
              <Badge variant="outline" className={getComplexityColor(template.complexity)}>
                {template.complexity} Complexity
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/reports/new?template=${template.id}`}>Use Template</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
