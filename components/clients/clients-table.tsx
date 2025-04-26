"use client"

import { useState } from "react"
import Link from "next/link"
import { useGetClients, useDeleteClient } from "@/lib/hooks/clientQueries"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { MoreHorizontal, ExternalLink, Edit, Trash } from "lucide-react"

export function ClientsTable() {
  const { toast } = useToast()
  const { data: clients, isLoading } = useGetClients()
  //console.log("clients:", clients);
  

  const deleteClient = useDeleteClient()

  const [selectedId, setSelectedId] = useState<string | null>(null)

const handleDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this client?")) {
    deleteClient.mutate(id, {
      onSuccess: () => {
        toast.success("Deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete", { variant: "destructive" });
      },
    });
  }
};

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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            clients?.map((client) => (
              <TableRow key={client._id}>
                <TableCell>{client.clientId}</TableCell>
                <TableCell>
                  <Link href={`/clients/${client._id}`} className="font-medium hover:underline">
                    {client.primaryContact}
                  </Link>
                </TableCell>
                <TableCell>{client.clientType}</TableCell>
                <TableCell>
                  <div>{client.primaryContact}</div>
                  <div className="text-sm text-muted-foreground">{client.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={client.status === "Active" ? "default" : "secondary"}>
                    {client.status}
                  </Badge>
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
                        <Link href={`/clients/${client._id}`} className="flex w-full items-center">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/clients/${client._id}/edit`} className="flex w-full items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
                            deleteMutation.mutate(project._id)
                          }
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
