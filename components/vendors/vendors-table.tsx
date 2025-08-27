"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ExternalLink, Edit, Trash } from "lucide-react"
import { useVendors } from "@/lib/hooks/vendorQueries"

export function VendorsTable() {

  const { data: vendors, isLoading } = useVendors()
  console.log(vendors);
    if (isLoading) {
      return <div>Loading...</div>
    }

  if (!vendors|| vendors.length === 0) 
  {
    return <div>No projects available</div>;
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vendor address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>{vendor.vendorId}</TableCell>
              <TableCell>
                <Link href={`/vendors/${vendor._id}`} className="font-medium hover:underline">
                  {vendor.companyName}
                </Link>
              </TableCell>
              <TableCell>{vendor.category}</TableCell>
              <TableCell>
                <div>{vendor.contact}</div>
                <div className="text-sm text-muted-foreground">{vendor.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>{vendor.status}</Badge>
              </TableCell>
              <TableCell>{vendor.address}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/vendors/${vendor._id}`} className="flex w-full items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/vendors/${vendor._id}/edit`} className="flex w-full items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
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
