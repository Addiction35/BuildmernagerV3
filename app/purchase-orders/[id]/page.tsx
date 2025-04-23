import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Receipt } from "lucide-react"

export const metadata: Metadata = {
  title: "Purchase Order Details | Construction Management",
  description: "View purchase order details",
}

// This would normally come from a database
const getPurchaseOrder = (id: string) => {
  const purchaseOrders = [
    {
      id: "PO001",
      number: "PO-2023-001",
      date: "2023-06-15",
      reference: "PRJ001-MAT",
      vendorName: "ABC Building Supplies",
      vendorAddress: "123 Builder St, Construction City, CC 12345",
      vendorContact: "John Builder",
      vendorEmail: "john@abcbuilding.com",
      vendorPhone: "(555) 123-4567",
      deliveryDate: "2023-06-30",
      deliveryAddress: "456 Project Ave, Riverside, RS 67890",
      status: "Delivered",
      billed: true,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ001",
      project: "Riverside Apartments",
      notes: "Please deliver all materials to the site manager between 8am and 4pm.",
      items: [
        {
          id: "ITEM001",
          description: "Concrete Mix - High Strength",
          quantity: 50,
          unit: "Bags",
          unitPrice: 12.5,
          amount: 625.0,
        },
        {
          id: "ITEM002",
          description: "Rebar - #4 x 20'",
          quantity: 100,
          unit: "Pieces",
          unitPrice: 18.75,
          amount: 1875.0,
        },
        {
          id: "ITEM003",
          description: "Lumber - 2x4x8' Treated",
          quantity: 200,
          unit: "Pieces",
          unitPrice: 5.25,
          amount: 1050.0,
        },
        {
          id: "ITEM004",
          description: "Plywood - 3/4\" x 4'x8' Exterior",
          quantity: 75,
          unit: "Sheets",
          unitPrice: 42.0,
          amount: 3150.0,
        },
        {
          id: "ITEM005",
          description: "Insulation - R19 Fiberglass",
          quantity: 50,
          unit: "Rolls",
          unitPrice: 35.0,
          amount: 1750.0,
        },
        {
          id: "ITEM006",
          description: "Nails - 16d Common",
          quantity: 25,
          unit: "Boxes",
          unitPrice: 18.0,
          amount: 450.0,
        },
        {
          id: "ITEM007",
          description: 'Screws - 3" Deck',
          quantity: 20,
          unit: "Boxes",
          unitPrice: 24.0,
          amount: 480.0,
        },
        {
          id: "ITEM008",
          description: "Vapor Barrier - 10'x100'",
          quantity: 5,
          unit: "Rolls",
          unitPrice: 85.0,
          amount: 425.0,
        },
        {
          id: "ITEM009",
          description: "Concrete Sealer - 5 Gallon",
          quantity: 10,
          unit: "Buckets",
          unitPrice: 89.5,
          amount: 895.0,
        },
        {
          id: "ITEM010",
          description: "Delivery Fee",
          quantity: 1,
          unit: "Service",
          unitPrice: 250.0,
          amount: 250.0,
        },
      ],
      subtotal: 10950.0,
      tax: 1095.0,
      shipping: 250.0,
      total: 12295.0,
    },
    {
      id: "PO002",
      number: "PO-2023-002",
      date: "2023-07-05",
      reference: "PRJ003-ELE",
      vendorName: "Electric Systems Co.",
      vendorAddress: "789 Circuit Ave, Construction City, CC 12345",
      vendorContact: "Sarah Johnson",
      vendorEmail: "sarah@electricsystems.com",
      vendorPhone: "(555) 234-5678",
      deliveryDate: "2023-07-25",
      deliveryAddress: "123 Hillside Dr, Riverside, RS 67890",
      status: "In Transit",
      billed: false,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ003",
      project: "Hillside Residence",
      notes: "Please call site manager 30 minutes before delivery.",
      items: [
        {
          id: "ITEM001",
          description: "Circuit Breaker Panel - 200A",
          quantity: 2,
          unit: "Units",
          unitPrice: 450.0,
          amount: 900.0,
        },
        {
          id: "ITEM002",
          description: "Romex Wire 12/2 - 250'",
          quantity: 10,
          unit: "Rolls",
          unitPrice: 125.0,
          amount: 1250.0,
        },
        {
          id: "ITEM003",
          description: "Electrical Outlets",
          quantity: 100,
          unit: "Pieces",
          unitPrice: 3.5,
          amount: 350.0,
        },
        {
          id: "ITEM004",
          description: "Light Switches",
          quantity: 50,
          unit: "Pieces",
          unitPrice: 4.0,
          amount: 200.0,
        },
        {
          id: "ITEM005",
          description: "LED Recessed Lights",
          quantity: 75,
          unit: "Units",
          unitPrice: 35.0,
          amount: 2625.0,
        },
        {
          id: "ITEM006",
          description: "Junction Boxes",
          quantity: 50,
          unit: "Pieces",
          unitPrice: 2.5,
          amount: 125.0,
        },
        {
          id: "ITEM007",
          description: "Conduit - 1/2\" x 10'",
          quantity: 100,
          unit: "Pieces",
          unitPrice: 8.5,
          amount: 850.0,
        },
        {
          id: "ITEM008",
          description: "Wire Connectors",
          quantity: 5,
          unit: "Boxes",
          unitPrice: 15.0,
          amount: 75.0,
        },
        {
          id: "ITEM009",
          description: "Electrical Tape",
          quantity: 20,
          unit: "Rolls",
          unitPrice: 3.75,
          amount: 75.0,
        },
        {
          id: "ITEM010",
          description: "Delivery Fee",
          quantity: 1,
          unit: "Service",
          unitPrice: 200.0,
          amount: 200.0,
        },
      ],
      subtotal: 6650.0,
      tax: 665.0,
      shipping: 200.0,
      total: 7515.0,
    },
    {
      id: "PO003",
      number: "PO-2023-003",
      date: "2023-07-12",
      reference: "PRJ002-PLU",
      vendorName: "Modern Plumbing Supplies",
      vendorAddress: "456 Water St, Construction City, CC 12345",
      vendorContact: "Michael Chen",
      vendorEmail: "michael@modernplumbing.com",
      vendorPhone: "(555) 345-6789",
      deliveryDate: "2023-08-05",
      deliveryAddress: "789 Downtown Blvd, Riverside, RS 67890",
      status: "Pending",
      billed: false,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ002",
      project: "Downtown Office Renovation",
      notes: "Delivery must be made during business hours (9am-5pm).",
      items: [
        {
          id: "ITEM001",
          description: "PVC Pipe - 4\" x 10'",
          quantity: 50,
          unit: "Pieces",
          unitPrice: 18.0,
          amount: 900.0,
        },
        {
          id: "ITEM002",
          description: "Copper Pipe - 3/4\" x 10'",
          quantity: 30,
          unit: "Pieces",
          unitPrice: 35.0,
          amount: 1050.0,
        },
        {
          id: "ITEM003",
          description: "PVC Fittings - Assorted",
          quantity: 100,
          unit: "Pieces",
          unitPrice: 2.5,
          amount: 250.0,
        },
        {
          id: "ITEM004",
          description: "Copper Fittings - Assorted",
          quantity: 75,
          unit: "Pieces",
          unitPrice: 4.0,
          amount: 300.0,
        },
        {
          id: "ITEM005",
          description: "Commercial Toilets",
          quantity: 10,
          unit: "Units",
          unitPrice: 175.0,
          amount: 1750.0,
        },
        {
          id: "ITEM006",
          description: "Commercial Sinks",
          quantity: 8,
          unit: "Units",
          unitPrice: 125.0,
          amount: 1000.0,
        },
        {
          id: "ITEM007",
          description: "Pipe Insulation",
          quantity: 50,
          unit: "Pieces",
          unitPrice: 8.0,
          amount: 400.0,
        },
        {
          id: "ITEM008",
          description: "Pipe Hangers",
          quantity: 200,
          unit: "Pieces",
          unitPrice: 1.25,
          amount: 250.0,
        },
        {
          id: "ITEM009",
          description: "Plumbing Tape",
          quantity: 30,
          unit: "Rolls",
          unitPrice: 3.0,
          amount: 90.0,
        },
        {
          id: "ITEM010",
          description: "Delivery Fee",
          quantity: 1,
          unit: "Service",
          unitPrice: 150.0,
          amount: 150.0,
        },
      ],
      subtotal: 6140.0,
      tax: 614.0,
      shipping: 150.0,
      total: 6904.0,
    },
    {
      id: "PO004",
      number: "PO-2023-004",
      date: "2023-08-01",
      reference: "PRJ001-FIN",
      vendorName: "Quality Finishes Ltd.",
      vendorAddress: "321 Texture Ave, Construction City, CC 12345",
      vendorContact: "Emily Rodriguez",
      vendorEmail: "emily@qualityfinishes.com",
      vendorPhone: "(555) 456-7890",
      deliveryDate: "2023-08-20",
      deliveryAddress: "456 Project Ave, Riverside, RS 67890",
      status: "Delivered",
      billed: true,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ001",
      project: "Riverside Apartments",
      notes: "Fragile materials - handle with care.",
      items: [
        {
          id: "ITEM001",
          description: "Drywall - 4'x8' Sheets",
          quantity: 200,
          unit: "Sheets",
          unitPrice: 15.0,
          amount: 3000.0,
        },
        {
          id: "ITEM002",
          description: "Joint Compound - 5 Gallon",
          quantity: 30,
          unit: "Buckets",
          unitPrice: 25.0,
          amount: 750.0,
        },
        {
          id: "ITEM003",
          description: "Drywall Tape - 500'",
          quantity: 20,
          unit: "Rolls",
          unitPrice: 5.0,
          amount: 100.0,
        },
        {
          id: "ITEM004",
          description: "Interior Paint - 5 Gallon",
          quantity: 50,
          unit: "Buckets",
          unitPrice: 120.0,
          amount: 6000.0,
        },
        {
          id: "ITEM005",
          description: "Primer - 5 Gallon",
          quantity: 25,
          unit: "Buckets",
          unitPrice: 85.0,
          amount: 2125.0,
        },
        {
          id: "ITEM006",
          description: "Paint Brushes - Assorted",
          quantity: 50,
          unit: "Sets",
          unitPrice: 15.0,
          amount: 750.0,
        },
        {
          id: "ITEM007",
          description: "Paint Rollers",
          quantity: 30,
          unit: "Sets",
          unitPrice: 12.0,
          amount: 360.0,
        },
        {
          id: "ITEM008",
          description: "Drop Cloths",
          quantity: 40,
          unit: "Pieces",
          unitPrice: 8.0,
          amount: 320.0,
        },
        {
          id: "ITEM009",
          description: "Texture Spray",
          quantity: 25,
          unit: "Cans",
          unitPrice: 18.0,
          amount: 450.0,
        },
        {
          id: "ITEM010",
          description: "Delivery Fee",
          quantity: 1,
          unit: "Service",
          unitPrice: 300.0,
          amount: 300.0,
        },
      ],
      subtotal: 14155.0,
      tax: 1415.5,
      shipping: 300.0,
      total: 15870.5,
    },
    {
      id: "PO005",
      number: "PO-2023-005",
      date: "2023-08-10",
      reference: "PRJ004-STR",
      vendorName: "Structural Materials Inc.",
      vendorAddress: "987 Steel Rd, Construction City, CC 12345",
      vendorContact: "David Kim",
      vendorEmail: "david@structuralmaterials.com",
      vendorPhone: "(555) 567-8901",
      deliveryDate: "2023-09-05",
      deliveryAddress: "654 Community Way, Riverside, RS 67890",
      status: "In Transit",
      billed: false,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ004",
      project: "Community Center",
      notes: "Heavy materials - crane required for unloading.",
      items: [
        {
          id: "ITEM001",
          description: 'Steel Beams - I-Beam 8"',
          quantity: 30,
          unit: "Pieces",
          unitPrice: 350.0,
          amount: 10500.0,
        },
        {
          id: "ITEM002",
          description: "Steel Columns - 10'",
          quantity: 20,
          unit: "Pieces",
          unitPrice: 275.0,
          amount: 5500.0,
        },
        {
          id: "ITEM003",
          description: 'Anchor Bolts - 1"',
          quantity: 200,
          unit: "Pieces",
          unitPrice: 3.5,
          amount: 700.0,
        },
        {
          id: "ITEM004",
          description: "Steel Plates - 1/2\" x 4'x8'",
          quantity: 15,
          unit: "Sheets",
          unitPrice: 225.0,
          amount: 3375.0,
        },
        {
          id: "ITEM005",
          description: "Welding Rods",
          quantity: 10,
          unit: "Boxes",
          unitPrice: 45.0,
          amount: 450.0,
        },
        {
          id: "ITEM006",
          description: "Structural Bolts - Assorted",
          quantity: 500,
          unit: "Pieces",
          unitPrice: 1.25,
          amount: 625.0,
        },
        {
          id: "ITEM007",
          description: 'Steel Angles - 2"x2"x10\'',
          quantity: 40,
          unit: "Pieces",
          unitPrice: 35.0,
          amount: 1400.0,
        },
        {
          id: "ITEM008",
          description: "Steel Channels - 6\"x10'",
          quantity: 25,
          unit: "Pieces",
          unitPrice: 125.0,
          amount: 3125.0,
        },
        {
          id: "ITEM009",
          description: "Crane Rental",
          quantity: 1,
          unit: "Day",
          unitPrice: 1200.0,
          amount: 1200.0,
        },
        {
          id: "ITEM010",
          description: "Delivery Fee",
          quantity: 1,
          unit: "Service",
          unitPrice: 500.0,
          amount: 500.0,
        },
      ],
      subtotal: 27375.0,
      tax: 2737.5,
      shipping: 500.0,
      total: 30612.5,
    },
  ]

  return purchaseOrders.find((po) => po.id === id)
}

export default function PurchaseOrderPage({ params }: { params: { id: string } }) {
  const purchaseOrder = getPurchaseOrder(params.id)

  if (!purchaseOrder) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/purchase-orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Order {purchaseOrder.number}</h1>
          <Badge
            variant={
              purchaseOrder.status === "Delivered"
                ? "success"
                : purchaseOrder.status === "In Transit"
                  ? "default"
                  : "secondary"
            }
          >
            {purchaseOrder.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          {!purchaseOrder.billed && (
            <Link href={`/bills/new?from=po&id=${purchaseOrder.id}`}>
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
            <CardTitle className="text-sm font-medium">Purchase Order Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{new Date(purchaseOrder.date).toLocaleDateString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/projects/${purchaseOrder.projectId}`} className="text-blue-600 hover:underline">
              {purchaseOrder.project}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{purchaseOrder.reference}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                <dd>{purchaseOrder.vendorName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                <dd>{purchaseOrder.vendorAddress}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Contact</dt>
                <dd>{purchaseOrder.vendorContact}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd>{purchaseOrder.vendorEmail}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                <dd>{purchaseOrder.vendorPhone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Delivery Date</dt>
                <dd>{new Date(purchaseOrder.deliveryDate).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Delivery Address</dt>
                <dd>{purchaseOrder.deliveryAddress}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                <dd>
                  <Badge
                    variant={
                      purchaseOrder.status === "Delivered"
                        ? "success"
                        : purchaseOrder.status === "In Transit"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {purchaseOrder.status}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Billing Status</dt>
                <dd>
                  <Badge variant={purchaseOrder.billed ? "outline" : "destructive"}>
                    {purchaseOrder.billed ? "Billed" : "Unbilled"}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Company</dt>
                <dd>{purchaseOrder.companyName}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Description</th>
                  <th className="p-3 text-center font-medium">Quantity</th>
                  <th className="p-3 text-center font-medium">Unit</th>
                  <th className="p-3 text-right font-medium">Unit Price</th>
                  <th className="p-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrder.items.map((item) => (
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
                  <td className="p-3 text-right">${purchaseOrder.subtotal.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Tax
                  </td>
                  <td className="p-3 text-right">${purchaseOrder.tax.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Shipping
                  </td>
                  <td className="p-3 text-right">${purchaseOrder.shipping.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Total
                  </td>
                  <td className="p-3 text-right font-bold">${purchaseOrder.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {purchaseOrder.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{purchaseOrder.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
