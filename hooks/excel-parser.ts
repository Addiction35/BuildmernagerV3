import * as XLSX from "xlsx"
import type { EstimateData, Group, Section, Subsection } from "@/types/estimate"

export async function parseExcelToEstimate(buffer: Buffer): Promise<EstimateData> {
  // Read the Excel file
  const workbook = XLSX.read(buffer, { type: "buffer" })

  // Assume the first sheet contains the estimate data
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  // Convert to JSON
  const data = XLSX.utils.sheet_to_json(worksheet)

  if (!data || data.length === 0) {
    throw new Error("Excel file is empty or has invalid format")
  }

  // Initialize the estimate data structure
  const estimateData: EstimateData = {
    id: "",
    name: "",
    projectId: "",
    clientId: "",
    date: new Date().toISOString().split("T")[0],
    status: "Draft",
    description: "",es
    notes: "",
    groups: [],
  }

  // Extract metadata from the first row if available
  const firstRow = data[0] as any
  if (firstRow.EstimateName) estimateData.name = firstRow.EstimateName
  if (firstRow.ProjectId) estimateData.projectId = firstRow.ProjectId
  if (firstRow.ClientId) estimateData.clientId = firstRow.ClientId
  if (firstRow.Date) {
    // Convert Excel date to ISO string if it's a date
    try {
      const date = new Date(firstRow.Date)
      if (!isNaN(date.getTime())) {
        estimateData.date = date.toISOString().split("T")[0]
      }
    } catch (e) {
      // If date parsing fails, keep the default
    }
  }
  if (firstRow.Description) estimateData.description = firstRow.Description
  if (firstRow.Notes) estimateData.notes = firstRow.Notes

  // Process the rows to build the hierarchical structure
  const groupMap = new Map<string, Group>()
  const sectionMap = new Map<string, Section>()

  // Process each row
  data.forEach((row: any, index: number) => {
    // Skip if this is a header row or doesn't have required fields
    if (!row.Code || !row.Name) return

    const code = row.Code.toString()
    const parts = code.split(".")

    // Determine the level (group, section, or subsection)
    if (parts.length === 1) {
      // This is a group (e.g., "A")
      const groupId = `group-${Date.now()}-${index}`
      const group: Group = {
        id: groupId,
        code: code,
        name: row.Name,
        description: row.Description || "",
        quantity: Number.parseFloat(row.Quantity) || 1,
        unit: row.Unit || "LS",
        rate: Number.parseFloat(row.Rate) || 0,
        amount: Number.parseFloat(row.Amount) || 0,
        sections: [],
      }

      groupMap.set(code, group)
      estimateData.groups.push(group)
    } else if (parts.length === 2) {
      // This is a section (e.g., "A.1")
      const groupCode = parts[0]
      const group = groupMap.get(groupCode)

      if (group) {
        const sectionId = `section-${Date.now()}-${index}`
        const section: Section = {
          id: sectionId,
          code: code,
          name: row.Name,
          description: row.Description || "",
          quantity: Number.parseFloat(row.Quantity) || 1,
          unit: row.Unit || "LS",
          rate: Number.parseFloat(row.Rate) || 0,
          amount: Number.parseFloat(row.Amount) || 0,
          subsections: [],
        }

        sectionMap.set(code, section)
        group.sections.push(section)
      }
    } else if (parts.length === 3) {
      // This is a subsection (e.g., "A.1.1")
      const sectionCode = `${parts[0]}.${parts[1]}`
      const section = sectionMap.get(sectionCode)

      if (section) {
        const subsection: Subsection = {
          id: `subsection-${Date.now()}-${index}`,
          code: code,
          name: row.Name,
          description: row.Description || "",
          quantity: Number.parseFloat(row.Quantity) || 1,
          unit: row.Unit || "EA",
          rate: Number.parseFloat(row.Rate) || 0,
          amount: Number.parseFloat(row.Amount) || 0,
        }

        section.subsections.push(subsection)
      }
    }
  })

  // Calculate amounts for sections and groups
  estimateData.groups.forEach((group) => {
    let groupTotal = 0

    group.sections.forEach((section) => {
      let sectionTotal = 0

      section.subsections.forEach((subsection) => {
        // Ensure amount is calculated correctly
        subsection.amount = subsection.quantity * subsection.rate
        sectionTotal += subsection.amount
      })

      section.amount = sectionTotal
      groupTotal += sectionTotal
    })

    group.amount = groupTotal
  })

  return estimateData
}
