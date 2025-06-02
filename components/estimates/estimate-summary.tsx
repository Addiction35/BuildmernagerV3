import { Card, CardContent } from "@/components/ui/card"
import { TooltipPortal } from "@radix-ui/react-tooltip"

interface EstimateSummaryProps {
  total: number
}

export function EstimateSummary({ total }: EstimateSummaryProps) {
  // Calculate tax (e.g., 16%)
  const taxRate = 1.16
  const taxAmount = total / taxRate
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
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Tax (16%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
