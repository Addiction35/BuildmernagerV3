"use client"

import type React from "react"
import { useMemo } from 'react';

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EstimateGroups } from "@/components/estimates/estimate-groups"
import { EstimateSummary } from "@/components/estimates/estimate-summary"
import type { Group, Section, Subsection, EstimateData } from "@/types/estimate"
import { DownloadIcon } from "lucide-react"
import { ImportExcelModal } from "@/components/import-excel-modal"
import { useGetClients } from "@/lib/hooks/clientQueries"
import { useProjects } from "@/lib/hooks/projectQueries"
import { useCreateEstimate } from "@/lib/hooks/EstimateQueries";

// Sample initial data
const initialEstimateData: EstimateData = {
  id: "",
  name: "",
  projectId: "",
  clientId: "",
  date: new Date().toISOString().split("T")[0],
  status: "Draft",
  description: "",
  notes: "",
  groups: [],
}

export function EstimateForm() {
  const router = useRouter()
  const [estimateData, setEstimateData] = useState<EstimateData>(initialEstimateData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const { data: projects, isLoading: loadProjects } = useProjects()
 const { data: clients, isLoading: clientsLoading } = useGetClients()

  // Calculate totals for the entire estimate
const calculateEstimateTotal = () => {
  const groups = Array.isArray(estimateData.groups) ? estimateData.groups : []

  return groups.reduce((total, group) => {
    const groupTotal = Array.isArray(group.sections)
      ? group.sections.reduce((sectionTotal, section) => {
          const sectionSum = Array.isArray(section.subsections)
            ? section.subsections.reduce((subsectionTotal, subsection) => {
                return subsectionTotal + subsection.amount
              }, 0)
            : 0

          // If no subsections, use the section amount as-is
          const totalSectionAmount = section.subsections?.length ? sectionSum : section.amount

          section.amount = totalSectionAmount
          return sectionTotal + totalSectionAmount
        }, 0)
      : 0

    group.amount = groupTotal
    return total + groupTotal
  }, 0)
}



const estimateTotal = useMemo(() => calculateEstimateTotal(), [estimateData])


  // Handle input changes for the estimate header
  const handleEstimateChange = (field: string, value: string) => {
    setEstimateData({
      ...estimateData,
      [field]: value,
    })
  }

  // Add a new group
  const addGroup = () => {
    const newGroupCode = String.fromCharCode(65 + estimateData.groups.length) // A, B, C, etc.
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      code: newGroupCode,
      name: `Group ${newGroupCode}`,
      description: "",
      quantity: 1,
      unit: "LS",
      rate: 0,
      amount: 0,
      sections: [],
    }

    setEstimateData({
      ...estimateData,
      groups: [...estimateData.groups, newGroup],
    })
  }

  // Add a new section to a group
  const addSection = (groupId: string) => {
    const updatedGroups = estimateData.groups.map((group) => {
      if (group.id === groupId) {
        const newSectionCode = `${group.code}.${group.sections.length + 1}`
        const newSection: Section = {
          id: `section-${Date.now()}`,
          code: newSectionCode,
          name: `Section ${newSectionCode}`,
          description: "",
          quantity: 1,
          unit: "LS",
          rate: 0,
          amount: 0,
          subsections: [],
        }
        return {
          ...group,
          sections: [...group.sections, newSection],
        }
      }
      return group
    })

    setEstimateData({
      ...estimateData,
      groups: updatedGroups,
    })
  }

  // Add a new subsection to a section
  const addSubsection = (groupId: string, sectionId: string) => {
    const updatedGroups = estimateData.groups.map((group) => {
      if (group.id === groupId) {
        const updatedSections = group.sections.map((section) => {
          if (section.id === sectionId) {
            const newSubsectionCode = `${section.code}.${section.subsections.length + 1}`
            const newSubsection: Subsection = {
              id: `subsection-${Date.now()}`,
              code: newSubsectionCode,
              name: `Subsection ${newSubsectionCode}`,
              description: "",
              quantity: 1,
              unit: "EA",
              rate: 0,
              amount: 0,
            }
            return {
              ...section,
              subsections: [...section.subsections, newSubsection],
            }
          }
          return section
        })
        return {
          ...group,
          sections: updatedSections,
        }
      }
      return group
    })

    setEstimateData({
      ...estimateData,
      groups: updatedGroups,
    })
  }

  // Update a group
  const updateGroup = (updatedGroup: Group) => {
    const updatedGroups = estimateData.groups.map((group) => (group.id === updatedGroup.id ? updatedGroup : group))

    setEstimateData({
      ...estimateData,
      groups: updatedGroups,
    })
  }

  // Update a section
  const updateSection = (groupId: string, updatedSection: Section) => {
    const updatedGroups = estimateData.groups.map((group) => {
      if (group.id === groupId) {
        const updatedSections = group.sections.map((section) =>
          section.id === updatedSection.id ? updatedSection : section,
        )
        return {
          ...group,
          sections: updatedSections,
        }
      }
      return group
    })

    setEstimateData({
      ...estimateData,
      groups: updatedGroups,
    })
  }

  // Update a subsection
  const updateSubsection = (groupId: string, sectionId: string, updatedSubsection: Subsection) => {
    const updatedGroups = estimateData.groups.map((group) => {
      if (group.id === groupId) {
        const updatedSections = group.sections.map((section) => {
          if (section.id === sectionId) {
            const updatedSubsections = section.subsections.map((subsection) =>
              subsection.id === updatedSubsection.id ? updatedSubsection : subsection,
            )
            return {
              ...section,
              subsections: updatedSubsections,
            }
          }
          return section
        })
        return {
          ...group,
          sections: updatedSections,
        }
      }
      return group
    })

    setEstimateData({
      ...estimateData,
      groups: updatedGroups,
    })
  }

  // Delete a group
  const deleteGroup = (groupId: string) => {
    const updatedGroups = estimateData.groups.filter((group) => group.id !== groupId)

    // Recalculate codes for remaining groups
    const recalculatedGroups = updatedGroups.map((group, index) => {
      const newCode = String.fromCharCode(65 + index)

      // Update sections codes
      const updatedSections = group.sections.map((section, sectionIndex) => {
        const newSectionCode = `${newCode}.${sectionIndex + 1}`

        // Update subsections codes
        const updatedSubsections = section.subsections.map((subsection, subsectionIndex) => {
          return {
            ...subsection,
            code: `${newSectionCode}.${subsectionIndex + 1}`,
          }
        })

        return {
          ...section,
          code: newSectionCode,
          subsections: updatedSubsections,
        }
      })

      return {
        ...group,
        code: newCode,
        sections: updatedSections,
      }
    })

    setEstimateData({
      ...estimateData,
      groups: recalculatedGroups,
    })
  }

  // Delete a section
  const deleteSection = (groupId: string, sectionId: string) => {
    const updatedGroups = estimateData.groups.map((group) => {
      if (group.id === groupId) {
        const updatedSections = group.sections.filter((section) => section.id !== sectionId)

        // Recalculate codes for remaining sections
        const recalculatedSections = updatedSections.map((section, index) => {
          const newSectionCode = `${group.code}.${index + 1}`

          // Update subsections codes
          const updatedSubsections = section.subsections.map((subsection, subsectionIndex) => {
            return {
              ...subsection,
              code: `${newSectionCode}.${subsectionIndex + 1}`,
            }
          })

          return {
            ...section,
            code: newSectionCode,
            subsections: updatedSubsections,
          }
        })

        return {
          ...group,
          sections: recalculatedSections,
        }
      }
      return group
    })

    setEstimateData({
      ...estimateData,
      groups: updatedGroups,
    })
  }

  // Delete a subsection
  const deleteSubsection = (groupId: string, sectionId: string, subsectionId: string) => {
    const updatedGroups = estimateData.groups.map((group) => {
      if (group.id === groupId) {
        const updatedSections = group.sections.map((section) => {
          if (section.id === sectionId) {
            const updatedSubsections = section.subsections.filter((subsection) => subsection.id !== subsectionId)

            // Recalculate codes for remaining subsections
            const recalculatedSubsections = updatedSubsections.map((subsection, index) => {
              return {
                ...subsection,
                code: `${section.code}.${index + 1}`,
              }
            })

            return {
              ...section,
              subsections: recalculatedSubsections,
            }
          }
          return section
        })
        return {
          ...group,
          sections: updatedSections,
        }
      }
      return group
    })

    setEstimateData({
      ...estimateData,
      groups: updatedGroups,
    })
  }

  // Handle successful Excel import
  const handleImportSuccess = (importedData: EstimateData) => {
    // Merge the imported data with the current estimate data
    // We keep the current estimate metadata but replace the groups
    setEstimateData({
      ...estimateData,
      groups: importedData,
    })
  }

  const { mutate,isError } = useCreateEstimate();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  mutate(estimateData, {
    onSuccess: () => {
      router.push('/estimates'); // Navigate after success
    },
    onSettled: () => {
      setIsSubmitting(false); // Reset form state
    },
    onError: (error) => {
      console.error('Failed to submit estimate:', error);
    },
  });
};

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Estimate Name</Label>
            <Input
              id="name"
              value={estimateData.name}
              onChange={(e) => handleEstimateChange("name", e.target.value)}
              placeholder="Enter estimate name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={estimateData.date}
              onChange={(e) => handleEstimateChange("date", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={estimateData.projectId} onValueChange={(value) => handleEstimateChange("projectId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem key={project._id} value={project._id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select value={estimateData.clientId} onValueChange={(value) => handleEstimateChange("clientId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients?.map((client) => (
                  <SelectItem key={client._id} value={client._id}>
                    {client.companyName}
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
            value={estimateData.description}
            onChange={(e) => handleEstimateChange("description", e.target.value)}
            placeholder="Enter estimate description"
            rows={3}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Estimate Items</h3>
          <Button type="button" variant="outline" onClick={addGroup}>
            Add Group
          </Button>
          <Button variant="outline" onClick={() => setIsImportModalOpen(true)}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Import Excel
          </Button>
        </div>

        <EstimateGroups
          groups={estimateData.groups}
          onAddSection={addSection}
          onAddSubsection={addSubsection}
          onUpdateGroup={updateGroup}
          onUpdateSection={updateSection}
          onUpdateSubsection={updateSubsection}
          onDeleteGroup={deleteGroup}
          onDeleteSection={deleteSection}
          onDeleteSubsection={deleteSubsection}
        />
      </div>

      <Separator />

      <EstimateSummary total={estimateTotal} />

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={estimateData.notes}
          onChange={(e) => handleEstimateChange("notes", e.target.value)}
          placeholder="Enter any additional notes"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/estimates")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Estimate"}
        </Button>
      </div>
      <ImportExcelModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={handleImportSuccess}
      />
    </form>
  )
}
