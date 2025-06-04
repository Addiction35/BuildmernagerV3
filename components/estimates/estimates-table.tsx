"use client"
import { toast } from "sonner"
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
import { useEstimates, useDeleteEstimate } from "@/lib/hooks/EstimateQueries"

export function EstimatesTable() {
  const { data: estimates, isLoading, error } = useEstimates()
  const [selectedEstimates, setSelectedEstimates] = useState<string[]>([])

  const toggleEstimate = (estimateId: string) => {
    setSelectedEstimates((prev) =>
      prev.includes(estimateId) ? prev.filter((id) => id !== estimateId) : [...prev, estimateId],
    )
  }

  const toggleAll = () => {
    setSelectedEstimates((prev) =>
      prev.length === (estimates?.length ?? 0) ? [] : estimates?.map((estimate) => estimate._id) ?? [],
    )
  }

const deleteMutation = useDeleteEstimate();

const handleDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this estimate?")) {
    toast.promise(
      deleteMutation.mutateAsync(id),
      {
        loading: "Deleting estimate...",
        success: "Estimate deleted successfully",
        error: "Failed to delete estimate",
      }
    )
  }
}

  if (isLoading) {
    return <div className="p-4 text-center">Loading estimates...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-destructive">Error loading estimates: {(error as Error).message}</div>
  }

  if (!estimates || estimates.length === 0) {
    return <div className="p-4 text-center">No estimates found.</div>
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estimates.map((estimate) => (
            <TableRow key={estimate._id}>
              <TableCell>
                <Checkbox
                  checked={selectedEstimates.includes(estimate._id)}
                  onCheckedChange={() => toggleEstimate(estimate._id)}
                  aria-label={`Select ${estimate.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div>{estimate.name ?? "N/A"}</div>
                <div className="text-xs text-muted-foreground">{estimate.estimateId ?? "N/A"}</div>
              </TableCell>
              <TableCell>
                {estimate.projectId ? (
                  <Link href={`/projects/${estimate.projectId._id}`} className="text-blue-600 hover:underline">
                    {estimate.projectId.name ?? "N/A"}
                  </Link>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{estimate.clientId.primaryContact ?? "N/A"}</TableCell>
              <TableCell>{estimate.date ? new Date(estimate.date).toLocaleDateString() : "N/A"}</TableCell>
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
                  {estimate.status ?? "N/A"}
                </Badge>
              </TableCell>
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
                      <Link href={`/estimates/${estimate._id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/estimates/${estimate._id}/edit`}>Edit Estimate</Link>
                    </DropdownMenuItem>
                    {!estimate.convertedToProposal && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <Link href={`/proposals/new?from=${estimate._id}`}>Convert to Proposal</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(estimate._id)} className="text-destructive">
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
