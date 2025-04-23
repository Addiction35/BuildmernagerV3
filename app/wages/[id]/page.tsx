import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Receipt } from "lucide-react"

export const metadata: Metadata = {
  title: "Wage Details | Construction Management",
  description: "View wage details",
}

// This would normally come from a database
const getWage = (id: string) => {
  const wages = [
    {
      id: "WG001",
      number: "WG-2023-001",
      date: "2023-06-18",
      reference: "PRJ001-LABOR-JUN",
      vendorName: "John Carpenter",
      vendorAddress: "789 Worker Ave, Construction City, CC 12345",
      vendorContact: "John Carpenter",
      vendorEmail: "john.carpenter@example.com",
      vendorPhone: "(555) 987-6543",
      deliveryDate: "2023-06-18",
      status: "Paid",
      billed: true,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ001",
      project: "Riverside Apartments",
      notes: "Weekly wages for carpentry work on the Riverside Apartments project.",
      items: [
        {
          id: "ITEM001",
          description: "Framing Work - 40 hours",
          quantity: 40,
          unit: "Hours",
          unitPrice: 35.0,
          amount: 1400.0,
        },
        {
          id: "ITEM002",
          description: "Overtime - 8 hours",
          quantity: 8,
          unit: "Hours",
          unitPrice: 52.5,
          amount: 420.0,
        },
        {
          id: "ITEM003",
          description: "Weekend Premium",
          quantity: 1,
          unit: "Flat",
          unitPrice: 200.0,
          amount: 200.0,
        },
        {
          id: "ITEM004",
          description: "Materials Handling Bonus",
          quantity: 1,
          unit: "Flat",
          unitPrice: 150.0,
          amount: 150.0,
        },
      ],
      subtotal: 2170.0,
      tax: 0.0,
      deductions: 370.0,
      total: 1800.0,
    },
    {
      id: "WG002",
      number: "WG-2023-002",
      date: "2023-06-25",
      reference: "PRJ003-LABOR-JUN",
      vendorName: "Electric Team",
      vendorAddress: "456 Circuit Ave, Construction City, CC 12345",
      vendorContact: "Sarah Johnson",
      vendorEmail: "sarah.johnson@example.com",
      vendorPhone: "(555) 456-7890",
      deliveryDate: "2023-06-25",
      status: "Pending",
      billed: false,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ003",
      project: "Hillside Residence",
      notes: "Electrical work for the Hillside Residence project.",
      items: [
        {
          id: "ITEM001",
          description: "Electrical Installation - 50 hours",
          quantity: 50,
          unit: "Hours",
          unitPrice: 45.0,
          amount: 2250.0,
        },
        {
          id: "ITEM002",
          description: "Overtime - 10 hours",
          quantity: 10,
          unit: "Hours",
          unitPrice: 67.5,
          amount: 675.0,
        },
        {
          id: "ITEM003",
          description: "Hazard Pay",
          quantity: 1,
          unit: "Flat",
          unitPrice: 300.0,
          amount: 300.0,
        },
        {
          id: "ITEM004",
          description: "Travel Allowance",
          quantity: 1,
          unit: "Flat",
          unitPrice: 275.0,
          amount: 275.0,
        },
      ],
      subtotal: 3500.0,
      tax: 0.0,
      deductions: 525.0,
      total: 2975.0,
    },
    {
      id: "WG003",
      number: "WG-2023-003",
      date: "2023-07-01",
      reference: "PRJ002-LABOR-JUL",
      vendorName: "Plumbing Crew",
      vendorAddress: "123 Pipe St, Construction City, CC 12345",
      vendorContact: "Michael Chen",
      vendorEmail: "michael.chen@example.com",
      vendorPhone: "(555) 789-0123",
      deliveryDate: "2023-07-01",
      status: "Paid",
      billed: true,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ002",
      project: "Downtown Office Renovation",
      notes: "Plumbing work for the Downtown Office Renovation project.",
      items: [
        {
          id: "ITEM001",
          description: "Plumbing Installation - 30 hours",
          quantity: 30,
          unit: "Hours",
          unitPrice: 40.0,
          amount: 1200.0,
        },
        {
          id: "ITEM002",
          description: "Overtime - 5 hours",
          quantity: 5,
          unit: "Hours",
          unitPrice: 60.0,
          amount: 300.0,
        },
        {
          id: "ITEM003",
          description: "Emergency Call Fee",
          quantity: 1,
          unit: "Flat",
          unitPrice: 250.0,
          amount: 250.0,
        },
        {
          id: "ITEM004",
          description: "Equipment Usage",
          quantity: 1,
          unit: "Flat",
          unitPrice: 350.0,
          amount: 350.0,
        },
      ],
      subtotal: 2100.0,
      tax: 0.0,
      deductions: 315.0,
      total: 1785.0,
    },
    {
      id: "WG004",
      number: "WG-2023-004",
      date: "2023-07-08",
      reference: "PRJ001-LABOR-JUL",
      vendorName: "Finishing Team",
      vendorAddress: "321 Finish Blvd, Construction City, CC 12345",
      vendorContact: "Emily Rodriguez",
      vendorEmail: "emily.rodriguez@example.com",
      vendorPhone: "(555) 234-5678",
      deliveryDate: "2023-07-08",
      status: "Pending",
      billed: false,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ001",
      project: "Riverside Apartments",
      notes: "Interior finishing work for the Riverside Apartments project.",
      items: [
        {
          id: "ITEM001",
          description: "Drywall Installation - 60 hours",
          quantity: 60,
          unit: "Hours",
          unitPrice: 38.0,
          amount: 2280.0,
        },
        {
          id: "ITEM002",
          description: "Painting - 40 hours",
          quantity: 40,
          unit: "Hours",
          unitPrice: 35.0,
          amount: 1400.0,
        },
        {
          id: "ITEM003",
          description: "Overtime - 8 hours",
          quantity: 8,
          unit: "Hours",
          unitPrice: 57.0,
          amount: 456.0,
        },
        {
          id: "ITEM004",
          description: "Quality Bonus",
          quantity: 1,
          unit: "Flat",
          unitPrice: 64.0,
          amount: 64.0,
        },
      ],
      subtotal: 4200.0,
      tax: 0.0,
      deductions: 630.0,
      total: 3570.0,
    },
    {
      id: "WG005",
      number: "WG-2023-005",
      date: "2023-07-15",
      reference: "PRJ004-LABOR-JUL",
      vendorName: "Structure Crew",
      vendorAddress: "567 Beam St, Construction City, CC 12345",
      vendorContact: "David Kim",
      vendorEmail: "david.kim@example.com",
      vendorPhone: "(555) 345-6789",
      deliveryDate: "2023-07-15",
      status: "Paid",
      billed: true,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ004",
      project: "Community Center",
      notes: "Structural work for the Community Center project.",
      items: [
        {
          id: "ITEM001",
          description: "Steel Framing - 80 hours",
          quantity: 80,
          unit: "Hours",
          unitPrice: 42.0,
          amount: 3360.0,
        },
        {
          id: "ITEM002",
          description: "Concrete Work - 40 hours",
          quantity: 40,
          unit: "Hours",
          unitPrice: 40.0,
          amount: 1600.0,
        },
        {
          id: "ITEM003",
          description: "Overtime - 12 hours",
          quantity: 12,
          unit: "Hours",
          unitPrice: 63.0,
          amount: 756.0,
        },
        {
          id: "ITEM004",
          description: "Hazard Pay",
          quantity: 1,
          unit: "Flat",
          unitPrice: 84.0,
          amount: 84.0,
        },
      ],
      subtotal: 5800.0,
      tax: 0.0,
      deductions: 870.0,
      total: 4930.0,
    },
  ]

  return wages.find((wage) => wage.id === id)
}

export default function WagePage({ params }: { params: { id: string } }) {
  const wage = getWage(params.id)

  if (!wage) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/wages">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Wage {wage.number}</h1>
          <Badge variant={wage.status === "Paid" ? "success" : "secondary"}>{wage.status}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          {!wage.billed && (
            <Link href={`/bills/new?from=wage&id=${wage.id}`}>
              <Button>
                <Receipt className="mr-2 h-4 w-4" />
                Convert to Bill
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Wage Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{new Date(wage.date).toLocaleDateString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/projects/${wage.projectId}`} className="text-blue-600 hover:underline">
              {wage.project}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{wage.reference}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Worker Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                <dd>{wage.vendorName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                <dd>{wage.vendorAddress}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd>{wage.vendorEmail}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                <dd>{wage.vendorPhone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Payment Date</dt>
                <dd>{new Date(wage.deliveryDate).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                <dd>
                  <Badge variant={wage.status === "Paid" ? "success" : "secondary"}>{wage.status}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Billing Status</dt>
                <dd>
                  <Badge variant={wage.billed ? "outline" : "destructive"}>{wage.billed ? "Billed" : "Unbilled"}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Company</dt>
                <dd>{wage.companyName}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wage Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Description</th>
                  <th className="p-3 text-center font-medium">Quantity</th>
                  <th className="p-3 text-center font-medium">Unit</th>
                  <th className="p-3 text-right font-medium">Rate</th>
                  <th className="p-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {wage.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.description}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-center">{item.unit}</td>
                    <td className="p-3 text-right">${item.unitPrice.toFixed(2)}</td>
                    <td className="p-3 text-right">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b">
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Subtotal
                  </td>
                  <td className="p-3 text-right">${wage.subtotal.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Tax
                  </td>
                  <td className="p-3 text-right">${wage.tax.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Deductions
                  </td>
                  <td className="p-3 text-right">${wage.deductions.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Total
                  </td>
                  <td className="p-3 text-right font-bold">${wage.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {wage.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{wage.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
