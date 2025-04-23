import { Card, CardContent } from "@/components/ui/card"

interface EstimateSummaryProps {
  total: number
}

export function EstimateSummary({ total }: EstimateSummaryProps) {
  // Calculate tax (e.g., 10%)
  const taxRate = 0.1
  const taxAmount = total * taxRate

  // Calculate grand total
  const grandTotal = total + taxAmount

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Estimate Summary</h3>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Tax (10%)</span>
              <span>${taxAmount.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
