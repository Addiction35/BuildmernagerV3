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
import { useExpenses } from "@/lib/hooks/expenseQueries"

export function ExpensesTable() {
  const { data: expenses = [], isLoading } = useExpenses()
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([])

  const toggleExpense = (expenseId: string) => {
    setSelectedExpenses((prev) =>
      prev.includes(expenseId) ? prev.filter((id) => id !== expenseId) : [...prev, expenseId]
    )
  }

  const toggleAll = () => {
    setSelectedExpenses((prev) =>
      prev.length === expenses.length ? [] : expenses.map((expense) => expense._id)
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-muted-foreground">Loading expenses...</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedExpenses.length === expenses.length && expenses.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all expenses"
              />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Expense Number</TableHead>
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
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>
                <Checkbox
                  checked={selectedExpenses.includes(expense._id)}
                  onCheckedChange={() => toggleExpense(expense._id)}
                  aria-label={`Select ${expense.poNumber}`}
                />
              </TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{expense.poNumber}</TableCell>
              <TableCell>{expense.reference}</TableCell>
              <TableCell>{expense.vendorName}</TableCell>
              <TableCell>{new Date(expense.deliveryDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={expense.status === "Paid" ? "success" : "secondary"}>
                  {expense.status}
                </Badge>
              </TableCell>
              <TableCell>{expense.company}</TableCell>
              <TableCell>{expense.amount || 0}</TableCell>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/expenses/${expense._id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/expenses/${expense._id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Expense
                      </Link>
                    </DropdownMenuItem>
                    {!expense.billed && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/bills/new?from=${expense._id}`}>
                            <Receipt className="mr-2 h-4 w-4" />
                            Create Bill
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Expense
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
