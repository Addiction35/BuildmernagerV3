// app/payslips/[id]/page.tsx
"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { use } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge" // if not present, replace with a small styled <span>
import { toast } from "sonner"
import { fetchPayslipById } from "@/lib/api/payroll"
import axiosInstance from "@/lib/axios"


type Payslip = {
  _id: string
  employeeName: string
  date: string
  grossPay: number
  allowanceDeductions: number
  personalRelief: number
  preparedBy: string
  projectId?: { _id: string; name: string; actualSpent: number; value: number }
  status: "approved" | "draft" | "final" | string
  calculations: {
    taxablePay: number
    paye: number
    nssfTier1: number
    nssfTier2: number
    shif: number
    housingLevy: number
    customTotal: number
    totalDeductions: number
    netPay: number
  }
  createdAt: string
  updatedAt: string
}

const currency = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 2,
})

function fmt(n?: number) {
  if (typeof n !== "number") return "-"
  return currency.format(n)
}

function fmtDate(d?: string) {
  if (!d) return "-"
  const dt = new Date(d)
  return dt.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const pdfUrl = (id: string) => `/pay-slip/${id}/pdf` 

export default function PayslipViewPage({ params }: { params: { id: string } }) {
  const { id } = use(params)
  const router = useRouter()

  const { data: payslip, isLoading, error } = useQuery<Payslip>({
    queryKey: ["payslip", id],
    queryFn: () => fetchPayslipById(id),
    enabled: !!id,
  })

const handleDownload = async () => {
  try {
    const res = await axiosInstance.get(pdfUrl(id), {
      responseType: "blob", // important for binary data
    });

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    const emp = payslip?.employeeName?.replace(/\s+/g, "_") || "Employee";
    const dt = payslip?.date || "date";

    a.href = url;
    a.download = `Payslip_${emp}_${dt}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  } catch (e: any) {
    toast.error(e?.message || "Download failed");
  }
};

const handlePrint = async () => {
  try {
    const response = await axiosInstance.get(pdfUrl(id), { responseType: "blob" });
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank")?.focus();
  } catch (e: any) {
    toast.error(e?.message || "Print failed");
  }
};



  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card className="rounded-2xl">
          <CardHeader className="flex items-center justify-between">
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
            <div className="h-7 w-40 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !payslip) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card className="rounded-2xl">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Error</CardTitle>
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Failed to load payslip.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { calculations } = payslip

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            {/* Back (left on lg) */}
            <div className="w-full sm:w-auto">
              <Button variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
                ← Back
              </Button>
            </div>

            {/* Title (right on lg) */}
            <CardTitle className="text-xl sm:text-2xl font-bold text-center sm:text-right w-full sm:w-auto">
              Payslip
            </CardTitle>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{payslip.employeeName}</span>
              {" • "}
              {fmtDate(payslip.date)}
              {payslip.projectId?.name ? (
                <>
                  {" • "}
                  <span className="text-foreground">Project: </span>
                  {payslip.projectId.name}
                </>
              ) : null}
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary" className="capitalize">
                {payslip.status}
              </Badge>
              <Button variant="outline" onClick={handleDownload}>
                Download PDF
              </Button>
              <Button onClick={handlePrint}>
                Print PDF
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Summary */}
          <section>
            <h3 className="text-base font-semibold mb-3">Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Employee" value={payslip.employeeName} />
              <InfoRow label="Date" value={fmtDate(payslip.date)} />
              <InfoRow label="Prepared By" value={payslip.preparedBy} />
              <InfoRow label="Project" value={payslip.projectId?.name || "-"} />
            </div>
          </section>

          <Separator />

          {/* Pay */}
          <section>
            <h3 className="text-base font-semibold mb-3">Pay</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Gross Pay" value={fmt(payslip.grossPay)} />
              <InfoRow label="Allowances / Additions" value={fmt(payslip.allowanceDeductions)} />
              <InfoRow label="Taxable Pay" value={fmt(calculations.taxablePay)} />
              <InfoRow label="Personal Relief" value={fmt(payslip.personalRelief)} />
              <InfoRow label="Net Pay" value={fmt(calculations.netPay)} emphasize />
            </div>
          </section>

          <Separator />

          {/* Deductions */}
          <section>
            <h3 className="text-base font-semibold mb-3">Deductions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="PAYE" value={fmt(calculations.paye)} />
              <InfoRow label="NSSF Tier 1" value={fmt(calculations.nssfTier1)} />
              <InfoRow label="NSSF Tier 2" value={fmt(calculations.nssfTier2)} />
              <InfoRow label="SHIF" value={fmt(calculations.shif)} />
              <InfoRow label="Housing Levy" value={fmt(calculations.housingLevy)} />
              <InfoRow label="Custom Deductions" value={fmt(calculations.customTotal)} />
              <InfoRow label="Total Deductions" value={fmt(calculations.totalDeductions)} emphasize />
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

// Small display row helper
function InfoRow({
  label,
  value,
  emphasize,
}: {
  label: string
  value: React.ReactNode
  emphasize?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className={`text-sm sm:text-base ${emphasize ? "font-semibold" : ""}`}>{value}</div>
    </div>
  )
}
