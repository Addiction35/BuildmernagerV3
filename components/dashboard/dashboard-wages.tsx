"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Receipt } from "lucide-react"

interface DashboardWagesProps {
  limit?: number
  extended?: boolean
}

const wages = [
  {
    id: "WG001",
    number: "WG-2023-001",
    date: "2023-06-18",
    reference: "PRJ001-LABOR-JUN",
    vendorName: "John Carpenter",
    deliveryDate: "2023-06-18",
    status: "Paid",
    billed: true,
    amount: "$2,800",
    project: "Riverside Apartments",
    projectId: "PRJ001",
  },
  {
    id: "WG002",
    number: "WG-2023-002",
    date: "2023-06-25",
    reference: "PRJ003-LABOR-JUN",
    vendorName: "Electric Team",
    deliveryDate: "2023-06-25",
    status: "Pending",
    billed: false,
    amount: "$3,500",
    project: "Hillside Residence",
    projectId: "PRJ003",
  },
  {
    id: "WG003",
    number: "WG-2023-003",
    date: "2023-07-01",
    reference: "PRJ002-LABOR-JUL",
    vendorName: "Plumbing Crew",
    deliveryDate: "2023-07-01",
    status: "Paid",
    billed: true,
    amount: "$2,100",
    project: "Downtown Office Renovation",
    projectId: "PRJ002",
  },
  {
    id: "WG004",
    number: "WG-2023-004",
    date: "2023-07-08",
    reference: "PRJ001-LABOR-JUL",
    vendorName: "Finishing Team",
    deliveryDate: "2023-07-08",
    status: "Pending",
    billed: false,
    amount: "$4,200",
    project: "Riverside Apartments",
    projectId: "PRJ001",
  },
  {
    id: "WG005",
    number: "WG-2023-005",
    date: "2023-07-15",
    reference: "PRJ004-LABOR-JUL",
    vendorName: "Structure Crew",
    deliveryDate: "2023-07-15",
    status: "Paid",
    billed: true,
    amount: "$5,800",
    project: "Community Center",
    projectId: "PRJ004",
  },
]

export function DashboardWages({ limit, extended = false }: DashboardWagesProps) {
  const displayWages = limit ? wages.slice(0, limit) : wages

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Wage Number</TableHead>
          <TableHead>Worker/Team</TableHead>
          {extended && <TableHead>Project</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          {extended && <TableHead>Billed</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayWages.map((wage) => (
          <TableRow key={wage.id}>
            <TableCell className="font-medium">{wage.number}</TableCell>
            <TableCell>{wage.vendorName}</TableCell>
            {extended && (
              <TableCell>
                <Link href={`/projects/${wage.projectId}`} className="text-blue-600 hover:underline">
                  {wage.project}
                </Link>
              </TableCell>
            )}
            <TableCell>
              <Badge variant={wage.status === "Paid" ? "success" : "secondary"}>{wage.status}</Badge>
            </TableCell>
            <TableCell>{wage.amount}</TableCell>
            <TableCell>{new Date(wage.date).toLocaleDateString()}</TableCell>
            {extended && (
              <TableCell>
                <Badge variant={wage.billed ? "outline" : "destructive"}>{wage.billed ? "Billed" : "Unbilled"}</Badge>
              </TableCell>
            )}
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/wages/${wage.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
                {!wage.billed && extended && (
                  <Link href={`/bills/new?from=wage&id=${wage.id}`}>
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
