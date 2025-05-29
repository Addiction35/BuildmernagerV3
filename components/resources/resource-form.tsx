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
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function ResourceForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [purchaseDate, setPurchaseDate] = useState<Date>()
  const [warrantyExpiry, setWarrantyExpiry] = useState<Date>()
  const [lastMaintenance, setLastMaintenance] = useState<Date>()
  const [nextMaintenance, setNextMaintenance] = useState<Date>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would submit the form data to your API
    console.log("Resource created successfully")

    setIsLoading(false)
    router.push("/resources")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the basic details for your resource</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="resourceName">Resource Name</Label>
              <Input id="resourceName" name="resourceName" placeholder="e.g., Excavator CAT 320" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input id="serialNumber" name="serialNumber" placeholder="e.g., CAT320-2024-001" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="vehicles">Vehicles</SelectItem>
                  <SelectItem value="safety">Safety Equipment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input id="type" name="type" placeholder="e.g., Heavy Equipment" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue="available">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="in-use">In Use</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="out-of-service">Out of Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quantity">Total Quantity</Label>
              <Input id="quantity" name="quantity" type="number" min="1" defaultValue="1" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="available">Available Quantity</Label>
              <Input id="available" name="available" type="number" min="0" defaultValue="1" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" placeholder="e.g., Main Warehouse, Site A" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier/Vendor</Label>
            <Input id="supplier" name="supplier" placeholder="e.g., Heavy Equipment Rentals Inc." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a description for this resource..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specifications">Specifications</Label>
            <Textarea
              id="specifications"
              name="specifications"
              placeholder="Enter technical specifications..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Information</CardTitle>
          <CardDescription>Set the cost rates for this resource</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="costPerHour">Cost per Hour ($)</Label>
              <Input id="costPerHour" name="costPerHour" type="number" step="0.01" min="0" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costPerDay">Cost per Day ($)</Label>
              <Input id="costPerDay" name="costPerDay" type="number" step="0.01" min="0" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costPerMonth">Cost per Month ($)</Label>
              <Input id="costPerMonth" name="costPerMonth" type="number" step="0.01" min="0" placeholder="0.00" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dates & Maintenance</CardTitle>
          <CardDescription>Important dates for tracking and maintenance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Purchase Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !purchaseDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {purchaseDate ? format(purchaseDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={purchaseDate} onSelect={setPurchaseDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Warranty Expiry</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !warrantyExpiry && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {warrantyExpiry ? format(warrantyExpiry, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={warrantyExpiry} onSelect={setWarrantyExpiry} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Last Maintenance</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !lastMaintenance && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lastMaintenance ? format(lastMaintenance, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={lastMaintenance} onSelect={setLastMaintenance} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Next Maintenance</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !nextMaintenance && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {nextMaintenance ? format(nextMaintenance, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={nextMaintenance} onSelect={setNextMaintenance} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Resource"}
        </Button>
      </div>
    </form>
  )
}