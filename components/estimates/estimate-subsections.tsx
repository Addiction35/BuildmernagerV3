"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Subsection } from "@/types/estimate"
import { Trash } from "lucide-react"

interface EstimateSubsectionsProps {
  sectionId: string
  subsections: Subsection[]
  onUpdateSubsection: (subsection: Subsection) => void
  onDeleteSubsection: (subsectionId: string) => void
}

export function EstimateSubsections({
  sectionId,
  subsections,
  onUpdateSubsection,
  onDeleteSubsection,
}: EstimateSubsectionsProps) {
  const handleSubsectionChange = (subsectionId: string, field: string, value: string | number) => {
    const subsection = subsections.find((s) => s.id === subsectionId)
    if (!subsection) return

    const updatedSubsection = { ...subsection, [field]: value }

    // Calculate amount if quantity and rate are changed
    if (field === "quantity" || field === "rate") {
      const quantity = field === "quantity" ? Number(value) : subsection.quantity
      const rate = field === "rate" ? Number(value) : subsection.rate
      updatedSubsection.amount = quantity * rate
    }

    onUpdateSubsection(updatedSubsection)
  }

  const unitOptions = ["LS", "EA", "SF", "SY", "LF", "CY", "DAY", "HR"]

  return (
    <div className="space-y-4 pl-6 border-l-2 border-muted">
      {subsections?.map((subsection) => (
        <Card key={subsection.id} className="overflow-hidden">
          <div className="flex items-center justify-between bg-muted/30 p-4">
            <div className="font-medium">
              {subsection.code}: {subsection.name}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">${subsection.amount.toLocaleString()}</div>
              <Button type="button" variant="ghost" size="icon" onClick={() => onDeleteSubsection(subsection.id)}>
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete subsection</span>
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`subsection-${subsection.id}-code`}>Code</Label>
                <Input
                  id={`subsection-${subsection.id}-code`}
                  value={subsection.code}
                  onChange={(e) => handleSubsectionChange(subsection.id, "code", e.target.value)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`subsection-${subsection.id}-name`}>Name</Label>
                <Input
                  id={`subsection-${subsection.id}-name`}
                  value={subsection.name}
                  onChange={(e) => handleSubsectionChange(subsection.id, "name", e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`subsection-${subsection.id}-description`}>Description</Label>
                <Textarea
                  id={`subsection-${subsection.id}-description`}
                  value={subsection.description}
                  onChange={(e) => handleSubsectionChange(subsection.id, "description", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`subsection-${subsection.id}-quantity`}>Quantity</Label>
                <Input
                  id={`subsection-${subsection.id}-quantity`}
                  type="number"
                  value={subsection.quantity}
                  onChange={(e) => handleSubsectionChange(subsection.id, "quantity", Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`subsection-${subsection.id}-unit`}>Unit</Label>
                <input
                  id={`subsection-${subsection.id}-unit`}
                  type="text"
                  value={subsection.unit}
                  onChange={(e) => handleSubSectionChange(subsection.id, "unit", e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`subsection-${subsection.id}-rate`}>Rate</Label>
                <Input
                  id={`subsection-${subsection.id}-rate`}
                  type="number"
                  value={subsection.rate}
                  onChange={(e) => handleSubsectionChange(subsection.id, "rate", Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`subsection-${subsection.id}-amount`}>Amount</Label>
                <Input id={`subsection-${subsection.id}-amount`} type="number" value={subsection.amount} readOnly />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {subsections?.length === 0 && (
        <div className="rounded-md border border-dashed p-6 text-center">
          <p className="text-muted-foreground">No subsections added yet. Click "Add Subsection" to get started.</p>
        </div>
      )}
    </div>
  )
}
