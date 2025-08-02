"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Receipt } from "lucide-react"
import { usePurchases } from "@/lib/hooks/purchase-orders"

interface DashboardPurchaseOrdersProps {
  limit?: number
  extended?: boolean
}

export function DashboardPurchaseOrders({ limit, extended = false }: DashboardPurchaseOrdersProps) {
  const { data: purchaseOrders, isLoading } = usePurchases()

      if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (!purchaseOrders || purchaseOrders.length === 0) 
    {
      return <div>No tasks available</div>;
    }
      const displayPOs = limit ? purchaseOrders?.slice(0, limit) : purchaseOrders
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>PO Number</TableHead>
          <TableHead>Vendor</TableHead>
          {extended && <TableHead>Project</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Delivery Date</TableHead>
          {extended && <TableHead>Billed</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayPOs.map((po) => (
          <TableRow key={po._id}>
            <TableCell className="font-medium">{po.poNumber}</TableCell>
            <TableCell>{po.vendorName}</TableCell>
            {extended && (
              <TableCell>
                <Link href={`/projects/${po.projectId._id}`} className="text-blue-600 hover:underline">
                  {po.project}
                </Link>
              </TableCell>
            )}
            <TableCell>
              <Badge
                variant={po.status === "Delivered" ? "success" : po.status === "In Transit" ? "default" : "secondary"}
              >
                {po.status}
              </Badge>
            </TableCell>
            <TableCell>{po.amount}</TableCell>
            <TableCell>{new Date(po.deliveryDate).toLocaleDateString()}</TableCell>
            {extended && (
              <TableCell>
                <Badge variant={po.billed ? "outline" : "destructive"}>{po.billed ? "Billed" : "Unbilled"}</Badge>
              </TableCell>
            )}
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/purchase-orders/${po.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
                {!po.billed && extended && (
                  <Link href={`/bills/new?from=po&id=${po.id}`}>
                    <Button variant="ghost" size="icon">
                      <Receipt className="h-4 w-4" />
                      <span className="sr-only">Create Bill</span>
                    </Button>
                  </Link>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
