"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export function WageForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [items, setItems] = useState([{ id: 1, description: "", quantity: 1, unit: "Hours", unitPrice: 0 }])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to wages page
    router.push("/wages")
  }

  const addItem = () => {
    setItems([...items, { id: items.length + 1, description: "", quantity: 1, unit: "Hours", unitPrice: 0 }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="reference">Reference Number</Label>
          <Input id="reference" placeholder="Enter reference number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Wage Date</Label>
          <DatePicker />
        </div>
        <div className="space-y-2">
          <Label htmlFor="worker">Worker Name</Label>
          <Input id="worker" placeholder="Enter worker name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project">Project</Label>
          <Select>
            <SelectTrigger id="project">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PRJ001">Riverside Apartments</SelectItem>
              <SelectItem value="PRJ002">Downtown Office Renovation</SelectItem>
              <SelectItem value="PRJ003">Hillside Residence</SelectItem>
              <SelectItem value="PRJ004">Community Center</SelectItem>
              <SelectItem value="PRJ005">Retail Store Fitout</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue="pending">
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="payment-method">Payment Method</Label>
          <Select>
            <SelectTrigger id="payment-method">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="direct-deposit">Direct Deposit</SelectItem>
              <SelectItem value="check">Check</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Wage Items</Label>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 font-medium">
                <div className="col-span-5">Description</div>
                <div className="col-span-2 text-center">Hours</div>
                <div className="col-span-2">Unit</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-1"></div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <Input placeholder="Work description" />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" min="1" defaultValue="1" className="text-center" />
                  </div>
                  <div className="col-span-2">
                    <Input placeholder="Hours" defaultValue="Hours" />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" min="0" step="0.01" defaultValue="0.00" className="text-right" />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                Add Item
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" placeholder="Enter any additional notes" className="min-h-32" />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/wages")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Wage Record"}
        </Button>
      </div>
    </form>
  )
}
