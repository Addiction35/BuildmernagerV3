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

const proposals = [
  {
    id: "PRO001",
    name: "Riverside Apartments - Construction Proposal",
    project: "Riverside Apartments",
    projectId: "PRJ001",
    client: "Riverside Development LLC",
    date: "2023-04-20",
    status: "Approved",
    amount: "$1,250,000",
    estimateId: "EST001",
  },
  {
    id: "PRO002",
    name: "Hillside Residence - Construction Proposal",
    project: "Hillside Residence",
    projectId: "PRJ003",
    client: "Johnson Family",
    date: "2023-03-10",
    status: "Approved",
    amount: "$780,000",
    estimateId: "EST003",
  },
  {
    id: "PRO003",
    name: "Retail Store - Fitout Proposal",
    project: "Retail Store Fitout",
    projectId: "PRJ005",
    client: "Fashion Outlet Inc.",
    date: "2022-12-15",
    status: "Approved",
    amount: "$320,000",
    estimateId: "EST005",
  },
  {
    id: "PRO004",
    name: "Medical Center - Construction Proposal",
    project: "Medical Center",
    projectId: "PRJ008",
    client: "Healthcare Partners",
    date: "2024-01-20",
    status: "Pending Approval",
    amount: "$4,500,000",
    estimateId: null,
  },
  {
    id: "PRO005",
    name: "School Renovation - Phase 1 Proposal",
    project: "School Renovation",
    projectId: "PRJ007",
    client: "Westside School District",
    date: "2023-10-25",
    status: "Pending Approval",
    amount: "$1,500,000",
    estimateId: null,
  },
]

export function ProposalsTable() {
  const [selectedProposals, setSelectedProposals] = useState<string[]>([])

  const toggleProposal = (proposalId: string) => {
    setSelectedProposals((prev) =>
      prev.includes(proposalId) ? prev.filter((id) => id !== proposalId) : [...prev, proposalId],
    )
  }

  const toggleAll = () => {
    setSelectedProposals((prev) => (prev.length === proposals.length ? [] : proposals.map((proposal) => proposal.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedProposals.length === proposals.length && proposals.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all proposals"
              />
            </TableHead>
            <TableHead>Proposal</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProposals.includes(proposal.id)}
                  onCheckedChange={() => toggleProposal(proposal.id)}
                  aria-label={`Select ${proposal.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{proposal.name}</div>
                <div className="text-xs text-muted-foreground">{proposal.id}</div>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${proposal.projectId}`} className="text-blue-600 hover:underline">
                  {proposal.project}
                </Link>
              </TableCell>
              <TableCell>{proposal.client}</TableCell>
              <TableCell>{new Date(proposal.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    proposal.status === "Approved"
                      ? "success"
                      : proposal.status === "Pending Approval"
                        ? "default"
                        : proposal.status === "Rejected"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {proposal.status}
                </Badge>
              </TableCell>
              <TableCell>{proposal.amount}</TableCell>
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
                      <Link href={`/proposals/${proposal.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/proposals/${proposal.id}/edit`}>Edit Proposal</Link>
                    </DropdownMenuItem>
                    {proposal.status === "Approved" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Receipt className="mr-2 h-4 w-4" />
                          <Link href={`/bills/new?from=${proposal.id}`}>Convert to Bill</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Proposal
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
