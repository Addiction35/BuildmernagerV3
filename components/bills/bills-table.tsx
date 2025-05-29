"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function BillsTable() {
  const bills = [
    {
      id: "1",
      billNumber: "BILL-2024-001",
      vendor: "Steel Supply Co.",
      project: "Downtown Office Complex",
      amount: 45000,
      date: "2024-01-15",
      dueDate: "2024-02-15",
      status: "pending",
    },
    {
      id: "2",
      billNumber: "BILL-2024-002",
      vendor: "Concrete Solutions",
      project: "Residential Complex",
      amount: 32000,
      date: "2024-01-18",
      dueDate: "2024-02-18",
      status: "paid",
    },
    {
      id: "3",
      billNumber: "BILL-2024-003",
      vendor: "Electric Systems Inc.",
      project: "Commercial Building",
      amount: 28000,
      date: "2024-01-20",
      dueDate: "2024-02-10",
      status: "overdue",
    },
    {
      id: "4",
      billNumber: "BILL-2024-004",
      vendor: "Plumbing Experts",
      project: "Highway Renovation",
      amount: 15000,
      date: "2024-01-22",
      dueDate: "2024-02-22",
      status: "draft",
    },
    {
      id: "5",
      billNumber: "BILL-2024-005",
      vendor: "Heavy Equipment Rental",
      project: "Bridge Construction",
      amount: 8500,
      date: "2024-01-25",
      dueDate: "2024-02-25",
      status: "pending",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bill Number</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => {
            const daysUntilDue = getDaysUntilDue(bill.dueDate)
            return (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">
                  <Link href={`/bills/${bill.id}`} className="hover:underline">
                    {bill.billNumber}
                  </Link>
                </TableCell>
                <TableCell>{bill.vendor}</TableCell>
                <TableCell>{bill.project}</TableCell>
                <TableCell>${bill.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{new Date(bill.dueDate).toLocaleDateString()}</span>
                    {bill.status !== "paid" && (
                      <span
                        className={`text-xs ${
                          daysUntilDue < 0
                            ? "text-red-600"
                            : daysUntilDue <= 7
                              ? "text-yellow-600"
                              : "text-muted-foreground"
                        }`}
                      >
                        {daysUntilDue < 0
                          ? `${Math.abs(daysUntilDue)} days overdue`
                          : daysUntilDue === 0
                            ? "Due today"
                            : `${daysUntilDue} days left`}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(bill.status)}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/bills/${bill.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/bills/${bill.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
