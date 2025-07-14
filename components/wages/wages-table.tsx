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
    companyName: "ConstructPro, Inc.",
    amount: "$2,800",
    project: "Riverside Apartments",
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
    companyName: "ConstructPro, Inc.",
    amount: "$3,500",
    project: "Hillside Residence",
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
    companyName: "ConstructPro, Inc.",
    amount: "$2,100",
    project: "Downtown Office Renovation",
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
    companyName: "ConstructPro, Inc.",
    amount: "$4,200",
    project: "Riverside Apartments",
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
    companyName: "ConstructPro, Inc.",
    amount: "$5,800",
    project: "Community Center",
  },
  {
    id: "WG006",
    number: "WG-2023-006",
    date: "2023-07-22",
    reference: "PRJ005-LABOR-JUL",
    vendorName: "Installation Team",
    deliveryDate: "2023-07-22",
    status: "Pending",
    billed: false,
    companyName: "ConstructPro, Inc.",
    amount: "$1,900",
    project: "Retail Store Fitout",
  },
]

export function WagesTable() {
  const [selectedWages, setSelectedWages] = useState<string[]>([])

  const toggleWage = (wageId: string) => {
    setSelectedWages((prev) => (prev.includes(wageId) ? prev.filter((id) => id !== wageId) : [...prev, wageId]))
  }

  const toggleAll = () => {
    setSelectedWages((prev) => (prev.length === wages.length ? [] : wages.map((wage) => wage.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedWages.length === wages.length && wages.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all wages"
              />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Wage Number</TableHead>
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
          {wages.map((wage) => (
            <TableRow key={wage.id}>
              <TableCell>
                <Checkbox
                  checked={selectedWages.includes(wage.id)}
                  onCheckedChange={() => toggleWage(wage.id)}
                  aria-label={`Select ${wage.number}`}
                />
              </TableCell>
              <TableCell>{new Date(wage.date).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{wage.number}</TableCell>
              <TableCell>{wage.reference}</TableCell>
              <TableCell>{wage.vendorName}</TableCell>
              <TableCell>{new Date(wage.deliveryDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={wage.status === "Paid" ? "success" : "secondary"}>{wage.status}</Badge>
              </TableCell>
              <TableCell>{wage.companyName}</TableCell>
              <TableCell>{wage.amount}</TableCell>
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
                      <Link href={`/wages/${wage.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/wages/${wage.id}/edit`}>Edit Wage</Link>
                    </DropdownMenuItem>
                    {!wage.billed && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Receipt className="mr-2 h-4 w-4" />
                          <Link href={`/bills/new?from=${wage.id}`}>Create Bill</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Wage
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
