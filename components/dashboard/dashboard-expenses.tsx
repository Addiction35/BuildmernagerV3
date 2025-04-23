"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Receipt } from "lucide-react"

interface DashboardExpensesProps {
  limit?: number
  extended?: boolean
}

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
    amount: "$1,200",
    project: "Riverside Apartments",
    projectId: "PRJ001",
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
    amount: "$850",
    project: "Hillside Residence",
    projectId: "PRJ003",
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
    amount: "$3,200",
    project: "Downtown Office Renovation",
    projectId: "PRJ002",
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
    amount: "$780",
    project: "Riverside Apartments",
    projectId: "PRJ001",
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
    amount: "$500",
    project: "Community Center",
    projectId: "PRJ004",
  },
]

export function DashboardExpenses({ limit, extended = false }: DashboardExpensesProps) {
  const displayExpenses = limit ? expenses.slice(0, limit) : expenses

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Expense Number</TableHead>
          <TableHead>Vendor/Description</TableHead>
          {extended && <TableHead>Project</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          {extended && <TableHead>Billed</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayExpenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">{expense.number}</TableCell>
            <TableCell>{expense.vendorName}</TableCell>
            {extended && (
              <TableCell>
                <Link href={`/projects/${expense.projectId}`} className="text-blue-600 hover:underline">
                  {expense.project}
                </Link>
              </TableCell>
            )}
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
            <TableCell>{expense.amount}</TableCell>
            <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
            {extended && (
              <TableCell>
                <Badge variant={expense.billed ? "outline" : "destructive"}>
                  {expense.billed ? "Billed" : "Unbilled"}
                </Badge>
              </TableCell>
            )}
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/expenses/${expense.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
                {!expense.billed && expense.status === "Approved" && extended && (
                  <Link href={`/bills/new?from=expense&id=${expense.id}`}>
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
