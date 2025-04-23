import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EstimatesTable } from "@/components/estimates/estimates-table"
import { EstimatesFilter } from "@/components/estimates/estimates-filter"

export const metadata: Metadata = {
  title: "Estimates | Construction Management",
  description: "Manage your construction estimates",
}

export default function EstimatesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Estimates</h1>
        <div className="flex items-center gap-2">
          <Link href="/estimates/new">
            <Button>New Estimate</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Estimates</CardTitle>
          <CardDescription>View and manage all your construction estimates</CardDescription>
        </CardHeader>
        <CardContent>
          <EstimatesFilter />
          <EstimatesTable />
        </CardContent>
      </Card>
    </div>
  )
}
