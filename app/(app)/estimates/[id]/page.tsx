'use client'
import { use } from 'react'
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { EstimateItemsTable } from "@/components/estimates/estimate-items-table"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { useEstimate } from "@/lib/hooks/EstimateQueries"

export default function EstimatePage({ params }: { params: { id: string } }) {
  const { id } = use(params) ?? {}; // ✅ unwrap the promise

  const { data: estimate, isLoading, error } = useEstimate(id)

  if (isLoading) return <div>Loading...</div>
  if (error || !estimate) return notFound()

  const total = estimate.groups?.reduce((acc, group) => acc + (group?.amount || 0), 0) ?? 0

  const subtotal = total

  const taxRate = 1.16

  const totalAmount = subtotal * taxRate // Assuming 16% tax rate inclusive VAT

  const taxAmount = totalAmount - subtotal
  // Calculate grand total
  const grandTotal = totalAmount

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/estimates">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{estimate?.name ?? 'Unnamed Estimate'}</h1>
          <Badge
            variant={
              estimate?.status === "Approved" ? "success"
              : estimate?.status === "Pending" ? "default"
              : estimate?.status === "Draft" ? "secondary"
              : estimate?.status === "Rejected" ? "destructive"
              : "outline"
            }
          >
            {estimate?.status ?? "Unknown"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          {estimate?.status !== "Approved" && (
            <Link href={`/estimates/${estimate?.id}/edit`}>
              <Button>Edit Estimate</Button>
            </Link>
          )}
          {estimate?.status === "Approved" && (
            <Link href={`/proposals/new?from=${estimate?.id}`}>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Convert to Proposal
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Project</CardTitle>
          </CardHeader>
          <CardContent>
            
            {estimate?.projectId ? (
              <Link href={`/projects/${estimate.projectId._id}`} className="text-blue-600 hover:underline">
                {estimate?.projectId.name ?? "View Project"}
              </Link>
            ) : (
              <span className="text-muted-foreground">No project</span>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{estimate?.clientId.primaryContact ?? "N/A"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{estimate?.date ? new Date(estimate.date).toLocaleDateString() : "N/A"}</div>
          </CardContent>
        </Card>
      </div>

      {/* Estimate Details */}
      <Card>
        <CardHeader>
          <CardTitle>Estimate Details</CardTitle>
          <CardDescription>Detailed breakdown of the estimate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {estimate?.description && (
              <div className="space-y-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">{estimate.description}</p>
              </div>
            )}

            <Separator />

            <EstimateItemsTable groups={estimate?.groups ?? []} />

            <Separator />

            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Subtotal</span>
                  <span>kes {total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Tax (16%)</span>
                  <span>kes {taxAmount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>KSH {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {estimate?.notes && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Notes</h3>
                  <p className="text-sm text-muted-foreground">{estimate.notes}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
