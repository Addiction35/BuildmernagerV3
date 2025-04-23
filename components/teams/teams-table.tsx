"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ExternalLink, Edit, Trash, Users } from "lucide-react"

// Sample data - in a real app, this would come from an API
const teams = [
  {
    id: "T001",
    name: "Alpha Construction Team",
    lead: "John Smith",
    email: "john@constructpro.com",
    members: 8,
    projects: 3,
    specialization: "Commercial Buildings",
    status: "Active",
  },
  {
    id: "T002",
    name: "Beta Electrical Team",
    lead: "Jane Doe",
    email: "jane@constructpro.com",
    members: 6,
    projects: 4,
    specialization: "Electrical Systems",
    status: "Active",
  },
  {
    id: "T003",
    name: "Gamma Plumbing Team",
    lead: "Mike Johnson",
    email: "mike@constructpro.com",
    members: 5,
    projects: 2,
    specialization: "Plumbing Systems",
    status: "Active",
  },
  {
    id: "T004",
    name: "Delta Design Team",
    lead: "Sarah Williams",
    email: "sarah@constructpro.com",
    members: 4,
    projects: 3,
    specialization: "Architectural Design",
    status: "Inactive",
  },
  {
    id: "T005",
    name: "Epsilon Finishing Team",
    lead: "Robert Brown",
    email: "robert@constructpro.com",
    members: 7,
    projects: 2,
    specialization: "Interior Finishing",
    status: "Active",
  },
]

export function TeamsTable() {
  const [data, setData] = useState(teams)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Lead</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.id}</TableCell>
              <TableCell>
                <Link href={`/teams/${team.id}`} className="font-medium hover:underline">
                  {team.name}
                </Link>
              </TableCell>
              <TableCell>
                <div>{team.lead}</div>
                <div className="text-sm text-muted-foreground">{team.email}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{team.members}</span>
                </div>
              </TableCell>
              <TableCell>{team.specialization}</TableCell>
              <TableCell>
                <Badge variant={team.status === "Active" ? "default" : "secondary"}>{team.status}</Badge>
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
                    <DropdownMenuItem>
                      <Link href={`/teams/${team.id}`} className="flex w-full items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/teams/${team.id}/edit`} className="flex w-full items-center">
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
