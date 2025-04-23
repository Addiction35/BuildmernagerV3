"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, MoreHorizontal, Receipt, Trash } from "lucide-react"

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
    companyName: "ConstructPro, Inc.",
    amount: "$12,500",
    project: "Riverside Apartments",
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
    companyName: "ConstructPro, Inc.",
    amount: "$8,750",
    project: "Hillside Residence",
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
    companyName: "ConstructPro, Inc.",
    amount: "$5,200",
    project: "Downtown Office Renovation",
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
    companyName: "ConstructPro, Inc.",
    amount: "$15,300",
    project: "Riverside Apartments",
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
    companyName: "ConstructPro, Inc.",
    amount: "$21,750",
    project: "Community Center",
  },
  {
    id: "PO006",
    number: "PO-2023-006",
    date: "2023-08-18",
    reference: "PRJ005-FIX",
    vendorName: "Retail Fixtures Co.",
    deliveryDate: "2023-09-10",
    status: "Pending",
    billed: false,
    companyName: "ConstructPro, Inc.",
    amount: "$7,800",
    project: "Retail Store Fitout",
  },
]

export function PurchaseOrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const toggleOrder = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const toggleAll = () => {
    setSelectedOrders((prev) => (prev.length === purchaseOrders.length ? [] : purchaseOrders.map((order) => order.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedOrders.length === purchaseOrders.length && purchaseOrders.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all purchase orders"
              />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>PO Number</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Billed</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={() => toggleOrder(order.id)}
                  aria-label={`Select ${order.number}`}
                />
              </TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{order.number}</TableCell>
              <TableCell>{order.reference}</TableCell>
              <TableCell>{order.vendorName}</TableCell>
              <TableCell>{new Date(order.deliveryDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Delivered" ? "success" : order.status === "In Transit" ? "default" : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={order.billed ? "outline" : "destructive"}>{order.billed ? "Billed" : "Unbilled"}</Badge>
              </TableCell>
              <TableCell>{order.companyName}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <Link href={`/purchase-orders/${order.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/purchase-orders/${order.id}/edit`}>Edit PO</Link>
                    </DropdownMenuItem>
                    {!order.billed && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Receipt className="mr-2 h-4 w-4" />
                          <Link href={`/bills/new?from=${order.id}`}>Create Bill</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Purchase Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
