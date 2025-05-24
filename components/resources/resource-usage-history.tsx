import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User } from "lucide-react"

interface ResourceUsageHistoryProps {
  resourceId: string
}

export function ResourceUsageHistory({ resourceId }: ResourceUsageHistoryProps) {
  const usageHistory = [
    {
      id: "1",
      project: "Downtown Office Complex",
      assignedTo: "John Smith",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      duration: "5 days",
      location: "Site A - Foundation",
      status: "completed",
      cost: 6000,
    },
    {
      id: "2",
      project: "Residential Complex Phase 2",
      assignedTo: "Mike Johnson",
      startDate: "2024-01-25",
      endDate: "2024-02-01",
      duration: "7 days",
      location: "Site B - Excavation",
      status: "completed",
      cost: 8400,
    },
    {
      id: "3",
      project: "Shopping Mall Renovation",
      assignedTo: "Sarah Wilson",
      startDate: "2024-02-05",
      endDate: "2024-02-12",
      duration: "7 days",
      location: "Mall Site - Parking",
      status: "in-progress",
      cost: 8400,
    },
    {
      id: "4",
      project: "Highway Bridge Construction",
      assignedTo: "David Brown",
      startDate: "2024-02-15",
      endDate: "2024-02-22",
      duration: "7 days",
      location: "Bridge Site - Pier 3",
      status: "scheduled",
      cost: 8400,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalRevenue = usageHistory
    .filter((usage) => usage.status === "completed")
    .reduce((sum, usage) => sum + usage.cost, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Usage History</CardTitle>
            <CardDescription>Recent assignments and usage of this resource</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-lg font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {usageHistory.map((usage) => (
            <div key={usage.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{usage.project}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {usage.assignedTo}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {usage.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(usage.status)}>{usage.status.replace("-", " ")}</Badge>
                  <p className="text-sm font-medium mt-1">${usage.cost.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(usage.startDate).toLocaleDateString()} - {new Date(usage.endDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {usage.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Usage History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
