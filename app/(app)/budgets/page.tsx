import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetsTable } from "@/components/budgets/budgets-table"
import { BudgetsFilter } from "@/components/budgets/budgets-filter"
import { BudgetSummary } from "@/components/budgets/budget-summary"

export const metadata: Metadata = {
  title: "Budgets | Construction Management",
  description: "Manage your construction budgets",
}

export default function BudgetsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
        <div className="flex items-center gap-2">
          <Link href="/budgets/new">
            <Button>New Budget</Button>
          </Link>
        </div>
      </div>

      <BudgetSummary />

      <Card>
        <CardHeader>
          <CardTitle>All Budgets</CardTitle>
          <CardDescription>View and manage all your construction budgets</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetsFilter />
          <BudgetsTable />
        </CardContent>
      </Card>
    </div>
  )
}
