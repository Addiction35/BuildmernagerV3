import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ProjectDetailsProps {
  project: {
    id: string
    name: string
    client: string
    location: string
    status: string
    value: string
    startDate: string
    endDate: string
    progress: string
    description: string
    manager: string
    contact: {
      name: string
      email: string
      phone: string
    }
  }
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base">Description</Label>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Project Information</Label>
            <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Project ID</p>
                <p className="text-sm text-muted-foreground">{project.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm text-muted-foreground">{project.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{new Date(project.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">{new Date(project.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Value</p>
                <p className="text-sm text-muted-foreground">{project.value}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Progress</p>
                <p className="text-sm text-muted-foreground">{project.progress}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Location</Label>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">{project.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Client Information</Label>
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">Client</p>
              <p className="text-sm text-muted-foreground">{project.client}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Contact Person</p>
                <p className="text-sm text-muted-foreground">{project.contact.name}</p>
                <p className="text-sm text-muted-foreground">{project.contact.email}</p>
                <p className="text-sm text-muted-foreground">{project.contact.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Project Manager</Label>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">{project.manager}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
