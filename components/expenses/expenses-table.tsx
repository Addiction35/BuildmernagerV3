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

const expenses = [
  {
    id: "EXP001",
    number: "EXP-2023-001",
    date: "2023-06-10",
    reference: "PRJ001-SITE",
    vendorName: "City Permits Office",
    deliveryDate: "2023-06-10",
    status: "Approved",
    billed: true,
    companyName: "ConstructPro, Inc.",
    amount: "$1,200",
    project: "Riverside Apartments",
  },
  {
    id: "EXP002",
    number: "EXP-2023-002",
    date: "2023-06-15",
    reference: "PRJ003-UTIL",
    vendorName: "City Utilities",
    deliveryDate: "2023-06-15",
    status: "Pending",
    billed: false,
    companyName: "ConstructPro, Inc.",
    amount: "$850",
    project: "Hillside Residence",
  },
  {
    id: "EXP003",
    number: "EXP-2023-003",
    date: "2023-07-01",
    reference: "PRJ002-EQUIP",
    vendorName: "Equipment Rentals Inc.",
    deliveryDate: "2023-07-01",
    status: "Approved",
    billed: true,
    companyName: "ConstructPro, Inc.",
    amount: "$3,200",
    project: "Downtown Office Renovation",
  },
  {
    id: "EXP004",
    number: "EXP-2023-004",
    date: "2023-07-08",
    reference: "PRJ001-TRAV",
    vendorName: "Travel Expenses",
    deliveryDate: "2023-07-08",
    status: "Pending",
    billed: false,
    companyName: "ConstructPro, Inc.",
    amount: "$780",
    project: "Riverside Apartments",
  },
  {
    id: "EXP005",
    number: "EXP-2023-005",
    date: "2023-07-15",
    reference: "PRJ004-INSP",
    vendorName: "Building Inspector",
    deliveryDate: "2023-07-15",
    status: "Approved",
    billed: true,
    companyName: "ConstructPro, Inc.",
    amount: "$500",
    project: "Community Center",
  },
  {
    id: "EXP006",
    number: "EXP-2023-006",
    date: "2023-07-22",
    reference: "PRJ005-TOOL",
    vendorName: "Tools Supply Co.",
    deliveryDate: "2023-07-22",
    status: "Rejected",
    billed: false,
    companyName: "ConstructPro, Inc.",
    amount: "$1,450",
    project: "Retail Store Fitout",
  },
]

export function ExpensesTable() {
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([])

  const toggleExpense = (expenseId: string) => {
    setSelectedExpenses((prev) =>
      prev.includes(expenseId) ? prev.filter((id) => id !== expenseId) : [...prev, expenseId],
    )
  }

  const toggleAll = () => {
    setSelectedExpenses((prev) => (prev.length === expenses.length ? [] : expenses.map((expense) => expense.id)))
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
            <TableRow key={expense.id}>
              <TableCell>
                <Checkbox
                  checked={selectedExpenses.includes(expense.id)}
                  onCheckedChange={() => toggleExpense(expense.id)}
                  aria-label={`Select ${expense.number}`}
                />
              </TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{expense.number}</TableCell>
              <TableCell>{expense.reference}</TableCell>
              <TableCell>{expense.vendorName}</TableCell>
              <TableCell>{new Date(expense.deliveryDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    expense.status === "Approved"
                      ? "success"
                      : expense.status === "Pending"
                        ? "default"
                        : expense.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {expense.status}
                </Badge>
              </TableCell>
              <TableCell>{expense.companyName}</TableCell>
              <TableCell>{expense.amount}</TableCell>
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
                      <Link href={`/expenses/${expense.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/expenses/${expense.id}/edit`}>Edit Expense</Link>
                    </DropdownMenuItem>
                    {!expense.billed && expense.status === "Approved" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Receipt className="mr-2 h-4 w-4" />
                          <Link href={`/bills/new?from=${expense.id}`}>Create Bill</Link>
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
