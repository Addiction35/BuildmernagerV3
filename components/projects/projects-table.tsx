// components/projects/projects-table.tsx

"use client"

import { useMemo, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Eye,
  Edit,
  Trash,
  MoreHorizontal,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
} from "lucide-react"

import { useProjects, useDeleteProject } from "@/lib/hooks/projectQueries"
import { toast } from "sonner"

export function ProjectsTable() {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: projects = [], isLoading } = useProjects()
  const deleteMutation = useDeleteProject()

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      toast.promise(deleteMutation.mutateAsync(id), {
        loading: "Deleting...",
        success: "Deleted",
        error: "Error deleting project",
      })
    }
  }

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={val => table.toggleAllPageRowsSelected(!!val)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={val => row.toggleSelected(!!val)}
        />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column} label="Project" />,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.location}</div>
        </div>
      ),
    },
    {
      accessorKey: "client.primaryContact",
      header: "Client",
      cell: ({ row }) => row.original.client?.primaryContact || "-",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        const variant =
          status === "Completed" ? "success" :
          status === "In Progress" ? "default" :
          status === "planning" ? "secondary" : "outline"
        return <Badge variant={variant}>{status}</Badge>
      },
      filterFn: (row, id, value) => value === "All" || row.getValue(id) === value,
    },
    {
      accessorKey: "value",
      header: ({ column }) => <SortableHeader column={column} label="Value" />,
    },
    {
      accessorKey: "startDate",
      header: "Start",
      cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
    },
    {
      accessorKey: "timeline",
      header: "Timeline",
      cell: ({ row }) => {
        const { startDate, endDate } = row.original
        return (
          <div className="text-xs">
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const id = row.original._id
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/projects/${id}`}>
                  <Eye className="mr-2 h-4 w-4" /> View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/projects/${id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(id)} className="text-destructive">
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ], [])

  const table = useReactTable({
    data: projects,
    columns,
    state: {
      rowSelection,
      globalFilter,
      columnFilters,
      pagination,
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const setStatusFilter = (status: string) => {
    table.getColumn("status")?.setFilterValue(status)
  }

  const sortByNewest = () => {
    table.setSorting([{ id: "startDate", desc: true }])
  }

  const sortByAlphabet = () => {
    table.setSorting([{ id: "name", desc: false }])
  }

  if (isLoading) return <div>Loading...</div>
  if (!projects.length) return <div>No projects available</div>

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-46 bg-white">
              <DropdownMenuLabel className="pt-2">Sort</DropdownMenuLabel>
              <DropdownMenuItem onClick={sortByNewest}>Newest First</DropdownMenuItem>
              <DropdownMenuItem onClick={sortByAlphabet}>Alphabet (A-Z)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} className={row.getIsSelected() ? "bg-muted/40" : ""}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-2">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
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

function SortableHeader({ column, label }: { column: any; label: string }) {
  const sorted = column.getIsSorted()
  return (
    <Button
      variant="ghost"
      className="pl-0 hover:bg-transparent"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> :
        sorted === "desc" ? <ChevronDown className="ml-2 h-4 w-4" /> :
          <ChevronsUpDown className="ml-2 h-4 w-4" />}
    </Button>
  )
}
