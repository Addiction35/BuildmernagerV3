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
import { Edit, Eye, MoreHorizontal, FileText, Trash } from "lucide-react"

const payrollEntries = [
  {
    id: "PAY001",
    employeeId: "EMP001",
    employeeName: "John Doe",
    position: "Project Manager",
    department: "Management",
    regularHours: 80,
    overtimeHours: 5,
    grossPay: "$5,200.00",
    deductions: "$1,560.00",
    netPay: "$3,640.00",
    status: "Paid",
    payDate: "2023-05-15",
    project: "Riverside Apartments",
  },
  {
    id: "PAY002",
    employeeId: "EMP002",
    employeeName: "Jane Smith",
    position: "Site Engineer",
    department: "Engineering",
    regularHours: 80,
    overtimeHours: 8,
    grossPay: "$4,800.00",
    deductions: "$1,440.00",
    netPay: "$3,360.00",
    status: "Paid",
    payDate: "2023-05-15",
    project: "Hillside Residence",
  },
  {
    id: "PAY003",
    employeeId: "EMP003",
    employeeName: "Michael Johnson",
    position: "Electrician",
    department: "Trades",
    regularHours: 80,
    overtimeHours: 12,
    grossPay: "$4,200.00",
    deductions: "$1,260.00",
    netPay: "$2,940.00",
    status: "Paid",
    payDate: "2023-05-15",
    project: "Downtown Office Renovation",
  },
  {
    id: "PAY004",
    employeeId: "EMP004",
    employeeName: "Sarah Williams",
    position: "Carpenter",
    department: "Trades",
    regularHours: 80,
    overtimeHours: 10,
    grossPay: "$3,900.00",
    deductions: "$1,170.00",
    netPay: "$2,730.00",
    status: "Paid",
    payDate: "2023-05-15",
    project: "Riverside Apartments",
  },
  {
    id: "PAY005",
    employeeId: "EMP005",
    employeeName: "Robert Brown",
    position: "Plumber",
    department: "Trades",
    regularHours: 80,
    overtimeHours: 6,
    grossPay: "$3,800.00",
    deductions: "$1,140.00",
    netPay: "$2,660.00",
    status: "Paid",
    payDate: "2023-05-15",
    project: "Community Center",
  },
  {
    id: "PAY006",
    employeeId: "EMP006",
    employeeName: "Emily Davis",
    position: "Administrative Assistant",
    department: "Administration",
    regularHours: 80,
    overtimeHours: 0,
    grossPay: "$3,200.00",
    deductions: "$960.00",
    netPay: "$2,240.00",
    status: "Paid",
    payDate: "2023-05-15",
    project: "Office",
  },
]

export function PayrollTable() {
  const [selectedEntries, setSelectedEntries] = useState<string[]>([])

  const toggleEntry = (entryId: string) => {
    setSelectedEntries((prev) => (prev.includes(entryId) ? prev.filter((id) => id !== entryId) : [...prev, entryId]))
  }

  const toggleAll = () => {
    setSelectedEntries((prev) => (prev.length === payrollEntries.length ? [] : payrollEntries.map((entry) => entry.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedEntries.length === payrollEntries.length && payrollEntries.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all entries"
              />
            </TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-center">Regular Hours</TableHead>
            <TableHead className="text-center">Overtime Hours</TableHead>
            <TableHead className="text-right">Gross Pay</TableHead>
            <TableHead className="text-right">Deductions</TableHead>
            <TableHead className="text-right">Net Pay</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Project</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>
                <Checkbox
                  checked={selectedEntries.includes(entry.id)}
                  onCheckedChange={() => toggleEntry(entry.id)}
                  aria-label={`Select ${entry.employeeName}`}
                />
              </TableCell>
              <TableCell className="font-medium">{entry.employeeName}</TableCell>
              <TableCell>{entry.position}</TableCell>
              <TableCell>{entry.department}</TableCell>
              <TableCell className="text-center">{entry.regularHours}</TableCell>
              <TableCell className="text-center">{entry.overtimeHours}</TableCell>
              <TableCell className="text-right">{entry.grossPay}</TableCell>
              <TableCell className="text-right">{entry.deductions}</TableCell>
              <TableCell className="text-right">{entry.netPay}</TableCell>
              <TableCell>
                <Badge variant="success">{entry.status}</Badge>
              </TableCell>
              <TableCell>{entry.project}</TableCell>
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
                      <Link href={`/payroll/${entry.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/payroll/${entry.id}/edit`}>Edit Entry</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <Link href={`/payroll/${entry.id}/slip`}>View Pay Slip</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Entry
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
