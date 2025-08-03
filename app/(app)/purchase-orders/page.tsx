import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PurchaseOrdersTable } from "@/components/purchase-orders/purchase-orders-table"
import { PurchaseOrdersFilter } from "@/components/purchase-orders/purchase-orders-filter"

export const metadata: Metadata = {
  title: "Purchase Orders | Construction Management",
  description: "Manage your construction purchase orders",
}

export default function PurchaseOrdersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
        <div className="flex items-center gap-2">
          <Link href="/purchase-orders/new">
            <Button>New Purchase Order</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Purchase Orders</CardTitle>
          <CardDescription>View and manage all your construction purchase orders</CardDescription>
        </CardHeader>
        <CardContent>
          <PurchaseOrdersTable />
        </CardContent>
      </Card>
    </div>
  )
}
