import type { Metadata } from "next"
import { ClientsTable } from "@/components/clients/clients-table"
import { ClientsFilter } from "@/components/clients/clients-filter"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Clients | Construction Management",
  description: "Manage your clients and customers",
}

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
        <Link href="/clients/new">
          <Button>Add Client</Button>
        </Link>
      </div>
      <ClientsFilter />
      <ClientsTable />
    </div>
  )
}
