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
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"

const resources = [
  {
    id: "RES001",
    name: "Excavator - CAT 320",
    type: "Equipment",
    description: "20-ton hydraulic excavator",
    status: "In Use",
    location: "Riverside Apartments Site",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    cost: "$1,200/day",
    availability: "Available from July 15, 2023",
    notes: "Regular maintenance scheduled for July 10",
  },
  {
    id: "RES002",
    name: "Concrete Mix - High Strength",
    type: "Material",
    description: "5000 PSI concrete mix",
    status: "Available",
    location: "Main Warehouse",
    projectId: null,
    project: null,
    cost: "$125/yard",
    availability: "500 yards in stock",
    notes: "Minimum order 10 yards",
  },
  {
    id: "RES003",
    name: "Framing Crew",
    type: "Labor",
    description: "5-person wood framing crew",
    status: "In Use",
    location: "Hillside Residence Site",
    projectId: "PRJ003",
    project: "Hillside Residence",
    cost: "$2,500/day",
    availability: "Available from June 30, 2023",
    notes: "Specialized in residential framing",
  },
  {
    id: "RES004",
    name: "Tower Crane",
    type: "Equipment",
    description: "Liebherr 200 EC-H tower crane",
    status: "Maintenance",
    location: "Equipment Yard",
    projectId: null,
    project: null,
    cost: "$3,500/day",
    availability: "Available from June 25, 2023",
    notes: "Annual inspection in progress",
  },
  {
    id: "RES005",
    name: "Electrical Subcontractor",
    type: "Subcontractor",
    description: "Elite Electrical Services",
    status: "Available",
    location: "Various",
    projectId: null,
    project: null,
    cost: "Per contract",
    availability: "Available from July 1, 2023",
    notes: "Preferred vendor for commercial projects",
  },
  {
    id: "RES006",
    name: "Structural Steel",
    type: "Material",
    description: "A36 structural steel beams",
    status: "Unavailable",
    location: "On order",
    projectId: "PRJ004",
    project: "Community Center",
    cost: "$1,800/ton",
    availability: "Expected delivery July 20, 2023",
    notes: "Supply chain delays reported",
  },
]

export function ResourcesTable() {
  const [selectedResources, setSelectedResources] = useState<string[]>([])

  const toggleResource = (resourceId: string) => {
    setSelectedResources((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId],
    )
  }

  const toggleAll = () => {
    setSelectedResources((prev) => (prev.length === resources.length ? [] : resources.map((resource) => resource.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedResources.length === resources.length && resources.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all resources"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell>
                <Checkbox
                  checked={selectedResources.includes(resource.id)}
                  onCheckedChange={() => toggleResource(resource.id)}
                  aria-label={`Select ${resource.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="font-medium">{resource.name}</div>
                <div className="text-xs text-muted-foreground">{resource.description}</div>
              </TableCell>
              <TableCell>{resource.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    resource.status === "Available"
                      ? "success"
                      : resource.status === "In Use"
                        ? "default"
                        : resource.status === "Maintenance"
                          ? "secondary"
                          : "destructive"
                  }
                >
                  {resource.status}
                </Badge>
              </TableCell>
              <TableCell>{resource.location}</TableCell>
              <TableCell>
                {resource.project ? (
                  <Link href={`/projects/${resource.projectId}`} className="text-blue-600 hover:underline">
                    {resource.project}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </TableCell>
              <TableCell>{resource.cost}</TableCell>
              <TableCell>{resource.availability}</TableCell>
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
                      <Link href={`/resources/${resource.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <Link href={`/resources/${resource.id}/edit`}>Edit Resource</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Resource
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
