import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    action: "created a new proposal",
    project: "Riverside Apartments",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    action: "approved purchase order",
    project: "Downtown Office Renovation",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    action: "added new expense",
    project: "Hillside Residence",
    time: "Yesterday",
  },
  {
    id: 4,
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DK",
    },
    action: "completed task",
    project: "Community Center",
    time: "Yesterday",
  },
  {
    id: 5,
    user: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LW",
    },
    action: "uploaded document",
    project: "Retail Store Fitout",
    time: "2 days ago",
  },
]

export function DashboardActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name} <span className="text-muted-foreground">{activity.action}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.project} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
