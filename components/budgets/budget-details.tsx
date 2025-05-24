import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Budget {
  id: string
  name: string
  project: string
  totalBudget: number
  spent: number
  remaining: number
  status: string
  startDate: string
  endDate: string
  description: string
}

interface BudgetDetailsProps {
  budget: Budget
}

export function BudgetDetails({ budget }: BudgetDetailsProps) {
  const categories = [
    { name: "Labor", budgeted: 1000000, spent: 750000 },
    { name: "Materials", budgeted: 800000, spent: 600000 },
    { name: "Equipment", budgeted: 400000, spent: 250000 },
    { name: "Permits & Fees", budgeted: 200000, spent: 150000 },
    { name: "Contingency", budgeted: 100000, spent: 0 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Breakdown</CardTitle>
        <CardDescription>Detailed breakdown by category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{((budget.spent / budget.totalBudget) * 100).toFixed(1)}%</span>
          </div>
          <Progress value={(budget.spent / budget.totalBudget) * 100} className="h-2" />
        </div>

        <div className="space-y-4">
          {categories.map((category) => {
            const percentage = (category.spent / category.budgeted) * 100
            return (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{percentage.toFixed(1)}% used</span>
                  <span>${(category.budgeted - category.spent).toLocaleString()} remaining</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between">
            <span>Start Date:</span>
            <span>{new Date(budget.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>End Date:</span>
            <span>{new Date(budget.endDate).toLocaleDateString()}</span>
          </div>
          <div className="pt-2">
            <span className="font-medium">Description:</span>
            <p className="text-sm text-muted-foreground mt-1">{budget.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
