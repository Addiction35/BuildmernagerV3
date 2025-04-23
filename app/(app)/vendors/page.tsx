import type { Metadata } from "next"
import { VendorsTable } from "@/components/vendors/vendors-table"
import { VendorsFilter } from "@/components/vendors/vendors-filter"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Vendors | Construction Management",
  description: "Manage your vendors and suppliers",
}

export default function VendorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Vendors</h1>
        <Link href="/vendors/new">
          <Button>Add Vendor</Button>
        </Link>
      </div>
      <VendorsFilter />
      <VendorsTable />
    </div>
  )
}
