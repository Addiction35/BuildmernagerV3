"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EstimateItemsTable } from "@/components/estimates/estimate-items-table"
import type { Group } from "@/types/estimate"

interface ProposalFormData {
  id: string
  name: string
  projectId: string
  clientId: string
  date: string
  status: string
  description: string
  notes: string
  estimateId: string | null
  validUntil: string
  terms: string
  groups: Group[]
}

// Sample initial data
const initialProposalData: ProposalFormData = {
  id: "",
  name: "",
  projectId: "",
  clientId: "",
  date: new Date().toISOString().split("T")[0],
  status: "Pending Approval",
  description: "",
  notes: "",
  estimateId: null,
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days from now
  terms: "Payment due within 30 days of invoice date. This proposal is valid for 30 days from the date issued.",
  groups: [],
}

// Sample projects for dropdown
const projects = [
  { id: "PRJ001", name: "Riverside Apartments" },
  { id: "PRJ002", name: "Downtown Office Renovation" },
  { id: "PRJ003", name: "Hillside Residence" },
  { id: "PRJ004", name: "Community Center" },
  { id: "PRJ005", name: "Retail Store Fitout" },
]

// Sample clients for dropdown
const clients = [
  { id: "CLT001", name: "Riverside Development LLC" },
  { id: "CLT002", name: "Metro Business Group" },
  { id: "CLT003", name: "Johnson Family" },
  { id: "CLT004", name: "Oakville Municipality" },
  { id: "CLT005", name: "Fashion Outlet Inc." },
]

// Sample estimates for dropdown
const estimates = [
  {
    id: "EST001",
    name: "Riverside Apartments - Initial Estimate",
    projectId: "PRJ001",
    clientId: "CLT001",
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
        ],
      },
    ],
  },
  {
    id: "EST002",
    name: "Downtown Office - Renovation Estimate",
    projectId: "PRJ002",
    clientId: "CLT002",
    groups: [],
  },
]

export function ProposalForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromEstimateId = searchParams.get("from")

  const [proposalData, setProposalData] = useState<ProposalFormData>(initialProposalData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load estimate data if coming from an estimate
  useEffect(() => {
    if (fromEstimateId) {
      const estimate = estimates.find((est) => est.id === fromEstimateId)
      if (estimate) {
        setProposalData({
          ...proposalData,
          name: `${estimate.name.replace("Estimate", "Proposal")}`,
          projectId: estimate.projectId,
          clientId: estimate.clientId,
          estimateId: estimate.id,
          groups: estimate.groups,
          description: `Proposal based on estimate ${estimate.id}`,
        })
      }
    }
  }, [fromEstimateId])

  // Calculate total
  const calculateTotal = () => {
    return proposalData.groups.reduce((acc, group) => acc + group.amount, 0)
  }

  const total = calculateTotal()

  // Calculate tax (e.g., 10%)
  const taxRate = 0.1
  const taxAmount = total * taxRate

  // Calculate grand total
  const grandTotal = total + taxAmount

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setProposalData({
      ...proposalData,
      [field]: value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would send the data to your API here
      console.log("Submitting proposal:", proposalData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to proposals list
      router.push("/proposals")
    } catch (error) {
      console.error("Error submitting proposal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Proposal Name</Label>
            <Input
              id="name"
              value={proposalData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter proposal name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={proposalData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={proposalData.projectId} onValueChange={(value) => handleChange("projectId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select value={proposalData.clientId} onValueChange={(value) => handleChange("clientId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              value={proposalData.validUntil}
              onChange={(e) => handleChange("validUntil", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimate">Based on Estimate</Label>
            <Select
              value={proposalData.estimateId || ""}
              onValueChange={(value) => {
                const estimate = estimates.find((est) => est.id === value)
                if (estimate) {
                  setProposalData({
                    ...proposalData,
                    estimateId: value,
                    projectId: estimate.projectId,
                    clientId: estimate.clientId,
                    groups: estimate.groups,
                  })
                } else {
                  setProposalData({
                    ...proposalData,
                    estimateId: null,
                    groups: [],
                  })
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an estimate (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {estimates.map((estimate) => (
                  <SelectItem key={estimate.id} value={estimate.id}>
                    {estimate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={proposalData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter proposal description"
            rows={3}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Proposal Items</h3>

        {proposalData.groups.length > 0 ? (
          <EstimateItemsTable groups={proposalData.groups} />
        ) : (
          <div className="rounded-md border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              No items added yet. Select an estimate to import items or add them manually.
            </p>
          </div>
        )}

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
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="terms">Terms and Conditions</Label>
        <Textarea
          id="terms"
          value={proposalData.terms}
          onChange={(e) => handleChange("terms", e.target.value)}
          placeholder="Enter terms and conditions"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={proposalData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Enter any additional notes"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/proposals")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit for Approval"}
        </Button>
      </div>
    </form>
  )
}
