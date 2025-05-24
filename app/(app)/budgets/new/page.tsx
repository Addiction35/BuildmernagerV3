import type { Metadata } from "next"
import { BudgetForm } from "@/components/budgets/budget-form"

export const metadata: Metadata = {
  title: "New Budget | Construction Management",
  description: "Create a new construction budget",
}

export default function NewBudgetPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Budget</h1>
          <p className="text-muted-foreground">Set up a new budget for your construction project</p>
        </div>
      </div>

      <BudgetForm />
    </div>
  )
}
