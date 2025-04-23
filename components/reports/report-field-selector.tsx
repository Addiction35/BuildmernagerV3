"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ArrowDown, ArrowUp, Search } from "lucide-react"

export function ReportFieldSelector() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "project_name",
    "project_status",
    "total_budget",
    "total_expenses",
  ])

  // Mock data for available fields
  const availableFields = [
    { id: "project_name", label: "Project Name", category: "Projects" },
    { id: "project_status", label: "Project Status", category: "Projects" },
    { id: "project_start_date", label: "Start Date", category: "Projects" },
    { id: "project_end_date", label: "End Date", category: "Projects" },
    { id: "client_name", label: "Client Name", category: "Projects" },
    { id: "client_contact", label: "Client Contact", category: "Projects" },
    { id: "total_budget", label: "Total Budget", category: "Financial" },
    { id: "total_expenses", label: "Total Expenses", category: "Financial" },
    { id: "budget_variance", label: "Budget Variance", category: "Financial" },
    { id: "expense_category", label: "Expense Category", category: "Expenses" },
    { id: "expense_amount", label: "Expense Amount", category: "Expenses" },
    { id: "expense_date", label: "Expense Date", category: "Expenses" },
    { id: "vendor_name", label: "Vendor Name", category: "Purchase Orders" },
    { id: "po_amount", label: "PO Amount", category: "Purchase Orders" },
    { id: "po_status", label: "PO Status", category: "Purchase Orders" },
    { id: "employee_name", label: "Employee Name", category: "Wages" },
    { id: "hours_worked", label: "Hours Worked", category: "Wages" },
    { id: "hourly_rate", label: "Hourly Rate", category: "Wages" },
    { id: "task_name", label: "Task Name", category: "Tasks" },
    { id: "task_status", label: "Task Status", category: "Tasks" },
    { id: "task_assignee", label: "Task Assignee", category: "Tasks" },
  ]

  const filteredFields = availableFields.filter(
    (field) =>
      field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleField = (fieldId: string) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter((id) => id !== fieldId))
    } else {
      setSelectedFields([...selectedFields, fieldId])
    }
  }

  const moveField = (fieldId: string, direction: "up" | "down") => {
    const index = selectedFields.indexOf(fieldId)
    if (index === -1) return

    const newSelectedFields = [...selectedFields]
    if (direction === "up" && index > 0) {
      ;[newSelectedFields[index], newSelectedFields[index - 1]] = [
        newSelectedFields[index - 1],
        newSelectedFields[index],
      ]
    } else if (direction === "down" && index < selectedFields.length - 1) {
      ;[newSelectedFields[index], newSelectedFields[index + 1]] = [
        newSelectedFields[index + 1],
        newSelectedFields[index],
      ]
    }

    setSelectedFields(newSelectedFields)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Report Fields</CardTitle>
        <CardDescription>Choose the fields you want to include in your report</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search fields..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="font-medium">Available Fields</div>
            <div className="max-h-[400px] space-y-2 overflow-y-auto rounded-md border p-4">
              {filteredFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`field-${field.id}`}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => toggleField(field.id)}
                  />
                  <label
                    htmlFor={`field-${field.id}`}
                    className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label}
                    <span className="ml-2 text-xs text-muted-foreground">{field.category}</span>
                  </label>
                </div>
              ))}
              {filteredFields.length === 0 && (
                <div className="py-2 text-center text-sm text-muted-foreground">No fields found</div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-medium">Selected Fields</div>
            <div className="max-h-[400px] space-y-2 overflow-y-auto rounded-md border p-4">
              {selectedFields.length === 0 ? (
                <div className="py-2 text-center text-sm text-muted-foreground">No fields selected</div>
              ) : (
                selectedFields.map((fieldId, index) => {
                  const field = availableFields.find((f) => f.id === fieldId)
                  if (!field) return null

                  return (
                    <div key={field.id} className="flex items-center justify-between space-x-2 rounded-md border p-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`selected-${field.id}`}
                          checked={true}
                          onCheckedChange={() => toggleField(field.id)}
                        />
                        <label
                          htmlFor={`selected-${field.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {field.label}
                          <span className="ml-2 text-xs text-muted-foreground">{field.category}</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => moveField(field.id, "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-3 w-3" />
                          <span className="sr-only">Move up</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => moveField(field.id, "down")}
                          disabled={index === selectedFields.length - 1}
                        >
                          <ArrowDown className="h-3 w-3" />
                          <span className="sr-only">Move down</span>
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
