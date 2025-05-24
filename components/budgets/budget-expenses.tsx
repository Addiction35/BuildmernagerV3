import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface BudgetExpensesProps {
  budgetId: string
}

export function BudgetExpenses({ budgetId }: BudgetExpensesProps) {
  const expenses = [
    {
      id: "1",
      date: "2024-01-15",
      description: "Steel beams delivery",
      category: "Materials",
      amount: 45000,
      vendor: "Steel Supply Co.",
      status: "approved",
    },
    {
      id: "2",
      date: "2024-01-20",
      description: "Crane rental - Week 1",
      category: "Equipment",
      amount: 8500,
      vendor: "Heavy Equipment Rental",
      status: "approved",
    },
    {
      id: "3",
      date: "2024-01-25",
      description: "Concrete foundation work",
      category: "Labor",
      amount: 32000,
      vendor: "Foundation Experts LLC",
      status: "pending",
    },
    {
      id: "4",
      date: "2024-02-01",
      description: "Electrical wiring materials",
      category: "Materials",
      amount: 15000,
      vendor: "Electric Supply House",
      status: "approved",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Latest expenses for this budget</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{expense.description}</span>
                  <Badge variant="outline">{expense.category}</Badge>
                  <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {expense.vendor} • {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${expense.amount.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
