"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface BudgetCategory {
  id: string
  name: string
  amount: number
}

export function BudgetForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: "1", name: "Labor", amount: 0 },
    { id: "2", name: "Materials", amount: 0 },
    { id: "3", name: "Equipment", amount: 0 },
  ])

  const addCategory = () => {
    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name: "",
      amount: 0,
    }
    setCategories([...categories, newCategory])
  }

  const removeCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const updateCategory = (id: string, field: keyof BudgetCategory, value: string | number) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat)))
  }

  const totalBudget = categories.reduce((sum, cat) => sum + cat.amount, 0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would submit the form data to your API
    console.log("Budget created successfully")

    setIsLoading(false)
    router.push("/budgets")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Budget Information</CardTitle>
          <CardDescription>Enter the basic information for your construction budget</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budgetName">Budget Name</Label>
              <Input id="budgetName" name="budgetName" placeholder="e.g., Office Building Construction" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" name="projectName" placeholder="e.g., Downtown Office Complex" required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="active">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a description for this budget..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Break down your budget by categories</CardDescription>
            </div>
            <Button type="button" variant="outline" onClick={addCategory}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Category name"
                  value={category.name}
                  onChange={(e) => updateCategory(category.id, "name", e.target.value)}
                  required
                />
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={category.amount || ""}
                  onChange={(e) => updateCategory(category.id, "amount", Number.parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              {categories.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeCategory(category.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Budget:</span>
              <span className="text-2xl font-bold">${totalBudget.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Budget"}
        </Button>
      </div>
    </form>
  )
}
