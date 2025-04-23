import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Receipt } from "lucide-react"

export const metadata: Metadata = {
  title: "Expense Details | Construction Management",
  description: "View expense details",
}

// Update the getExpense function to include data for all expense IDs

const getExpense = (id: string) => {
  const expenses = [
    {
      id: "EXP001",
      number: "EXP-2023-001",
      date: "2023-06-10",
      reference: "PRJ001-SITE",
      vendorName: "City Permits Office",
      vendorAddress: "100 City Hall Plaza, Construction City, CC 12345",
      vendorContact: "Permit Department",
      vendorEmail: "permits@constructioncity.gov",
      vendorPhone: "(555) 234-5678",
      deliveryDate: "2023-06-10",
      status: "Approved",
      billed: true,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ001",
      project: "Riverside Apartments",
      notes: "Building permits for the Riverside Apartments project.",
      expenseType: "Permits & Fees",
      paymentMethod: "Company Credit Card",
      receiptNumber: "CITY-23456",
      items: [
        {
          id: "ITEM001",
          description: "Building Permit Application Fee",
          quantity: 1,
          unit: "Fee",
          unitPrice: 500.0,
          amount: 500.0,
        },
        {
          id: "ITEM002",
          description: "Plan Review Fee",
          quantity: 1,
          unit: "Fee",
          unitPrice: 350.0,
          amount: 350.0,
        },
        {
          id: "ITEM003",
          description: "Impact Fee",
          quantity: 1,
          unit: "Fee",
          unitPrice: 250.0,
          amount: 250.0,
        },
        {
          id: "ITEM004",
          description: "Processing Fee",
          quantity: 1,
          unit: "Fee",
          unitPrice: 100.0,
          amount: 100.0,
        },
      ],
      subtotal: 1200.0,
      tax: 0.0,
      total: 1200.0,
    },
    {
      id: "EXP002",
      number: "EXP-2023-002",
      date: "2023-06-15",
      reference: "PRJ003-UTIL",
      vendorName: "City Utilities",
      vendorAddress: "200 Utility Way, Construction City, CC 12345",
      vendorContact: "Billing Department",
      vendorEmail: "billing@cityutilities.com",
      vendorPhone: "(555) 987-6543",
      deliveryDate: "2023-06-15",
      status: "Pending",
      billed: false,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ003",
      project: "Hillside Residence",
      notes: "Utility connection fees for the Hillside Residence project.",
      expenseType: "Utilities",
      paymentMethod: "Company Check",
      receiptNumber: "UTIL-78901",
      items: [
        {
          id: "ITEM001",
          description: "Water Connection Fee",
          quantity: 1,
          unit: "Fee",
          unitPrice: 350.0,
          amount: 350.0,
        },
        {
          id: "ITEM002",
          description: "Sewer Connection Fee",
          quantity: 1,
          unit: "Fee",
          unitPrice: 300.0,
          amount: 300.0,
        },
        {
          id: "ITEM003",
          description: "Electrical Inspection",
          quantity: 1,
          unit: "Fee",
          unitPrice: 200.0,
          amount: 200.0,
        },
      ],
      subtotal: 850.0,
      tax: 0.0,
      total: 850.0,
    },
    {
      id: "EXP003",
      number: "EXP-2023-003",
      date: "2023-07-01",
      reference: "PRJ002-EQUIP",
      vendorName: "Equipment Rentals Inc.",
      vendorAddress: "500 Industrial Blvd, Construction City, CC 12345",
      vendorContact: "Rental Department",
      vendorEmail: "rentals@equipmentrentals.com",
      vendorPhone: "(555) 456-7890",
      deliveryDate: "2023-07-01",
      status: "Approved",
      billed: true,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ002",
      project: "Downtown Office Renovation",
      notes: "Heavy equipment rental for the Downtown Office Renovation project.",
      expenseType: "Equipment Rental",
      paymentMethod: "Company Credit Card",
      receiptNumber: "RENT-34567",
      items: [
        {
          id: "ITEM001",
          description: "Excavator Rental - 5 days",
          quantity: 5,
          unit: "Day",
          unitPrice: 350.0,
          amount: 1750.0,
        },
        {
          id: "ITEM002",
          description: "Concrete Mixer Rental - 3 days",
          quantity: 3,
          unit: "Day",
          unitPrice: 200.0,
          amount: 600.0,
        },
        {
          id: "ITEM003",
          description: "Delivery Fee",
          quantity: 1,
          unit: "Fee",
          unitPrice: 250.0,
          amount: 250.0,
        },
        {
          id: "ITEM004",
          description: "Insurance",
          quantity: 1,
          unit: "Fee",
          unitPrice: 600.0,
          amount: 600.0,
        },
      ],
      subtotal: 3200.0,
      tax: 0.0,
      total: 3200.0,
    },
    {
      id: "EXP004",
      number: "EXP-2023-004",
      date: "2023-07-08",
      reference: "PRJ001-TRAV",
      vendorName: "Travel Expenses",
      vendorAddress: "N/A",
      vendorContact: "Internal",
      vendorEmail: "accounting@constructpro.com",
      vendorPhone: "(555) 123-4567",
      deliveryDate: "2023-07-08",
      status: "Pending",
      billed: false,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ001",
      project: "Riverside Apartments",
      notes: "Travel expenses for site visits to the Riverside Apartments project.",
      expenseType: "Travel",
      paymentMethod: "Employee Reimbursement",
      receiptNumber: "TRAV-12345",
      items: [
        {
          id: "ITEM001",
          description: "Airfare",
          quantity: 2,
          unit: "Ticket",
          unitPrice: 250.0,
          amount: 500.0,
        },
        {
          id: "ITEM002",
          description: "Hotel - 2 nights",
          quantity: 2,
          unit: "Night",
          unitPrice: 120.0,
          amount: 240.0,
        },
        {
          id: "ITEM003",
          description: "Meals",
          quantity: 1,
          unit: "Allowance",
          unitPrice: 40.0,
          amount: 40.0,
        },
      ],
      subtotal: 780.0,
      tax: 0.0,
      total: 780.0,
    },
    {
      id: "EXP005",
      number: "EXP-2023-005",
      date: "2023-07-15",
      reference: "PRJ004-INSP",
      vendorName: "Building Inspector",
      vendorAddress: "300 Government Center, Construction City, CC 12345",
      vendorContact: "Inspection Department",
      vendorEmail: "inspections@constructioncity.gov",
      vendorPhone: "(555) 345-6789",
      deliveryDate: "2023-07-15",
      status: "Approved",
      billed: true,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ004",
      project: "Community Center",
      notes: "Building inspection fees for the Community Center project.",
      expenseType: "Inspections",
      paymentMethod: "Company Check",
      receiptNumber: "INSP-56789",
      items: [
        {
          id: "ITEM001",
          description: "Structural Inspection",
          quantity: 1,
          unit: "Fee",
          unitPrice: 200.0,
          amount: 200.0,
        },
        {
          id: "ITEM002",
          description: "Electrical Inspection",
          quantity: 1,
          unit: "Fee",
          unitPrice: 150.0,
          amount: 150.0,
        },
        {
          id: "ITEM003",
          description: "Plumbing Inspection",
          quantity: 1,
          unit: "Fee",
          unitPrice: 150.0,
          amount: 150.0,
        },
      ],
      subtotal: 500.0,
      tax: 0.0,
      total: 500.0,
    },
    {
      id: "EXP006",
      number: "EXP-2023-006",
      date: "2023-07-22",
      reference: "PRJ005-TOOL",
      vendorName: "Tools Supply Co.",
      vendorAddress: "400 Industrial Park, Construction City, CC 12345",
      vendorContact: "Sales Department",
      vendorEmail: "sales@toolssupply.com",
      vendorPhone: "(555) 567-8901",
      deliveryDate: "2023-07-22",
      status: "Rejected",
      billed: false,
      companyName: "ConstructPro, Inc.",
      projectId: "PRJ005",
      project: "Retail Store Fitout",
      notes: "Tools and equipment purchase for the Retail Store Fitout project. Rejected due to incorrect pricing.",
      expenseType: "Tools & Equipment",
      paymentMethod: "Purchase Order",
      receiptNumber: "TOOL-90123",
      items: [
        {
          id: "ITEM001",
          description: "Power Tools Set",
          quantity: 2,
          unit: "Set",
          unitPrice: 450.0,
          amount: 900.0,
        },
        {
          id: "ITEM002",
          description: "Hand Tools Kit",
          quantity: 3,
          unit: "Kit",
          unitPrice: 150.0,
          amount: 450.0,
        },
        {
          id: "ITEM003",
          description: "Safety Equipment",
          quantity: 1,
          unit: "Set",
          unitPrice: 100.0,
          amount: 100.0,
        },
      ],
      subtotal: 1450.0,
      tax: 0.0,
      total: 1450.0,
    },
  ]

  return expenses.find((expense) => expense.id === id)
}

export default function ExpensePage({ params }: { params: { id: string } }) {
  const expense = getExpense(params.id)

  if (!expense) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/expenses">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Expense {expense.number}</h1>
          <Badge
            variant={
              expense.status === "Approved"
                ? "success"
                : expense.status === "Pending"
                  ? "default"
                  : expense.status === "Rejected"
                    ? "destructive"
                    : "secondary"
            }
          >
            {expense.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          {!expense.billed && expense.status === "Approved" && (
            <Link href={`/bills/new?from=expense&id=${expense.id}`}>
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
            <CardTitle className="text-sm font-medium">Expense Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{new Date(expense.date).toLocaleDateString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/projects/${expense.projectId}`} className="text-blue-600 hover:underline">
              {expense.project}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{expense.reference}</div>
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
                <dd>{expense.vendorName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                <dd>{expense.vendorAddress}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Contact</dt>
                <dd>{expense.vendorContact}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd>{expense.vendorEmail}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                <dd>{expense.vendorPhone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Expense Type</dt>
                <dd>{expense.expenseType}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Payment Method</dt>
                <dd>{expense.paymentMethod}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Receipt Number</dt>
                <dd>{expense.receiptNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                <dd>
                  <Badge
                    variant={
                      expense.status === "Approved"
                        ? "success"
                        : expense.status === "Pending"
                          ? "default"
                          : expense.status === "Rejected"
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {expense.status}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Billing Status</dt>
                <dd>
                  <Badge variant={expense.billed ? "outline" : "destructive"}>
                    {expense.billed ? "Billed" : "Unbilled"}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Company</dt>
                <dd>{expense.companyName}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Items</CardTitle>
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
                {expense.items.map((item) => (
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
                  <td className="p-3 text-right">${expense.subtotal.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Tax
                  </td>
                  <td className="p-3 text-right">${expense.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3 text-right font-medium">
                    Total
                  </td>
                  <td className="p-3 text-right font-bold">${expense.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {expense.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{expense.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
