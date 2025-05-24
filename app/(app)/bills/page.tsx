import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BillsTable } from "@/components/bills/bills-table"
import { BillsFilter } from "@/components/bills/bills-filter"
import { BillsSummary } from "@/components/bills/bills-summary"

export const metadata: Metadata = {
  title: "Bills | Construction Management",
  description: "Manage your construction bills and payments",
}

export default function BillsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bills</h1>
        <div className="flex items-center gap-2">
          <Link href="/bills/new">
            <Button>New Bill</Button>
          </Link>
        </div>
      </div>

      <BillsSummary />

      <Card>
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
          <CardDescription>View and manage all your construction bills</CardDescription>
        </CardHeader>
        <CardContent>
          <BillsFilter />
          <BillsTable />
        </CardContent>
      </Card>
    </div>
  )
}
