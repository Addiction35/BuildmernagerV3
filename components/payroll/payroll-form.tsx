"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Calculator, Download } from "lucide-react"

interface CustomDeduction {
  id: string
  name: string
  amount: number
  isPercentage: boolean
}

interface PayslipData {
  employeeName: string
  date: string
  grossPay: number
  allowanceDeductions: number
  personalRelief: number
  preparedBy: string
}

interface DeductionRates {
  paye: number
  nssfTier1: number
  nssfTier2: number
  shif: number
  housingLevy: number
}

export default function PayslipCalculator() {
  const [isPayslipGenerated, setIsPayslipGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [payslipData, setPayslipData] = useState<PayslipData>({
    employeeName: "Jamiil Abdulfattah Ahmed",
    date: "3rd March 2025",
    grossPay: 65883.5,
    allowanceDeductions: 6753.0,
    personalRelief: 2400.0,
    preparedBy: "Adam maalim",
  })

  const [deductionRates, setDeductionRates] = useState<DeductionRates>({
    paye: 15.37, // percentage
    nssfTier1: 480, // fixed amount
    nssfTier2: 5.27, // percentage
    shif: 2.75, // percentage
    housingLevy: 1.5, // percentage
  })

  const [customDeductions, setCustomDeductions] = useState<CustomDeduction[]>([])
  const [newDeduction, setNewDeduction] = useState({ name: "", amount: 0, isPercentage: true })

  // Calculated values
  const [calculations, setCalculations] = useState({
    taxablePay: 0,
    paye: 0,
    nssfTier1: 0,
    nssfTier2: 0,
    shif: 0,
    housingLevy: 0,
    customTotal: 0,
    totalDeductions: 0,
    netPay: 0,
  })

  useEffect(() => {
    calculatePayslip()
    // Reset payslip if it was generated and data changes
    if (isPayslipGenerated) {
      setIsPayslipGenerated(false)
    }
  }, [payslipData, deductionRates, customDeductions])

  const calculatePayslip = () => {
    const { grossPay, allowanceDeductions, personalRelief } = payslipData
    const taxablePay = grossPay - allowanceDeductions

    // Calculate standard deductions
    const paye = Math.max(0, (taxablePay * deductionRates.paye) / 100 - personalRelief)
    const nssfTier1 = deductionRates.nssfTier1 // Fixed amount
    const nssfTier2 = (grossPay * deductionRates.nssfTier2) / 100
    const shif = (grossPay * deductionRates.shif) / 100
    const housingLevy = (grossPay * deductionRates.housingLevy) / 100

    // Calculate custom deductions
    const customTotal = customDeductions.reduce((total, deduction) => {
      return total + (deduction.isPercentage ? (grossPay * deduction.amount) / 100 : deduction.amount)
    }, 0)

    const totalDeductions = paye + nssfTier1 + nssfTier2 + shif + housingLevy + customTotal
    const netPay = grossPay - totalDeductions

    setCalculations({
      taxablePay,
      paye,
      nssfTier1,
      nssfTier2,
      shif,
      housingLevy,
      customTotal,
      totalDeductions,
      netPay,
    })
  }

  const addCustomDeduction = () => {
    if (newDeduction.name && newDeduction.amount > 0) {
      const deduction: CustomDeduction = {
        id: Date.now().toString(),
        name: newDeduction.name,
        amount: newDeduction.amount,
        isPercentage: newDeduction.isPercentage,
      }
      setCustomDeductions([...customDeductions, deduction])
      setNewDeduction({ name: "", amount: 0, isPercentage: true })
    }
  }

  const removeCustomDeduction = (id: string) => {
    setCustomDeductions(customDeductions.filter((d) => d.id !== id))
  }

  const generatePayslip = async () => {
    setIsGenerating(true)
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsPayslipGenerated(true)
    setIsGenerating(false)
  }

  const downloadPDF = async () => {
    const element = document.getElementById("payslip-content")
    if (!element) return

    // Dynamically import html2pdf
    const html2pdf = (await import("html2pdf.js")).default

    const opt = {
      margin: 1,
      filename: `payslip-${payslipData.employeeName.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    html2pdf().set(opt).from(element).save()
  }

  const resetPayslip = () => {
    setIsPayslipGenerated(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const printPayslip = () => {
    window.print()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Payslip Calculator</h1>
        <p className="text-muted-foreground">Calculate employee payslips with customizable deductions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  value={payslipData.employeeName}
                  onChange={(e) => setPayslipData({ ...payslipData, employeeName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={payslipData.date}
                  onChange={(e) => setPayslipData({ ...payslipData, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="grossPay">Gross Pay (KES)</Label>
                <Input
                  id="grossPay"
                  type="number"
                  step="0.01"
                  value={payslipData.grossPay}
                  onChange={(e) => setPayslipData({ ...payslipData, grossPay: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="allowanceDeductions">Allowance Deductions (KES)</Label>
                <Input
                  id="allowanceDeductions"
                  type="number"
                  step="0.01"
                  value={payslipData.allowanceDeductions}
                  onChange={(e) =>
                    setPayslipData({ ...payslipData, allowanceDeductions: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="personalRelief">Personal Relief (KES)</Label>
                <Input
                  id="personalRelief"
                  type="number"
                  step="0.01"
                  value={payslipData.personalRelief}
                  onChange={(e) =>
                    setPayslipData({ ...payslipData, personalRelief: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="preparedBy">Prepared By</Label>
                <Input
                  id="preparedBy"
                  value={payslipData.preparedBy}
                  onChange={(e) => setPayslipData({ ...payslipData, preparedBy: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deduction Rates</CardTitle>
              <CardDescription>Customize deduction percentages and amounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paye">PAYE (%)</Label>
                <Input
                  id="paye"
                  type="number"
                  step="0.01"
                  value={deductionRates.paye}
                  onChange={(e) =>
                    setDeductionRates({ ...deductionRates, paye: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="nssfTier1">NSSF Tier I (Fixed Amount KES)</Label>
                <Input
                  id="nssfTier1"
                  type="number"
                  step="0.01"
                  value={deductionRates.nssfTier1}
                  onChange={(e) =>
                    setDeductionRates({ ...deductionRates, nssfTier1: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="nssfTier2">NSSF Tier II (%)</Label>
                <Input
                  id="nssfTier2"
                  type="number"
                  step="0.01"
                  value={deductionRates.nssfTier2}
                  onChange={(e) =>
                    setDeductionRates({ ...deductionRates, nssfTier2: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="shif">SHIF (%)</Label>
                <Input
                  id="shif"
                  type="number"
                  step="0.01"
                  value={deductionRates.shif}
                  onChange={(e) =>
                    setDeductionRates({ ...deductionRates, shif: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="housingLevy">Housing Levy (%)</Label>
                <Input
                  id="housingLevy"
                  type="number"
                  step="0.01"
                  value={deductionRates.housingLevy}
                  onChange={(e) =>
                    setDeductionRates({ ...deductionRates, housingLevy: Number.parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Deductions</CardTitle>
              <CardDescription>Add additional deductions as needed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Deduction name"
                  value={newDeduction.name}
                  onChange={(e) => setNewDeduction({ ...newDeduction, name: e.target.value })}
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  value={newDeduction.amount}
                  onChange={(e) => setNewDeduction({ ...newDeduction, amount: Number.parseFloat(e.target.value) || 0 })}
                />
                <select
                  className="px-3 py-2 border rounded-md"
                  value={newDeduction.isPercentage ? "percentage" : "fixed"}
                  onChange={(e) => setNewDeduction({ ...newDeduction, isPercentage: e.target.value === "percentage" })}
                >
                  <option value="percentage">%</option>
                  <option value="fixed">KES</option>
                </select>
                <Button onClick={addCustomDeduction} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {customDeductions.map((deduction) => (
                <div key={deduction.id} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span>{deduction.name}</span>
                  <div className="flex items-center gap-2">
                    <span>
                      {deduction.isPercentage ? `${deduction.amount}%` : `KES ${formatCurrency(deduction.amount)}`}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => removeCustomDeduction(deduction.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Payslip Display */}
        <div>
          {!isPayslipGenerated ? (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Generate Payslip</CardTitle>
                <CardDescription>
                  Fill in the employee information and deductions, then generate the payslip
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-6">Your payslip will appear here once generated</p>
                  <Button
                    onClick={generatePayslip}
                    disabled={isGenerating || !payslipData.employeeName || payslipData.grossPay <= 0}
                    size="lg"
                  >
                    {isGenerating ? "Generating..." : "Generate Payslip"}
                  </Button>
                </div>

                {/* Preview of current calculations */}
                <div className="text-left space-y-2 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold">Quick Preview:</h4>
                  <div className="flex justify-between text-sm">
                    <span>Gross Pay:</span>
                    <span>KES {formatCurrency(payslipData.grossPay)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Deductions:</span>
                    <span>KES {formatCurrency(calculations.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Net Pay:</span>
                    <span>KES {formatCurrency(calculations.netPay)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="print:shadow-none">
              <CardHeader className="text-center print:hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm font-medium">Payslip Generated Successfully</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetPayslip}>
                    Edit Details
                  </Button>
                </div>
              </CardHeader>

              <div id="payslip-content">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">PAYSLIP 2025</CardTitle>
                  <CardDescription className="text-lg">{payslipData.date}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{payslipData.employeeName}</h2>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Gross Pay</span>
                      <span className="font-mono">KES {formatCurrency(payslipData.grossPay)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">Deductions:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>PAYE</span>
                        <span className="font-mono">{formatCurrency(calculations.paye)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NSSF Tier I</span>
                        <span className="font-mono">{formatCurrency(calculations.nssfTier1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NSSF Tier II</span>
                        <span className="font-mono">{formatCurrency(calculations.nssfTier2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SHIF</span>
                        <span className="font-mono">{formatCurrency(calculations.shif)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Housing Levy</span>
                        <span className="font-mono">{formatCurrency(calculations.housingLevy)}</span>
                      </div>

                      {customDeductions.map((deduction) => (
                        <div key={deduction.id} className="flex justify-between">
                          <span>{deduction.name}</span>
                          <span className="font-mono">
                            {formatCurrency(
                              deduction.isPercentage
                                ? (payslipData.grossPay * deduction.amount) / 100
                                : deduction.amount,
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Deductions</span>
                    <span className="font-mono">{formatCurrency(calculations.totalDeductions)}</span>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold bg-primary/10 p-3 rounded">
                    <span>Net Pay</span>
                    <span className="font-mono">KES {formatCurrency(calculations.netPay)}</span>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">PAYE Information:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Gross Pay</span>
                        <span className="font-mono">{formatCurrency(payslipData.grossPay)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Allowance Deductions</span>
                        <span className="font-mono">{formatCurrency(payslipData.allowanceDeductions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Pay</span>
                        <span className="font-mono">{formatCurrency(calculations.taxablePay)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Relief</span>
                        <span className="font-mono">{formatCurrency(payslipData.personalRelief)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground pt-4">
                    <p>Prepared by: {payslipData.preparedBy}</p>
                  </div>
                </CardContent>
              </div>

              <CardContent className="print:hidden pt-0">
                <div className="flex gap-2">
                  <Button onClick={() => window.print()} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button onClick={downloadPDF} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
