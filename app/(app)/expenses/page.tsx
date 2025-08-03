import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpensesTable } from "@/components/expenses/expenses-table"
import { ExpensesFilter } from "@/components/expenses/expenses-filter"

export const metadata: Metadata = {
  title: "Expenses | Construction Management",
  description: "Manage your construction expenses",
}

export default function ExpensesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <div className="flex items-center gap-2">
          <Link href="/expenses/new">
            <Button>New Expense</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Expenses</CardTitle>
          <CardDescription>View and manage all your construction expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpensesTable />
        </CardContent>
      </Card>
    </div>
  )
}
