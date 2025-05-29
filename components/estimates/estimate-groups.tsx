"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EstimateSections } from "@/components/estimates/estimate-sections"
import type { Group, Section, Subsection } from "@/types/estimate"
import { ChevronDown, ChevronUp, Trash } from "lucide-react"

interface EstimateGroupsProps {
  groups: Group[]
  onAddSection: (groupId: string) => void
  onAddSubsection: (groupId: string, sectionId: string) => void
  onUpdateGroup: (group: Group) => void
  onUpdateSection: (groupId: string, section: Section) => void
  onUpdateSubsection: (groupId: string, sectionId: string, subsection: Subsection) => void
  onDeleteGroup: (groupId: string) => void
  onDeleteSection: (groupId: string, sectionId: string) => void
  onDeleteSubsection: (groupId: string, sectionId: string, subsectionId: string) => void
}

export function EstimateGroups({
  groups,
  onAddSection,
  onAddSubsection,
  onUpdateGroup,
  onUpdateSection,
  onUpdateSubsection,
  onDeleteGroup,
  onDeleteSection,
  onDeleteSubsection,
}: EstimateGroupsProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const handleGroupChange = (groupId: string, field: string, value: string | number) => {
    const group = groups.find((g) => g.id === groupId)
    if (!group) return

    const updatedGroup = { ...group, [field]: value }

    // Calculate amount if quantity and rate are changed
    if (field === "quantity" || field === "rate") {
      const quantity = field === "quantity" ? Number(value) : group.quantity
      const rate = field === "rate" ? Number(value) : group.rate
      updatedGroup.amount = quantity * rate
    }

    onUpdateGroup(updatedGroup)
  }

  const unitOptions = ["LS", "EA", "SF", "SY", "LF", "CY", "DAY", "HR"]

  return (
    <div className="space-y-4">
      {groups?.map((group) => (
        <Card key={group.id} className="overflow-hidden">
          <div className="flex items-center justify-between bg-muted p-4">
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" onClick={() => toggleGroupExpansion(group.id)}>
                {expandedGroups.includes(group.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              <div className="font-medium">
                {group.code}: {group.name}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Total: ${group.amount.toLocaleString()}</div>
              <Button type="button" variant="ghost" size="icon" onClick={() => onDeleteGroup(group.id)}>
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete group</span>
              </Button>
            </div>
          </div>

          <div className={expandedGroups.includes(group.id) ? "block" : "hidden"}>
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`group-${group.id}-code`}>Code</Label>
                  <Input
                    id={`group-${group.id}-code`}
                    value={group.code}
                    onChange={(e) => handleGroupChange(group.id, "code", e.target.value)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`group-${group.id}-name`}>Name</Label>
                  <Input
                    id={`group-${group.id}-name`}
                    value={group.name}
                    onChange={(e) => handleGroupChange(group.id, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`group-${group.id}-description`}>Description</Label>
                  <Textarea
                    id={`group-${group.id}-description`}
                    value={group.description}
                    onChange={(e) => handleGroupChange(group.id, "description", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`group-${group.id}-quantity`}>Quantity</Label>
                  <Input
                    id={`group-${group.id}-quantity`}
                    type="number"
                    value={group.quantity}
                    onChange={(e) => handleGroupChange(group.id, "quantity", Number(e.target.value))}
                  />
                </div>

        <div className="space-y-2">
          <Label htmlFor={`group-${group.id}-unit`}>Unit</Label>
          <input
            id={`group-${group.id}-unit`}
            type="text"
            value={group.unit}
            onChange={(e) => handleGroupChange(group.id, "unit", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>


                <div className="space-y-2">
                  <Label htmlFor={`group-${group.id}-rate`}>Rate</Label>
                  <Input
                    id={`group-${group.id}-rate`}
                    type="number"
                    value={group.rate}
                    onChange={(e) => handleGroupChange(group.id, "rate", Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`group-${group.id}-amount`}>Amount</Label>
                  <Input id={`group-${group.id}-amount`} type="number" value={group.amount} readOnly />
                </div>
              </div>

              <div className="mt-6">
                <Button type="button" variant="outline" onClick={() => onAddSection(group.id)}>
                  Add Section
                </Button>
              </div>

              {group.sections.length > 0 && (
                <div className="mt-4">
                  <EstimateSections
                    groupId={group.id}
                    sections={group.sections}
                    onAddSubsection={onAddSubsection}
                    onUpdateSection={(section) => onUpdateSection(group.id, section)}
                    onUpdateSubsection={(sectionId, subsection) => onUpdateSubsection(group.id, sectionId, subsection)}
                    onDeleteSection={(sectionId) => onDeleteSection(group.id, sectionId)}
                    onDeleteSubsection={(sectionId, subsectionId) =>
                      onDeleteSubsection(group.id, sectionId, subsectionId)
                    }
                  />
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      ))}

      {groups?.length === 0 && (
        <div className="rounded-md border border-dashed p-8 text-center">
          <p className="text-muted-foreground">No groups added yet. Click "Add Group" to get started.</p>
        </div>
      )}
    </div>
  )
}
