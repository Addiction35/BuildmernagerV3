"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const budgetSummaryData = {
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

export function BudgetSummary() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(budgetSummaryData.totalBudget / 1000000).toFixed(2)}M</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(budgetSummaryData.totalSpent / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">{budgetSummaryData.percentUsed}% of budget</p>
            <Progress value={budgetSummaryData.percentUsed} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(budgetSummaryData.totalRemaining / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">{100 - budgetSummaryData.percentUsed}% of budget</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget vs. Actual Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetSummaryData.monthlyData}>
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
        </CardContent>
      </Card>
    </div>
  )
}
