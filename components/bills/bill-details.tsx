import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail } from "lucide-react"

interface BillItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface VendorDetails {
  name: string
  address: string
  phone: string
  email: string
}

interface Bill {
  id: string
  billNumber: string
  vendor: string
  project: string
  projectId: string
  amount: number
  paidAmount: number
  remainingAmount: number
  date: string
  dueDate: string
  status: string
  description: string
  items: BillItem[]
  vendorDetails: VendorDetails
}

interface BillDetailsProps {
  bill: Bill
}

export function BillDetails({ bill }: BillDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Details</CardTitle>
        <CardDescription>Complete information about this bill</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Bill Information</h4>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bill Number:</span>
                <span className="font-medium">{bill.billNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project:</span>
                <span className="font-medium">{bill.project}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bill Date:</span>
                <span className="font-medium">{new Date(bill.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">{new Date(bill.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">Vendor Information</h4>
            <div className="space-y-2 text-sm">
              <div className="font-medium">{bill.vendorDetails.name}</div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{bill.vendorDetails.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{bill.vendorDetails.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{bill.vendorDetails.email}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">Line Items</h4>
            <div className="space-y-3">
              {bill.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start text-sm">
                  <div className="flex-1">
                    <div className="font-medium">{item.description}</div>
                    <div className="text-muted-foreground">
                      {item.quantity} × ${item.unitPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="font-medium">${item.total.toLocaleString()}</div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center font-medium">
                <span>Total Amount:</span>
                <span className="text-lg">${bill.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {bill.description && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{bill.description}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
