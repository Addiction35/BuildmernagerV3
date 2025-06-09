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
import { useDeleteProposal, useProposals } from "@/lib/hooks/proposalQueries"
import { toast } from "sonner"


export function ProposalsTable() {
  const { data: proposals, isLoading } = useProposals()
  const [selectedProposals, setSelectedProposals] = useState<string[]>([])

  const toggleProposal = (proposalId: string) => {
    setSelectedProposals((prev) =>
      prev.includes(proposalId) ? prev.filter((id) => id !== proposalId) : [...prev, proposalId],
    )
  }

  const toggleAll = () => {
    setSelectedProposals((prev) => (prev.length === proposals.length ? [] : proposals.map((proposal) => proposal.id)))
  }
  const deleteMutation = useDeleteProposal();
  const handleDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this project?")) {
    toast.promise(
      deleteMutation.mutateAsync(id),
      {
        loading: "Deleting Proposal...",
        success: "Proposal deleted successfully",
        error: "Failed to delete Proposal",
      }
    )
  }
}
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!proposals || proposals.length === 0) 
  {
    return <div>No projects available</div>;
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
          {proposals?.map((proposal) => (
            <TableRow key={proposal._id}>
              <TableCell>
                <Checkbox
                  checked={selectedProposals.includes(proposal.id)}
                  onCheckedChange={() => toggleProposal(proposal.id)}
                  aria-label={`Select ${proposal.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{proposal.name}</div>
                <div className="text-xs text-muted-foreground">{proposal.proposalId}</div>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${proposal.projectId._id}`} className="text-blue-600 hover:underline">
                  {proposal.projectId.name}
                </Link>
              </TableCell>
              <TableCell>{proposal.clientId.primaryContact}</TableCell>
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
                      <Link href={`/proposals/${proposal._id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/proposals/${proposal._id}/edit`}>Edit Proposal</Link>
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
                    <DropdownMenuItem onClick={() => handleDelete(proposal._id)} className="text-destructive">
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
