import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProposalsTable } from "@/components/proposals/proposals-table"
import { ProposalsFilter } from "@/components/proposals/proposals-filter"

export const metadata: Metadata = {
  title: "Proposals | Construction Management",
  description: "Manage your construction proposals",
}

export default function ProposalsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
        <div className="flex items-center gap-2">
          <Link href="/proposals/new">
            <Button>New Proposal</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Proposals</CardTitle>
          <CardDescription>View and manage all your construction proposals</CardDescription>
        </CardHeader>
        <CardContent>
          <ProposalsFilter />
          <ProposalsTable />
        </CardContent>
      </Card>
    </div>
  )
}
