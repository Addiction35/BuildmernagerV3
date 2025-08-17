"use client";

import { useState, useMemo } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

// ================== TYPES ==================
type Payslip = {
  _id: string;
  employeeName: string;
  date: string;
  grossPay: number;
  calculations: {
    netPay: number;
    totalDeductions: number;
  };
  status: "draft" | "final" | "approved" | "rejected";
};

// ================== API ==================
const fetchPayslips = async (): Promise<Payslip[]> => {
  const { data } = await axiosInstance.get("/pay-slip");
  return data;
};

// ================== COMPONENT ==================
export function PayslipTable() {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["payslips"],
    queryFn: fetchPayslips,
  });

  // ===== Mutations =====
  const approveMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.patch(`/pay-slip/${id}/approve`),
    onSuccess: () => {
      toast({
        title: "✅ Approved",
        description: "Payslip approved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["payslips"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.patch(`/pay-slip/${id}/reject`),
    onSuccess: () => {
      toast({
        title: " Rejected",
        description: "Payslip rejected successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["payslips"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/payslips/${id}`),
    onSuccess: () => {
      toast({
        title: "🗑 Deleted",
        description: "Payslip deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["payslips"] });
    },
  });

  // ===== Filters =====
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredData = useMemo(() => {
    return data.filter((p) => {
      const matchesSearch =
        p.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        p._id.includes(search);
      const matchesStatus =
        statusFilter === "all" ? true : p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  // ===== Columns =====
  const columnHelper = createColumnHelper<Payslip>();
  const columns = [
    columnHelper.accessor("employeeName", {
      header: "Employee",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("grossPay", {
      header: "Gross Pay",
      cell: (info) => `KES ${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor("calculations.netPay", {
      header: "Net Pay",
      cell: (info) => `KES ${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            info.getValue() === "approved"
              ? "bg-green-100 text-green-600"
              : info.getValue() === "rejected"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const payslip = row.original;

        return (
          <div className="flex gap-2">
            {/* ===== Approve ===== */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={payslip.status === "approved"}
                >
                  Approve
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Approve Payslip</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to approve this payslip for{" "}
                    <b>{payslip.employeeName}</b>?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => approveMutation.mutate(payslip._id)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* ===== Reject ===== */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={payslip.status === "rejected"}
                >
                  Reject
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reject Payslip</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to reject this payslip for{" "}
                    <b>{payslip.employeeName}</b>? This action can be
                    reverted later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => rejectMutation.mutate(payslip._id)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* ===== Delete ===== */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="ghost">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Payslip</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to permanently delete this payslip for{" "}
                    <b>{payslip.employeeName}</b>? This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => deleteMutation.mutate(payslip._id)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* ===== View ===== */}
            <Link href={`/payslips/${payslip._id}`}>
              <Button size="sm" variant="secondary">
                View
              </Button>
            </Link>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Loading payslips...</p>;

  return (
    <div className="p-4 space-y-4">
      {/* ===== Filters & Search ===== */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
        <Input
          placeholder="Search by employee or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="final">Final</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ===== Table ===== */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 text-left font-medium text-gray-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Pagination ===== */}
      <div className="flex justify-between items-center pt-3">
        <div className="text-sm text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
