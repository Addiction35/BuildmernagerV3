import type { Metadata } from "next"
import PayslipCalculator from "@/components/payroll/payroll-form"

export const metadata: Metadata = {
  title: "New Payroll Run | Construction Management",
  description: "Create a new payroll run",
}

export default function NewPayrollPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Payroll Run</h1>
      </div>
      <PayslipCalculator/>
    </div>
  )
}
