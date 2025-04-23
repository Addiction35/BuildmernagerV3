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
import { Progress } from "@/components/ui/progress"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"

const budgets = [
  {
    id: "BUD001",
    name: "Riverside Apartments - Construction Budget",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    totalBudget: 5250000,
    spent: 3150000,
    remaining: 2100000,
    percentUsed: 60,
    status: "Active",
    startDate: "2023-01-15",
    endDate: "2024-06-30",
  },
  {
    id: "BUD002",
    name: "Downtown Office - Renovation Budget",
    projectId: "PRJ002",
    project: "Downtown Office Renovation",
    totalBudget: 1800000,
    spent: 1350000,
    remaining: 450000,
    percentUsed: 75,
    status: "Active",
    startDate: "2023-03-01",
    endDate: "2023-12-15",
  },
  {
    id: "BUD003",
    name: "Hillside Residence - Construction Budget",
    projectId: "PRJ003",
    project: "Hillside Residence",
    totalBudget: 2100000,
    spent: 1890000,
    remaining: 210000,
    percentUsed: 90,
    status: "Over Budget",
    startDate: "2023-02-10",
    endDate: "2023-11-30",
  },
  {
    id: "BUD004",
    name: "Community Center - Phase 1 Budget",
    projectId: "PRJ004",
    project: "Community Center",
    totalBudget: 3350000,
    spent: 850000,
    remaining: 2500000,
    percentUsed: 25,
    status: "Active",
    startDate: "2023-05-01",
    endDate: "2024-08-15",
  },
  {
    id: "BUD005",
    name: "Retail Store - Fitout Budget",
    projectId: "PRJ005",
    project: "Retail Store Fitout",
    totalBudget: 750000,
    spent: 750000,
    remaining: 0,
    percentUsed: 100,
    status: "Completed",
    startDate: "2023-01-05",
    endDate: "2023-04-30",
  },
]

export function BudgetsTable() {
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([])

  const toggleBudget = (budgetId: string) => {
    setSelectedBudgets((prev) => (prev.includes(budgetId) ? prev.filter((id) => id !== budgetId) : [...prev, budgetId]))
  }

  const toggleAll = () => {
    setSelectedBudgets((prev) => (prev.length === budgets.length ? [] : budgets.map((budget) => budget.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedBudgets.length === budgets.length && budgets.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all budgets"
              />
            </TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Total Budget</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.map((budget) => (
            <TableRow key={budget.id}>
              <TableCell>
                <Checkbox
                  checked={selectedBudgets.includes(budget.id)}
                  onCheckedChange={() => toggleBudget(budget.id)}
                  aria-label={`Select ${budget.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{budget.name}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${budget.projectId}`} className="text-blue-600 hover:underline">
                  {budget.project}
                </Link>
              </TableCell>
              <TableCell>${(budget.totalBudget / 1000).toLocaleString()}K</TableCell>
              <TableCell>${(budget.spent / 1000).toLocaleString()}K</TableCell>
              <TableCell>${(budget.remaining / 1000).toLocaleString()}K</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={budget.percentUsed} className="h-2 w-full" />
                  <span className="text-xs font-medium">{budget.percentUsed}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    budget.status === "Completed"
                      ? "success"
                      : budget.status === "Active"
                        ? "default"
                        : budget.status === "Over Budget"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {budget.status}
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
                      <Link href={`/budgets/${budget.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/budgets/${budget.id}/edit`}>Edit Budget</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Budget
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
