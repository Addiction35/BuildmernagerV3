"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Receipt } from "lucide-react"

interface DashboardPurchaseOrdersProps {
  limit?: number
  extended?: boolean
}

const purchaseOrders = [
  {
    id: "PO001",
    number: "PO-2023-001",
    date: "2023-06-15",
    reference: "PRJ001-MAT",
    vendorName: "ABC Building Supplies",
    deliveryDate: "2023-06-30",
    status: "Delivered",
    billed: true,
    amount: "$12,500",
    project: "Riverside Apartments",
    projectId: "PRJ001",
  },
  {
    id: "PO002",
    number: "PO-2023-002",
    date: "2023-07-05",
    reference: "PRJ003-ELE",
    vendorName: "Electric Systems Co.",
    deliveryDate: "2023-07-25",
    status: "In Transit",
    billed: false,
    amount: "$8,750",
    project: "Hillside Residence",
    projectId: "PRJ003",
  },
  {
    id: "PO003",
    number: "PO-2023-003",
    date: "2023-07-12",
    reference: "PRJ002-PLU",
    vendorName: "Modern Plumbing Supplies",
    deliveryDate: "2023-08-05",
    status: "Pending",
    billed: false,
    amount: "$5,200",
    project: "Downtown Office Renovation",
    projectId: "PRJ002",
  },
  {
    id: "PO004",
    number: "PO-2023-004",
    date: "2023-08-01",
    reference: "PRJ001-FIN",
    vendorName: "Quality Finishes Ltd.",
    deliveryDate: "2023-08-20",
    status: "Delivered",
    billed: true,
    amount: "$15,300",
    project: "Riverside Apartments",
    projectId: "PRJ001",
  },
  {
    id: "PO005",
    number: "PO-2023-005",
    date: "2023-08-10",
    reference: "PRJ004-STR",
    vendorName: "Structural Materials Inc.",
    deliveryDate: "2023-09-05",
    status: "In Transit",
    billed: false,
    amount: "$21,750",
    project: "Community Center",
    projectId: "PRJ004",
  },
]

export function DashboardPurchaseOrders({ limit, extended = false }: DashboardPurchaseOrdersProps) {
  const displayPOs = limit ? purchaseOrders.slice(0, limit) : purchaseOrders

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
          <TableRow key={po.id}>
            <TableCell className="font-medium">{po.number}</TableCell>
            <TableCell>{po.vendorName}</TableCell>
            {extended && (
              <TableCell>
                <Link href={`/projects/${po.projectId}`} className="text-blue-600 hover:underline">
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
