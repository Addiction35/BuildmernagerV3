"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ProjectFinancialsProps {
  projectId: string
}

// This would normally come from a database
const getFinancialData = (projectId: string) => {
  return {
    budget: {
      total: 1250000,
      spent: 812500,
      remaining: 437500,
      percentUsed: 65,
    },
    expenses: [
      {
        category: "Materials",
        budgeted: 625000,
        actual: 410000,
        variance: -215000,
      },
      {
        category: "Labor",
        budgeted: 375000,
        actual: 280000,
        variance: -95000,
      },
      {
        category: "Equipment",
        budgeted: 125000,
        actual: 85000,
        variance: -40000,
      },
      {
        category: "Subcontractors",
        budgeted: 100000,
        actual: 35000,
        variance: -65000,
      },
      {
        category: "Permits & Fees",
        budgeted: 25000,
        actual: 22500,
        variance: -2500,
      },
    ],
    monthlyData: [
      {
        name: "May '23",
        expenses: 120000,
        budget: 150000,
      },
      {
        name: "Jun '23",
        expenses: 180000,
        budget: 175000,
      },
      {
        name: "Jul '23",
        expenses: 210000,
        budget: 200000,
      },
      {
        name: "Aug '23",
        expenses: 150000,
        budget: 180000,
      },
      {
        name: "Sep '23",
        expenses: 152500,
        budget: 160000,
      },
    ],
  }
}

export function ProjectFinancials({ projectId }: ProjectFinancialsProps) {
  const financialData = getFinancialData(projectId)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.budget.total.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Spent to Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.budget.spent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{financialData.budget.percentUsed}% of budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.budget.remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{100 - financialData.budget.percentUsed}% of budget</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget vs. Actual Expenses</CardTitle>
          <CardDescription>Monthly comparison of budgeted vs. actual expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]} />
                <Legend />
                <Bar dataKey="budget" name="Budget" fill="#94a3b8" />
                <Bar dataKey="expenses" name="Actual" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Detailed breakdown of expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Budgeted</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financialData.expenses.map((expense) => (
                <TableRow key={expense.category}>
                  <TableCell className="font-medium">{expense.category}</TableCell>
                  <TableCell className="text-right">${expense.budgeted.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${expense.actual.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={expense.variance < 0 ? "text-green-600" : "text-red-600"}>
                      ${Math.abs(expense.variance).toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
