import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BudgetDetails } from "@/components/budgets/budget-details"
import { BudgetExpenses } from "@/components/budgets/budget-expenses"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  return {
    title: `Budget ${id} | Construction Management`,
    description: `View and manage budget ${id}`,
  }
}

export default async function BudgetPage({ params }: Props) {
  const { id } = await params

  // In a real app, you would fetch the budget data here
  const budget = {
    id,
    name: "Office Building Construction",
    project: "Downtown Office Complex",
    totalBudget: 2500000,
    spent: 1750000,
    remaining: 750000,
    status: "active" as const,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    description: "Complete construction budget for the downtown office building project including all phases.",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/budgets">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Budgets
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{budget.name}</h1>
          <p className="text-muted-foreground">{budget.project}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(budget.status)}>
            {budget.status.charAt(0).toUpperCase() + budget.status.slice(1)}
          </Badge>
          <Link href={`/budgets/${id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budget.totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budget.spent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((budget.spent / budget.totalBudget) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budget.remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((budget.remaining / budget.totalBudget) * 100).toFixed(1)}% remaining
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BudgetDetails budget={budget} />
        <BudgetExpenses budgetId={id} />
      </div>
    </div>
  )
}
