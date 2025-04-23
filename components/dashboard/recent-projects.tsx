import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"

const projects = [
  {
    id: "PRJ001",
    name: "Riverside Apartments",
    client: "Riverside Development LLC",
    status: "In Progress",
    value: "$1,250,000",
    progress: "65%",
  },
  {
    id: "PRJ002",
    name: "Downtown Office Renovation",
    client: "Metro Business Group",
    status: "Planning",
    value: "$450,000",
    progress: "15%",
  },
  {
    id: "PRJ003",
    name: "Hillside Residence",
    client: "Johnson Family",
    status: "In Progress",
    value: "$780,000",
    progress: "40%",
  },
  {
    id: "PRJ004",
    name: "Community Center",
    client: "Oakville Municipality",
    status: "Pending Approval",
    value: "$2,100,000",
    progress: "5%",
  },
  {
    id: "PRJ005",
    name: "Retail Store Fitout",
    client: "Fashion Outlet Inc.",
    status: "Completed",
    value: "$320,000",
    progress: "100%",
  },
]

export function RecentProjects() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.client}</TableCell>
            <TableCell>
              <Badge
                variant={
                  project.status === "Completed"
                    ? "success"
                    : project.status === "In Progress"
                      ? "default"
                      : project.status === "Planning"
                        ? "secondary"
                        : "outline"
                }
              >
                {project.status}
              </Badge>
            </TableCell>
            <TableCell>{project.value}</TableCell>
            <TableCell>{project.progress}</TableCell>
            <TableCell className="text-right">
              <Link href={`/projects/${project.id}`}>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
