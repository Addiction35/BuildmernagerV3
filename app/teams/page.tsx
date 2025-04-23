import type { Metadata } from "next"
import { TeamsTable } from "@/components/teams/teams-table"
import { TeamsFilter } from "@/components/teams/teams-filter"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Teams | Construction Management",
  description: "Manage your project teams",
}

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
        <Link href="/teams/new">
          <Button>Create Team</Button>
        </Link>
      </div>
      <TeamsFilter />
      <TeamsTable />
    </div>
  )
}
