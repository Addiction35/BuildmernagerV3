"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDashBoardGraph } from "@/lib/hooks/summaryQueries"
import { ifError } from "assert"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const budgetData = {
  totalBudget: 12500000,
  totalSpent: 7250000,
  totalRemaining: 5250000,
  percentUsed: 58,
  categories: [
    {
      name: "Materials",
      budget: 5000000,
      spent: 3200000,
      remaining: 1800000,
      percentUsed: 64,
    },
    {
      name: "Labor",
      budget: 4000000,
      spent: 2500000,
      remaining: 1500000,
      percentUsed: 62.5,
    },
    {
      name: "Equipment",
      budget: 1500000,
      spent: 800000,
      remaining: 700000,
      percentUsed: 53.3,
    },
    {
      name: "Subcontractors",
      budget: 1800000,
      spent: 650000,
      remaining: 1150000,
      percentUsed: 36.1,
    },
    {
      name: "Permits & Fees",
      budget: 200000,
      spent: 100000,
      remaining: 100000,
      percentUsed: 50,
    },
  ],
  monthlyData: [
    {
      name: "Jan",
      budget: 1000000,
      actual: 950000,
    },
    {
      name: "Feb",
      budget: 1200000,
      actual: 1150000,
    },
    {
      name: "Mar",
      budget: 1500000,
      actual: 1600000,
    },
    {
      name: "Apr",
      budget: 1300000,
      actual: 1400000,
    },
    {
      name: "May",
      budget: 1100000,
      actual: 1050000,
    },
    {
      name: "Jun",
      budget: 1000000,
      actual: 1100000,
    },
  ],
}



export function DashboardFinancials() {

  const { data: financials, isLoading, isError } = useDashBoardGraph()

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if(isError) {
    return (
      <div>Error on financials</div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Total Budget</div>
            <div className="text-2xl font-bold">${(budgetData.totalBudget / 1000000).toFixed(2)}M</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Total Spent</div>
            <div className="text-2xl font-bold">${(budgetData.totalSpent / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">{budgetData.percentUsed}% of budget</p>
            <Progress value={budgetData.percentUsed} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Remaining Budget</div>
            <div className="text-2xl font-bold">${(budgetData.totalRemaining / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">{100 - budgetData.percentUsed}% of budget</p>
          </CardContent>
        </Card>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={budgetData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${(Number(value) / 1000).toFixed(1)}K`, undefined]} />
            <Legend />
            <Bar dataKey="budget" name="Budget" fill="#94a3b8" />
            <Bar dataKey="actual" name="Actual" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Budget Breakdown by Category</h3>
        <div className="space-y-4">
          {budgetData.categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${(category.spent / 1000).toFixed(1)}K / ${(category.budget / 1000).toFixed(1)}K
                </div>
              </div>
              <Progress value={category.percentUsed} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
