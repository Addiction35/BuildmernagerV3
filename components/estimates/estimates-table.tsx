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
import { Edit, Eye, FileText, MoreHorizontal, Trash } from "lucide-react"

const estimates = [
  {
    id: "EST001",
    name: "Riverside Apartments - Initial Estimate",
    project: "Riverside Apartments",
    projectId: "PRJ001",
    client: "Riverside Development LLC",
    date: "2023-04-10",
    status: "Approved",
    amount: "$1,250,000",
    convertedToProposal: true,
  },
  {
    id: "EST003",
    name: "Hillside Residence - Construction Estimate",
    project: "Hillside Residence",
    projectId: "PRJ003",
    client: "Johnson Family",
    date: "2023-02-28",
    status: "Approved",
    amount: "$780,000",
    convertedToProposal: true,
  },
  {
    id: "EST004",
    name: "Community Center - Initial Estimate",
    project: "Community Center",
    projectId: "PRJ004",
    client: "Oakville Municipality",
    date: "2023-08-20",
    status: "Draft",
    amount: "$2,100,000",
    convertedToProposal: false,
  },
  {
    id: "EST005",
    name: "Retail Store - Fitout Estimate",
    project: "Retail Store Fitout",
    projectId: "PRJ005",
    client: "Fashion Outlet Inc.",
    date: "2022-12-05",
    status: "Approved",
    amount: "$320,000",
    convertedToProposal: true,
  },
  {
    id: "EST006",
    name: "Industrial Warehouse - Construction Estimate",
    project: "Industrial Warehouse",
    projectId: "PRJ006",
    client: "Logistics Pro LLC",
    date: "2023-03-15",
    status: "Rejected",
    amount: "$1,850,000",
    convertedToProposal: false,
  },
  {
    id: "EST007",
    name: "School Renovation - Initial Estimate",
    project: "School Renovation",
    projectId: "PRJ007",
    client: "Westside School District",
    date: "2023-10-10",
    status: "Pending",
    amount: "$3,200,000",
    convertedToProposal: false,
  },
]

export function EstimatesTable() {
  const [selectedEstimates, setSelectedEstimates] = useState<string[]>([])

  const toggleEstimate = (estimateId: string) => {
    setSelectedEstimates((prev) =>
      prev.includes(estimateId) ? prev.filter((id) => id !== estimateId) : [...prev, estimateId],
    )
  }

  const toggleAll = () => {
    setSelectedEstimates((prev) => (prev.length === estimates.length ? [] : estimates.map((estimate) => estimate.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedEstimates.length === estimates.length && estimates.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all estimates"
              />
            </TableHead>
            <TableHead>Estimate</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estimates.map((estimate) => (
            <TableRow key={estimate.id}>
              <TableCell>
                <Checkbox
                  checked={selectedEstimates.includes(estimate.id)}
                  onCheckedChange={() => toggleEstimate(estimate.id)}
                  aria-label={`Select ${estimate.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{estimate.name}</div>
                <div className="text-xs text-muted-foreground">{estimate.id}</div>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${estimate.projectId}`} className="text-blue-600 hover:underline">
                  {estimate.project}
                </Link>
              </TableCell>
              <TableCell>{estimate.client}</TableCell>
              <TableCell>{new Date(estimate.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    estimate.status === "Approved"
                      ? "success"
                      : estimate.status === "Pending"
                        ? "default"
                        : estimate.status === "Draft"
                          ? "secondary"
                          : estimate.status === "Rejected"
                            ? "destructive"
                            : "outline"
                  }
                >
                  {estimate.status}
                </Badge>
              </TableCell>
              <TableCell>{estimate.amount}</TableCell>
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
                      <Link href={`/estimates/${estimate.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/estimates/${estimate.id}/edit`}>Edit Estimate</Link>
                    </DropdownMenuItem>
                    {!estimate.convertedToProposal && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <Link href={`/proposals/new?from=${estimate.id}`}>Convert to Proposal</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Estimate
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
