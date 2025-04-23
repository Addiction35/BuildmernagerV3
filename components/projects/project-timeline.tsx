import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock } from "lucide-react"

interface ProjectTimelineProps {
  projectId: string
}

// This would normally come from a database
const getMilestones = (projectId: string) => {
  return [
    {
      id: 1,
      name: "Project Planning",
      date: "2023-04-01",
      status: "Completed",
      description: "Initial project planning and scope definition",
    },
    {
      id: 2,
      name: "Design Phase",
      date: "2023-04-15",
      status: "Completed",
      description: "Architectural and engineering design",
    },
    {
      id: 3,
      name: "Permits & Approvals",
      date: "2023-05-10",
      status: "Completed",
      description: "Obtaining necessary permits and regulatory approvals",
    },
    {
      id: 4,
      name: "Site Preparation",
      date: "2023-05-20",
      status: "Completed",
      description: "Clearing and preparing the construction site",
    },
    {
      id: 5,
      name: "Foundation Work",
      date: "2023-06-15",
      status: "Completed",
      description: "Laying the building foundation",
    },
    {
      id: 6,
      name: "Structural Framework",
      date: "2023-07-30",
      status: "In Progress",
      description: "Erecting the structural framework of the building",
    },
    {
      id: 7,
      name: "Exterior Work",
      date: "2023-09-15",
      status: "Pending",
      description: "Completing the exterior walls, windows, and roof",
    },
    {
      id: 8,
      name: "Interior Work",
      date: "2023-11-30",
      status: "Pending",
      description: "Interior construction and finishing",
    },
    {
      id: 9,
      name: "Mechanical & Electrical",
      date: "2024-02-15",
      status: "Pending",
      description: "Installing mechanical and electrical systems",
    },
    {
      id: 10,
      name: "Final Inspections",
      date: "2024-05-01",
      status: "Pending",
      description: "Final inspections and obtaining occupancy permit",
    },
    {
      id: 11,
      name: "Project Completion",
      date: "2024-06-15",
      status: "Pending",
      description: "Final walkthrough and project handover",
    },
  ]
}

export function ProjectTimeline({ projectId }: ProjectTimelineProps) {
  const milestones = getMilestones(projectId)

  return (
    <div className="space-y-8">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="relative flex gap-6">
          {index < milestones.length - 1 && (
            <div className="absolute left-[19px] top-[30px] h-full w-[2px] bg-border" />
          )}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background">
            {milestone.status === "Completed" ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : milestone.status === "In Progress" ? (
              <Clock className="h-5 w-5 text-blue-500" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold">{milestone.name}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(milestone.date).toLocaleDateString()}</p>
                </div>
                <Badge
                  variant={
                    milestone.status === "Completed"
                      ? "success"
                      : milestone.status === "In Progress"
                        ? "default"
                        : "outline"
                  }
                >
                  {milestone.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm">{milestone.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
