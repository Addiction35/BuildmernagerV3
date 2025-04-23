"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ExternalLink, Edit, Trash } from "lucide-react"

// Sample data - in a real app, this would come from an API
const vendors = [
  {
    id: "V001",
    name: "ABC Building Supplies",
    category: "Building Materials",
    contact: "John Smith",
    email: "john@abcbuilding.com",
    phone: "(555) 123-4567",
    status: "Active",
    lastOrder: "2023-04-15",
  },
  {
    id: "V002",
    name: "XYZ Electrical",
    category: "Electrical",
    contact: "Jane Doe",
    email: "jane@xyzelectrical.com",
    phone: "(555) 234-5678",
    status: "Active",
    lastOrder: "2023-04-10",
  },
  {
    id: "V003",
    name: "Plumbing Plus",
    category: "Plumbing",
    contact: "Mike Johnson",
    email: "mike@plumbingplus.com",
    phone: "(555) 345-6789",
    status: "Inactive",
    lastOrder: "2023-03-22",
  },
  {
    id: "V004",
    name: "Steel Works Inc",
    category: "Structural",
    contact: "Sarah Williams",
    email: "sarah@steelworks.com",
    phone: "(555) 456-7890",
    status: "Active",
    lastOrder: "2023-04-18",
  },
  {
    id: "V005",
    name: "Glass & Windows Co",
    category: "Windows & Glass",
    contact: "Robert Brown",
    email: "robert@glasswindows.com",
    phone: "(555) 567-8901",
    status: "Active",
    lastOrder: "2023-04-05",
  },
]

export function VendorsTable() {
  const [data, setData] = useState(vendors)

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
            <TableHead>Last Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>{vendor.id}</TableCell>
              <TableCell>
                <Link href={`/vendors/${vendor.id}`} className="font-medium hover:underline">
                  {vendor.name}
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
              <TableCell>{new Date(vendor.lastOrder).toLocaleDateString()}</TableCell>
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
                      <Link href={`/vendors/${vendor.id}`} className="flex w-full items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/vendors/${vendor.id}/edit`} className="flex w-full items-center">
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
