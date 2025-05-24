import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Package, DollarSign, Wrench, Shield } from "lucide-react"

interface Resource {
  id: string
  name: string
  type: string
  category: string
  quantity: number
  available: number
  costPerHour: number
  costPerDay: number
  supplier: string
  location: string
  status: string
  lastMaintenance: string
  nextMaintenance: string
  specifications: string
  description: string
  serialNumber: string
  purchaseDate: string
  warrantyExpiry: string
}

interface ResourceDetailsProps {
  resource: Resource
}

export function ResourceDetails({ resource }: ResourceDetailsProps) {
  const utilizationRate = ((resource.quantity - resource.available) / resource.quantity) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Details</CardTitle>
        <CardDescription>Complete information about this resource</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-muted-foreground">{resource.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{resource.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Supplier</p>
                <p className="text-sm text-muted-foreground">{resource.supplier}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Purchase Date</p>
                <p className="text-sm text-muted-foreground">{new Date(resource.purchaseDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Warranty Expiry</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(resource.warrantyExpiry).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Last Maintenance</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(resource.lastMaintenance).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Utilization Rate</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${utilizationRate}%` }} />
              </div>
              <span className="text-sm text-muted-foreground">{utilizationRate.toFixed(1)}%</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Cost Rates</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold">${resource.costPerHour}</p>
                <p className="text-xs text-muted-foreground">per hour</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold">${resource.costPerDay}</p>
                <p className="text-xs text-muted-foreground">per day</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Specifications</p>
            <p className="text-sm text-muted-foreground">{resource.specifications}</p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Description</p>
            <p className="text-sm text-muted-foreground">{resource.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}