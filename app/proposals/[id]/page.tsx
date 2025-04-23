import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, FileText, Check, X } from "lucide-react"

export const metadata: Metadata = {
  title: "Proposal Details | Construction Management",
  description: "View proposal details",
}

// This would normally come from a database
const getProposal = (id: string) => {
  const proposals = [
    {
      id: "PROP001",
      name: "Riverside Apartments - Initial Proposal",
      number: "PROP-2023-001",
      project: "Riverside Apartments",
      projectId: "PRJ001",
      client: "Riverside Development LLC",
      date: "2023-05-15",
      validUntil: "2023-06-15",
      status: "Approved",
      description: "Initial construction proposal for the Riverside Apartments project.",
      notes: "Client has requested a detailed breakdown of costs and timeline.",
      sections: [
        {
          id: "section-1",
          title: "Project Overview",
          content:
            "The Riverside Apartments project consists of constructing a 48-unit luxury apartment complex with modern amenities and riverside views. The building will be 5 stories with underground parking and rooftop recreational areas.",
        },
        {
          id: "section-2",
          title: "Scope of Work",
          content:
            "Our scope includes complete construction services from site preparation to final finishing. This includes demolition of existing structures, site grading, foundation work, structural framing, exterior and interior finishes, mechanical, electrical, and plumbing systems, and landscaping.",
        },
        {
          id: "section-3",
          title: "Timeline",
          content:
            "The project is estimated to take 15 months from start to completion, with key milestones as follows:\n- Site preparation: 1 month\n- Foundation: 2 months\n- Structural framing: 4 months\n- Exterior envelope: 3 months\n- Interior finishes: 4 months\n- Final inspections and handover: 1 month",
        },
        {
          id: "section-4",
          title: "Cost Breakdown",
          content:
            "The total project cost is estimated at $12,500,000, broken down as follows:\n- Site work: $1,250,000\n- Foundation: $1,875,000\n- Structural: $3,125,000\n- Exterior: $2,500,000\n- Interior: $3,125,000\n- Landscaping: $625,000",
        },
        {
          id: "section-5",
          title: "Terms and Conditions",
          content:
            "Payment schedule: 10% upon signing, 20% upon foundation completion, 30% upon structural completion, 30% upon exterior completion, 10% upon final inspection and handover.\n\nAll work to be completed in accordance with local building codes and regulations. Any changes to the scope of work will require a change order and may affect the timeline and cost.",
        },
      ],
      subtotal: 12500000,
      tax: 1250000,
      total: 13750000,
    },
  ]

  return proposals.find((proposal) => proposal.id === id)
}

export default function ProposalPage({ params }: { params: { id: string } }) {
  const proposal = getProposal(params.id)

  if (!proposal) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/proposals">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{proposal.name}</h1>
          <Badge
            variant={
              proposal.status === "Approved"
                ? "success"
                : proposal.status === "Pending"
                  ? "default"
                  : proposal.status === "Draft"
                    ? "secondary"
                    : proposal.status === "Rejected"
                      ? "destructive"
                      : "outline"
            }
          >
            {proposal.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          {proposal.status === "Pending" && (
            <div className="flex gap-2">
              <Button variant="success">
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          )}
          {proposal.status === "Approved" && (
            <Link href={`/contracts/new?from=${proposal.id}`}>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Create Contract
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
            <Link href={`/projects/${proposal.projectId}`} className="text-blue-600 hover:underline">
              {proposal.project}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{proposal.client}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valid Until</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{new Date(proposal.validUntil).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proposal Details</CardTitle>
          <CardDescription>Detailed breakdown of the proposal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {proposal.description && (
              <div className="space-y-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">{proposal.description}</p>
              </div>
            )}

            <Separator />

            {proposal.sections.map((section) => (
              <div key={section.id} className="space-y-2">
                <h3 className="font-medium">{section.title}</h3>
                <div className="whitespace-pre-line text-sm text-muted-foreground">{section.content}</div>
              </div>
            ))}

            <Separator />

            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${proposal.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Tax (10%)</span>
                  <span>${proposal.tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>${proposal.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {proposal.notes && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Notes</h3>
                  <p className="text-sm text-muted-foreground">{proposal.notes}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
