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
import { useWages } from "@/lib/hooks/wagesQueries"

export function WagesTable() {
  const { data: wages = [], isLoading } = useWages()
  const [selectedWages, setSelectedWages] = useState<string[]>([])

  const toggleWage = (wageId: string) => {
    setSelectedWages((prev) =>
      prev.includes(wageId) ? prev.filter((id) => id !== wageId) : [...prev, wageId]
    )
  }

  const toggleAll = () => {
    setSelectedWages((prev) =>
      prev.length === wages.length ? [] : wages.map((wage) => wage._id)
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-muted-foreground">Loading wages...</p>
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
            <TableRow key={wage._id}>
              <TableCell>
                <Checkbox
                  checked={selectedWages.includes(wage._id)}
                  onCheckedChange={() => toggleWage(wage._id)}
                  aria-label={`Select ${wage.poNumber}`}
                />
              </TableCell>
              <TableCell>{new Date(wage.date).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{wage.wageNumber}</TableCell>
              <TableCell>{wage.reference}</TableCell>
              <TableCell>{wage.vendorName}</TableCell>
              <TableCell>{new Date(wage.deliveryDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={wage.status === "Paid" ? "success" : "secondary"}>
                  {wage.status}
                </Badge>
              </TableCell>
              <TableCell>{wage.company}</TableCell>
              <TableCell>{wage.amount || 0}</TableCell>
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
                      <Link href={`/wages/${wage._id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/wages/${wage._id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Wage
                      </Link>
                    </DropdownMenuItem>
                    {!wage.billed && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/bills/new?from=${wage._id}`}>
                            <Receipt className="mr-2 h-4 w-4" />
                            Create Bill
                          </Link>
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
