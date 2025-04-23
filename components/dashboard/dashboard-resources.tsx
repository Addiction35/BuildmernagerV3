"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"

interface DashboardResourcesProps {
  extended?: boolean
}

const resources = [
  {
    id: "RES001",
    name: "Excavator - CAT 320",
    type: "Equipment",
    status: "In Use",
    location: "Riverside Apartments Site",
    projectId: "PRJ001",
    project: "Riverside Apartments",
    availability: "Available from July 15, 2023",
  },
  {
    id: "RES002",
    name: "Concrete Mix - High Strength",
    type: "Material",
    status: "Available",
    location: "Main Warehouse",
    projectId: null,
    project: null,
    availability: "500 yards in stock",
  },
  {
    id: "RES003",
    name: "Framing Crew",
    type: "Labor",
    status: "In Use",
    location: "Hillside Residence Site",
    projectId: "PRJ003",
    project: "Hillside Residence",
    availability: "Available from June 30, 2023",
  },
  {
    id: "RES004",
    name: "Tower Crane",
    type: "Equipment",
    status: "Maintenance",
    location: "Equipment Yard",
    projectId: null,
    project: null,
    availability: "Available from June 25, 2023",
  },
  {
    id: "RES005",
    name: "Electrical Subcontractor",
    type: "Subcontractor",
    status: "Available",
    location: "Various",
    projectId: null,
    project: null,
    availability: "Available from July 1, 2023",
  },
]

export function DashboardResources({ extended = false }: DashboardResourcesProps) {
  const displayResources = extended ? resources : resources.slice(0, 4)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Resource</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          {extended && <TableHead>Location</TableHead>}
          {extended && <TableHead>Project</TableHead>}
          {extended && <TableHead>Availability</TableHead>}
          {extended && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayResources.map((resource) => (
          <TableRow key={resource.id}>
            <TableCell className="font-medium">{resource.name}</TableCell>
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
            {extended && <TableCell>{resource.location}</TableCell>}
            {extended && (
              <TableCell>
                {resource.project ? (
                  <Link href={`/projects/${resource.projectId}`} className="text-blue-600 hover:underline">
                    {resource.project}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </TableCell>
            )}
            {extended && <TableCell>{resource.availability}</TableCell>}
            {extended && (
              <TableCell className="text-right">
                <Link href={`/resources/${resource.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
