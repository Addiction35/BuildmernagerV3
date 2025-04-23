"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ExternalLink, Edit, Trash } from "lucide-react"

// Sample data - in a real app, this would come from an API
const clients = [
  {
    id: "C001",
    name: "Metropolis Development Corp",
    type: "Commercial",
    contact: "Bruce Wayne",
    email: "bruce@metropolis.com",
    phone: "(555) 123-4567",
    status: "Active",
    projects: 3,
  },
  {
    id: "C002",
    name: "Gotham City Council",
    type: "Government",
    contact: "James Gordon",
    email: "gordon@gothamcity.gov",
    phone: "(555) 234-5678",
    status: "Active",
    projects: 2,
  },
  {
    id: "C003",
    name: "Star Labs",
    type: "Research",
    contact: "Barry Allen",
    email: "barry@starlabs.com",
    phone: "(555) 345-6789",
    status: "Inactive",
    projects: 1,
  },
  {
    id: "C004",
    name: "Queen Consolidated",
    type: "Commercial",
    contact: "Oliver Queen",
    email: "oliver@queenconsolidated.com",
    phone: "(555) 456-7890",
    status: "Active",
    projects: 2,
  },
  {
    id: "C005",
    name: "Daily Planet",
    type: "Media",
    contact: "Clark Kent",
    email: "clark@dailyplanet.com",
    phone: "(555) 567-8901",
    status: "Active",
    projects: 1,
  },
]

export function ClientsTable() {
  const [data, setData] = useState(clients)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>
                <Link href={`/clients/${client.id}`} className="font-medium hover:underline">
                  {client.name}
                </Link>
              </TableCell>
              <TableCell>{client.type}</TableCell>
              <TableCell>
                <div>{client.contact}</div>
                <div className="text-sm text-muted-foreground">{client.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
              </TableCell>
              <TableCell>{client.projects}</TableCell>
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
                      <Link href={`/clients/${client.id}`} className="flex w-full items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/clients/${client.id}/edit`} className="flex w-full items-center">
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
