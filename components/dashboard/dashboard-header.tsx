import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface DashboardHeaderProps {
  title?: string
  description?: string
}

export function DashboardHeader({
  title = "Dashboard",
  description = "Welcome to your dashboard",
}: DashboardHeaderProps) {
  // Get current date in format: April 23, 2023
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{currentDate}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
