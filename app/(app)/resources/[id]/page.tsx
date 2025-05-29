import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResourceDetails } from "@/components/resources/resource-details"
import { ResourceUsageHistory } from "@/components/resources/resource-usage-history"
import { ArrowLeft, Edit, Trash2, MapPin, Calendar } from 'lucide-react'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  return {
    title: `Resource ${id} | Construction Management`,
    description: `View and manage resource ${id}`,
  }
}

export default async function ResourcePage({ params }: Props) {
  const { id } = await params

  // In a real app, you would fetch the resource data here
  const resource = {
    id,
    name: "Excavator CAT 320",
    type: "Heavy Equipment",
    category: "Equipment",
    quantity: 1,
    available: 1,
    costPerHour: 150,
    costPerDay: 1200,
    supplier: "Heavy Equipment Rentals Inc.",
    location: "Main Warehouse",
    status: "available" as const,
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-04-10",
    specifications: "320 HP, 20-ton operating weight, GPS enabled",
    description: "Heavy-duty excavator suitable for large construction projects. Equipped with GPS tracking and latest safety features.",
    serialNumber: "CAT320-2024-001",
    purchaseDate: "2023-06-15",
    warrantyExpiry: "2026-06-15",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "in-use":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-service":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/resources">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{resource.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {resource.location}
            </span>
            <span>Serial: {resource.serialNumber}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(resource.status)}>
            {resource.status.charAt(0).toUpperCase() + resource.status.slice(1).replace('-', ' ')}
          </Badge>
          <Link href={`/resources/${id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resource.available}/{resource.quantity}</div>
            <p className="text-xs text-muted-foreground">Units available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${resource.costPerHour}</div>
            <p className="text-xs text-muted-foreground">Hourly rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${resource.costPerDay}</div>
            <p className="text-xs text-muted-foreground">Daily rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Calendar className="h-5 w-5 inline mr-1" />
              {new Date(resource.nextMaintenance).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <p className="text-xs text-muted-foreground">Scheduled date</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResourceDetails resource={resource} />
        <ResourceUsageHistory resourceId={id} />
      </div>
    </div>
  )
}
