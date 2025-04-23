import type { Metadata } from "next"
import { ReportBuilder } from "@/components/reports/report-builder"

export const metadata: Metadata = {
  title: "Create Report | Construction Management",
  description: "Create a new custom report",
}

export default function NewReportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Report</h1>
        <p className="text-muted-foreground">Design a custom report by selecting data sources and fields</p>
      </div>

      <ReportBuilder />
    </div>
  )
}
