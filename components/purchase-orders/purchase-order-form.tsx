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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function PurchaseOrderForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [items, setItems] = useState([{ id: 1, description: "", quantity: 1, unit: "", unitPrice: 0 }])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to purchase orders page
    router.push("/purchase-orders")
  }

  const addItem = () => {
    setItems([...items, { id: items.length + 1, description: "", quantity: 1, unit: "", unitPrice: 0 }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="vendor">Vendor</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="po-number">PO Number</Label>
              <Input id="po-number" placeholder="Enter PO number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input id="reference" placeholder="Enter reference" />
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
              <Label htmlFor="delivery-date">Delivery Date</Label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="pending">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="delivery-address">Delivery Address</Label>
              <Textarea id="delivery-address" placeholder="Enter delivery address" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter any additional notes" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vendor" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendor-name">Vendor Name</Label>
              <Input id="vendor-name" placeholder="Enter vendor name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor-contact">Contact Person</Label>
              <Input id="vendor-contact" placeholder="Enter contact person" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor-email">Email</Label>
              <Input id="vendor-email" type="email" placeholder="Enter email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor-phone">Phone</Label>
              <Input id="vendor-phone" placeholder="Enter phone number" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="vendor-address">Address</Label>
              <Textarea id="vendor-address" placeholder="Enter vendor address" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="items" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Purchase Order Items</Label>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-4 font-medium">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2">Unit</div>
                    <div className="col-span-2 text-right">Unit Price</div>
                    <div className="col-span-1"></div>
                  </div>

                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-5">
                        <Input placeholder="Item description" />
                      </div>
                      <div className="col-span-2">
                        <Input type="number" min="1" defaultValue="1" className="text-center" />
                      </div>
                      <div className="col-span-2">
                        <Input placeholder="Unit" />
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

          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Tax (10%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/purchase-orders")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Purchase Order"}
        </Button>
      </div>
    </form>
  )
}
