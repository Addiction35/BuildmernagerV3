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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Eye, MoreHorizontal, Receipt, Trash } from "lucide-react"
import { useDeletePO, usePurchases } from "@/lib/hooks/purchase-orders"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function PurchaseOrdersTable() {
  const queryClient = useQueryClient()
  const { data: purchaseOrders, isLoading } = usePurchases()

  const deletePO = useDeletePO() // ✅ Fix: call the hook to get the mutation function

  const { mutate: deleteOrder, isLoading: isDeleting } = useMutation({
    mutationFn: deletePO,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] })
    },
  })

  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-muted-foreground">Loading purchase orders...</p>
      </div>
    )
  }

  const toggleOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    )
  }

  const toggleAll = () => {
    setSelectedOrders((prev) =>
      prev.length === purchaseOrders.length
        ? []
        : purchaseOrders.map((order) => order.id)
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedOrders.length === purchaseOrders.length &&
                  purchaseOrders.length > 0
                }
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
            <TableHead>Company</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order._id)}
                  onCheckedChange={() => toggleOrder(order._id)}
                  aria-label={`Select ${order.number}`}
                />
              </TableCell>
              <TableCell>
                {new Date(order.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="font-medium">{order.number}</TableCell>
              <TableCell>{order.reference}</TableCell>
              <TableCell>{order.vendorName}</TableCell>
              <TableCell>
                {new Date(order.deliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "In Transit"
                      ? "default"
                      : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.company}</TableCell>
              <TableCell>{order.amount || "NA"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white" align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <Link href={`/purchase-orders/${order._id}`}>
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/purchase-orders/${order._id}/edit`}>
                        Edit PO
                      </Link>
                    </DropdownMenuItem>
                    {!order.billed && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Receipt className="mr-2 h-4 w-4" />
                          <Link href={`/bills/new?from=${order._id}`}>
                            Create Bill
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => deleteOrder(order._id)}
                      disabled={isDeleting}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      {isDeleting ? "Deleting..." : "Delete Purchase Order"}
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
