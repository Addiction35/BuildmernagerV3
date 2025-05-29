"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EstimateSubsections } from "@/components/estimates/estimate-subsections"
import type { Section, Subsection } from "@/types/estimate"
import { ChevronDown, ChevronUp, Trash } from "lucide-react"

const handleSectionChange = (sectionId: string, field: string, value: string | number) => {
  const section = sections.find((s) => s.id === sectionId)
  if (!section) return

  const updatedSection = { ...section, [field]: value }

  if (field === "quantity" || field === "rate") {
    const quantity = field === "quantity" ? Number(value) : Number(section.quantity)
    const rate = field === "rate" ? Number(value) : Number(section.rate)
    updatedSection.amount = quantity * rate
  }

  onUpdateSection(updatedSection)
}


interface EstimateSectionsProps {
  groupId: string
  sections: Section[]
  onAddSubsection: (groupId: string, sectionId: string) => void
  onUpdateSection: (section: Section) => void
  onUpdateSubsection: (sectionId: string, subsection: Subsection) => void
  onDeleteSection: (sectionId: string) => void
  onDeleteSubsection: (sectionId: string, subsectionId: string) => void
}

export function EstimateSections({
  groupId,
  sections,
  onAddSubsection,
  onUpdateSection,
  onUpdateSubsection,
  onDeleteSection,
  onDeleteSubsection,
}: EstimateSectionsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleSectionChange = (sectionId: string, field: string, value: string | number) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return

    const updatedSection = { ...section, [field]: value }

    // Calculate amount if quantity and rate are changed
    if (field === "quantity" || field === "rate") {
      const quantity = field === "quantity" ? Number(value) : section.quantity
      const rate = field === "rate" ? Number(value) : section.rate
      updatedSection.amount = quantity * rate
    }

    onUpdateSection(updatedSection)
  }

  return (
    <div className="space-y-4 pl-6 border-l-2 border-muted">
      {sections?.map((section) => (
        <Card key={section.id} className="overflow-hidden">
          <div className="flex items-center justify-between bg-muted/50 p-4">
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" onClick={() => toggleSectionExpansion(section.id)}>
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              <div className="font-medium">
                {section.code}: {section.name}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Total: ${section.amount.toLocaleString()}</div>
              <Button type="button" variant="ghost" size="icon" onClick={() => onDeleteSection(section.id)}>
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete section</span>
              </Button>
            </div>
          </div>

          <div className={expandedSections.includes(section.id) ? "block" : "hidden"}>
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`section-${section.id}-code`}>Code</Label>
                  <Input
                    id={`section-${section.id}-code`}
                    value={section.code}
                    onChange={(e) => handleSectionChange(section.id, "code", e.target.value)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`section-${section.id}-name`}>Name</Label>
                  <Input
                    id={`section-${section.id}-name`}
                    value={section.name}
                    onChange={(e) => handleSectionChange(section.id, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`section-${section.id}-description`}>Description</Label>
                  <Textarea
                    id={`section-${section.id}-description`}
                    value={section.description}
                    onChange={(e) => handleSectionChange(section.id, "description", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`section-${section.id}-quantity`}>Quantity</Label>
                  <Input
                    id={`section-${section.id}-quantity`}
                    type="number"
                    value={section.quantity}
                    onChange={(e) => handleSectionChange(section.id, "quantity", Number(e.target.value))}
                  />
                </div>

              <div className="space-y-2">
                <Label htmlFor={`section-${section.id}-unit`}>Unit</Label>
                <input
                  id={`section-${section.id}-unit`}
                  type="text"
                  value={section.unit}
                  onChange={(e) =>  handleSectionChange(section.id, "unit", e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>


                <div className="space-y-2">
                  <Label htmlFor={`section-${section.id}-rate`}>Rate</Label>
                  <Input
                    id={`section-${section.id}-rate`}
                    type="number"
                    value={section.rate}
                    onChange={(e) => handleSectionChange(section.id, "rate", Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`section-${section.id}-amount`}>Amount</Label>
                  <Input id={`section-${section.id}-amount`} type="number" value={section.amount} readOnly />
                </div>
              </div>

              <div className="mt-6">
                <Button type="button" variant="outline" onClick={() => onAddSubsection(groupId, section.id)}>
                  Add Subsection
                </Button>
              </div>

              {section.subsections?.length > 0 && (
                <div className="mt-4">
                  <EstimateSubsections
                    sectionId={section.id}
                    subsections={section.subsections}
                    onUpdateSubsection={(subsection) => onUpdateSubsection(section.id, subsection)}
                    onDeleteSubsection={(subsectionId) => onDeleteSubsection(section.id, subsectionId)}
                  />
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      ))}

      {sections?.length === 0 && (
        <div className="rounded-md border border-dashed p-6 text-center">
          <p className="text-muted-foreground">No sections added yet. Click "Add Section" to get started.</p>
        </div>
      )}
    </div>
  )
}
