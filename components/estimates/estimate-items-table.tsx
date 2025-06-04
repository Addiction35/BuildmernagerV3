"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Group } from "@/types/estimate"
import { ChevronDown, ChevronRight } from "lucide-react"

interface EstimateItemsTableProps {
  groups: Group[]
}

export function EstimateItemsTable({ groups }: EstimateItemsTableProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const isGroupExpanded = (groupId: string) => expandedGroups.includes(groupId)
  const isSectionExpanded = (sectionId: string) => expandedSections.includes(sectionId)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="w-[300px]">Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <>
              <TableRow key={group.id} className="bg-muted/50 font-medium">
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleGroup(group.id)}>
                    {isGroupExpanded(group.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>{group.code}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.quantity > 0 ? `$${group.quantity.toLocaleString()}` : ""}</TableCell>
                <TableCell>{group.unit}</TableCell>
                <TableCell>{group.rate > 0 ? `$${group.rate.toLocaleString()}` : ""}</TableCell>
                <TableCell className="text-right">${group.amount.toLocaleString()}</TableCell>
              </TableRow>

              {isGroupExpanded(group.id) &&
                group.sections.map((section) => (
                  <>
                    <TableRow key={section.id} className="bg-muted/30">
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-4"
                          onClick={() => toggleSection(section.id)}
                        >
                          {isSectionExpanded(section.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>{section.code}</TableCell>
                      <TableCell>{section.name}</TableCell>
                      <TableCell>{section.quantity}</TableCell>
                      <TableCell>{section.unit}</TableCell>
                      <TableCell>{section.rate > 0 ? `kes ${section.rate.toLocaleString()}` : ""}</TableCell>
                      <TableCell className="text-right">kes {section.amount.toLocaleString()}</TableCell>
                    </TableRow>

                    {isSectionExpanded(section.id) &&
                      section.subsections.map((subsection) => (
                        <TableRow key={subsection.id}>
                          <TableCell></TableCell>
                          <TableCell className="pl-10">{subsection.code}</TableCell>
                          <TableCell>{subsection.name}</TableCell>
                          <TableCell>{subsection.quantity}</TableCell>
                          <TableCell>{subsection.unit}</TableCell>
                          <TableCell>kes {subsection.rate.toLocaleString()}</TableCell>
                          <TableCell className="text-right">kes {subsection.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                  </>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
