import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export function BillsSummary() {
  const summaryData = {
    totalBills: 24,
    totalAmount: 125000,
    paidAmount: 85000,
    pendingAmount: 30000,
    overdueAmount: 10000,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summaryData.totalBills}</div>
          <p className="text-xs text-muted-foreground">${summaryData.totalAmount.toLocaleString()} total value</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summaryData.paidAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {((summaryData.paidAmount / summaryData.totalAmount) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summaryData.pendingAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {((summaryData.pendingAmount / summaryData.totalAmount) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summaryData.overdueAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {((summaryData.overdueAmount / summaryData.totalAmount) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
