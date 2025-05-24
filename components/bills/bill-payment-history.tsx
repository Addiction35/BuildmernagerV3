import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus } from "lucide-react"

interface BillPaymentHistoryProps {
  billId: string
}

export function BillPaymentHistory({ billId }: BillPaymentHistoryProps) {
  const payments = [
    {
      id: "1",
      date: "2024-01-20",
      amount: 15000,
      method: "Bank Transfer",
      reference: "TXN-001234",
      status: "completed",
      notes: "Partial payment for materials",
    },
    {
      id: "2",
      date: "2024-02-01",
      amount: 20000,
      method: "Check",
      reference: "CHK-5678",
      status: "completed",
      notes: "Second installment",
    },
    {
      id: "3",
      date: "2024-02-10",
      amount: 10000,
      method: "Bank Transfer",
      reference: "TXN-001567",
      status: "pending",
      notes: "Final payment scheduled",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalPaid = payments
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Track all payments for this bill</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Total Paid:</span>
            <span className="text-lg font-bold">${totalPaid.toLocaleString()}</span>
          </div>

          {payments.length > 0 ? (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">${payment.amount.toLocaleString()}</span>
                      <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</div>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method:</span>
                      <span>{payment.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference:</span>
                      <span className="font-mono">{payment.reference}</span>
                    </div>
                    {payment.notes && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Notes:</span>
                        <span>{payment.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No payments recorded yet</p>
              <p className="text-sm">Add a payment to track bill progress</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
