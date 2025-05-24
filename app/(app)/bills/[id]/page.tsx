import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BillDetails } from "@/components/bills/bill-details"
import { BillPaymentHistory } from "@/components/bills/bill-payment-history"
import { ArrowLeft, Edit, Trash2, Download, Send } from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  return {
    title: `Bill ${id} | Construction Management`,
    description: `View and manage bill ${id}`,
  }
}

export default async function BillPage({ params }: Props) {
  const { id } = await params

  // In a real app, you would fetch the bill data here
  const bill = {
    id,
    billNumber: "BILL-2024-001",
    vendor: "Steel Supply Co.",
    project: "Downtown Office Complex",
    projectId: "PRJ001",
    amount: 45000,
    paidAmount: 0,
    remainingAmount: 45000,
    date: "2024-01-15",
    dueDate: "2024-02-15",
    status: "pending" as const,
    description:
      "Steel beams and structural materials for foundation work. Includes delivery and installation support.",
    items: [
      { description: "Steel I-Beams (20ft)", quantity: 15, unitPrice: 1200, total: 18000 },
      { description: "Steel Columns", quantity: 8, unitPrice: 2000, total: 16000 },
      { description: "Reinforcement Bars", quantity: 100, unitPrice: 50, total: 5000 },
      { description: "Delivery & Handling", quantity: 1, unitPrice: 3000, total: 3000 },
      { description: "Installation Support", quantity: 1, unitPrice: 3000, total: 3000 },
    ],
    vendorDetails: {
      name: "Steel Supply Co.",
      address: "123 Industrial Ave, Construction City, CC 12345",
      phone: "(555) 123-4567",
      email: "billing@steelsupply.com",
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/bills">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bills
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{bill.billNumber}</h1>
          <p className="text-muted-foreground">
            {bill.vendor} • {bill.project}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(bill.status)}>
            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Link href={`/bills/${id}/edit`}>
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
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${bill.amount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${bill.paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {bill.amount > 0 ? ((bill.paidAmount / bill.amount) * 100).toFixed(1) : 0}% paid
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${bill.remainingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {bill.amount > 0 ? ((bill.remainingAmount / bill.amount) * 100).toFixed(1) : 0}% remaining
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(bill.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.ceil((new Date(bill.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BillDetails bill={bill} />
        <BillPaymentHistory billId={id} />
      </div>
    </div>
  )
}
