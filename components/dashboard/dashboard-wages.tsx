"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Receipt } from "lucide-react"
import { useWages } from "@/lib/hooks/wagesQueries"

interface DashboardWagesProps {
  limit?: number
  extended?: boolean
}

export function DashboardWages({ limit, extended = false }: DashboardWagesProps) {
  const { data: wages = [], isLoading } = useWages()
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (!wages || wages.length === 0) 
    {
      return <div>No tasks available</div>;
    }

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
          <TableRow key={wage._id}>
            <TableCell className="font-medium">{wage.wageNumber}</TableCell>
            <TableCell>{wage.vendorName}</TableCell>
            {extended && (
              <TableCell>
                <Link href={`/projects/${wage.projectId._id}`} className="text-blue-600 hover:underline">
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
