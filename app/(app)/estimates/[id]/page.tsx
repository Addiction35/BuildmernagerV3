import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { EstimateItemsTable } from "@/components/estimates/estimate-items-table"
import { ArrowLeft, Download, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Estimate Details | Construction Management",
  description: "View estimate details",
}

// This would normally come from a database
const getEstimate = (id: string) => {
  const estimates = [
    {
      id: "EST001",
      name: "Riverside Apartments - Initial Estimate",
      project: "Riverside Apartments",
      projectId: "PRJ001",
      client: "Riverside Development LLC",
      date: "2023-04-10",
      status: "Approved",
      description: "Initial construction estimate for the Riverside Apartments project.",
      notes: "Client has requested a detailed breakdown of foundation costs.",
      groups: [
        {
          id: "group-1",
          code: "A",
          name: "Site Preparation",
          description: "All site preparation activities",
          quantity: 1,
          unit: "LS",
          rate: 0,
          amount: 25000,
          sections: [
            {
              id: "section-1",
              code: "A.1",
              name: "Demolition",
              description: "Demolition of existing structures",
              quantity: 1,
              unit: "LS",
              rate: 0,
              amount: 15000,
              subsections: [
                {
                  id: "subsection-1",
                  code: "A.1.1",
                  name: "Building Demolition",
                  description: "Demolition of main building",
                  quantity: 1,
                  unit: "LS",
                  rate: 10000,
                  amount: 10000,
                },
                {
                  id: "subsection-2",
                  code: "A.1.2",
                  name: "Concrete Removal",
                  description: "Removal of existing concrete slabs and foundations",
                  quantity: 500,
                  unit: "SY",
                  rate: 10,
                  amount: 5000,
                },
              ],
            },
            {
              id: "section-2",
              code: "A.2",
              name: "Site Clearing",
              description: "Clearing and grubbing of site",
              quantity: 1,
              unit: "LS",
              rate: 0,
              amount: 10000,
              subsections: [
                {
                  id: "subsection-3",
                  code: "A.2.1",
                  name: "Tree Removal",
                  description: "Removal of trees and stumps",
                  quantity: 15,
                  unit: "EA",
                  rate: 400,
                  amount: 6000,
                },
                {
                  id: "subsection-4",
                  code: "A.2.2",
                  name: "Grubbing",
                  description: "Removal of roots and organic material",
                  quantity: 2,
                  unit: "AC",
                  rate: 2000,
                  amount: 4000,
                },
              ],
            },
          ],
        },
        {
          id: "group-2",
          code: "B",
          name: "Foundation",
          description: "Foundation work",
          quantity: 1,
          unit: "LS",
          rate: 0,
          amount: 175000,
          sections: [
            {
              id: "section-3",
              code: "B.1",
              name: "Excavation",
              description: "Excavation for foundation",
              quantity: 1,
              unit: "LS",
              rate: 0,
              amount: 45000,
              subsections: [
                {
                  id: "subsection-5",
                  code: "B.1.1",
                  name: "Mass Excavation",
                  description: "Bulk excavation for foundation",
                  quantity: 1500,
                  unit: "CY",
                  rate: 20,
                  amount: 30000,
                },
                {
                  id: "subsection-6",
                  code: "B.1.2",
                  name: "Trench Excavation",
                  description: "Excavation for footings and utilities",
                  quantity: 300,
                  unit: "CY",
                  rate: 50,
                  amount: 15000,
                },
              ],
            },
            {
              id: "section-4",
              code: "B.2",
              name: "Concrete Work",
              description: "Concrete for foundation",
              quantity: 1,
              unit: "LS",
              rate: 0,
              amount: 130000,
              subsections: [
                {
                  id: "subsection-7",
                  code: "B.2.1",
                  name: "Footings",
                  description: "Concrete for footings",
                  quantity: 200,
                  unit: "CY",
                  rate: 250,
                  amount: 50000,
                },
                {
                  id: "subsection-8",
                  code: "B.2.2",
                  name: "Foundation Walls",
                  description: "Concrete for foundation walls",
                  quantity: 180,
                  unit: "CY",
                  rate: 300,
                  amount: 54000,
                },
                {
                  id: "subsection-9",
                  code: "B.2.3",
                  name: "Slab on Grade",
                  description: "Concrete for ground floor slab",
                  quantity: 650,
                  unit: "SY",
                  rate: 40,
                  amount: 26000,
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  return estimates.find((estimate) => estimate.id === id)
}

export default function EstimatePage({ params }: { params: { id: string } }) {
  const estimate = getEstimate(params.id)

  if (!estimate) {
    notFound()
  }

  // Calculate total
  const total = estimate.groups.reduce((acc, group) => acc + group.amount, 0)

  // Calculate tax (e.g., 10%)
  const taxRate = 0.1
  const taxAmount = total * taxRate

  // Calculate grand total
  const grandTotal = total + taxAmount

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/estimates">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{estimate.name}</h1>
          <Badge
            variant={
              estimate.status === "Approved"
                ? "success"
                : estimate.status === "Pending"
                  ? "default"
                  : estimate.status === "Draft"
                    ? "secondary"
                    : estimate.status === "Rejected"
                      ? "destructive"
                      : "outline"
            }
          >
            {estimate.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          {estimate.status !== "Approved" && (
            <Link href={`/estimates/${estimate.id}/edit`}>
              <Button>Edit Estimate</Button>
            </Link>
          )}
          {estimate.status === "Approved" && (
            <Link href={`/proposals/new?from=${estimate.id}`}>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Convert to Proposal
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/projects/${estimate.projectId}`} className="text-blue-600 hover:underline">
              {estimate.project}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{estimate.client}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{new Date(estimate.date).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estimate Details</CardTitle>
          <CardDescription>Detailed breakdown of the estimate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {estimate.description && (
              <div className="space-y-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">{estimate.description}</p>
              </div>
            )}

            <Separator />

            <EstimateItemsTable groups={estimate.groups} />

            <Separator />

            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2">
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
            </div>

            {estimate.notes && (
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
