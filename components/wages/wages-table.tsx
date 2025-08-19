"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useWages } from "@/lib/hooks/wagesQueries"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useToast } from "@/components/ui/use-toast"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Search, Eye, Edit, Receipt, Trash, MoreHorizontal } from "lucide-react"
import { ApproveWage, deleteWage, RejectWage } from "@/lib/api/wages"


export function WagesTable() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

      const { mutate: deletewage, isLoading: isDeleting } = useMutation({
    mutationFn: deleteWage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wages"] })
      toast({ title: "Wage Order deleted", variant: "destructive" })
    },
    onError: () => toast({ title: "Failed to delete Wage", variant: "destructive" }),
  })

  const { mutate: approveWage } = useMutation({
    mutationFn: ApproveWage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wages"] })
      toast({ title: "Wage Order approved " })
    },
    onError: () => toast({ title: "Failed to approve wage", variant: "destructive" }),
  })

  const { mutate: rejectWage } = useMutation({
    mutationFn: RejectWage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wages"] })
      toast({ title: "Wage Order rejected " })
    },
    onError: () => toast({ title: "Failed to reject Wage", variant: "destructive" }),
  })

  const { data: wages = [], isLoading } = useWages()

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sort, setSort] = useState("newest")

  // ✅ Filtering + Sorting Logic
  const filteredWages = useMemo(() => {
    let filtered = [...wages]

    if (search.trim()) {
      const s = search.toLowerCase()
      filtered = filtered.filter(
        (wage) =>
          wage.vendorName?.toLowerCase().includes(s) ||
          wage.wageNumber?.toLowerCase().includes(s) ||
          wage.reference?.toLowerCase().includes(s)
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (wage) => wage.status?.toLowerCase() === statusFilter
      )
    }

    if (sort === "newest") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    } else if (sort === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    } else if (sort === "amount-high") {
      filtered.sort((a, b) => (b.amount || 0) - (a.amount || 0))
    } else if (sort === "amount-low") {
      filtered.sort((a, b) => (a.amount || 0) - (b.amount || 0))
    }

    return filtered
  }, [wages, search, statusFilter, sort])

  // ✅ Table Columns
  const columns: ColumnDef<any>[] = [
    { header: "#", cell: ({ row }) => row.index + 1 },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
    },
    { accessorKey: "wageNumber", header: "Wage Number" },
    { accessorKey: "reference", header: "Reference" },
    { accessorKey: "vendorName", header: "Vendor" },
    {
      accessorKey: "deliveryDate",
      header: "Delivery Date",
      cell: ({ row }) => new Date(row.original.deliveryDate).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "Paid" ? "success" : "secondary"}>
          {row.original.status}
        </Badge>
      ),
    },
    { accessorKey: "company", header: "Company" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) =>
        new Intl.NumberFormat("en-KE", {
          style: "currency",
          currency: "KES",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row.original.amount || 0),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const wage = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
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
              <DropdownMenuSeparator />
{/* ✅ Approve with confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()} // ⬅ prevents auto-close
                disabled={wage.status === "Approved"}
              >
                Approve
              </DropdownMenuItem>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Wage Order?</AlertDialogTitle>
              <AlertDialogDescription>
                This will mark the Wage as <strong>Approved</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => ApproveWage(wage._id)}>
                Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
          {/* ❌ Reject with confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem 
              onSelect={(e) => e.preventDefault()}
              disabled={wage.status === "Rejected"}>
                 Reject
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reject Wage Order?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will mark the Wage as <strong>Rejected</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-white hover:bg-destructive/90"
                  onClick={() => RejectWage(wage._id)}
                >
                  Reject
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenuSeparator />
          {/* 🗑 Soft Delete with confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-destructive"
              onSelect={(e) => e.preventDefault()}>
                
                <Trash className="mr-2 h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete Wage Order"}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Wage ?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The purchase order will be soft deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-white hover:bg-destructive/90"
                  onClick={() => deletewage(wage._id)}
                >
                  Delete 
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> 
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // ✅ Table Instance
  const table = useReactTable({
    data: filteredWages,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-muted-foreground">Loading wages...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 🔍 Filters */}
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wages..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="amount-high">Highest Amount</SelectItem>
              <SelectItem value="amount-low">Lowest Amount</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">Filter</Button>
        </div>
      </div>

      {/* 📄 Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-blue-300 font-bold text-black"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4 text-gray-500">
                  No wages found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <Button
              key={i}
              size="sm"
              variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
              onClick={() => table.setPageIndex(i)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
