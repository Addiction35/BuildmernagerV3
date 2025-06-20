"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useProjects } from "@/lib/hooks/projectQueries"
import axiosInstance from "@/lib/axios"

export function PurchaseOrderForm() {
  const router = useRouter()
  const { data: projects, isLoading } = useProjects()
  const [vendorQuery, setVendorQuery] = useState("")
  const [vendorSuggestions, setVendorSuggestions] = useState([])
  
  useEffect(() => {
    const delay = setTimeout(() => {
      if (vendorQuery.length > 1) {
        fetchVendors(vendorQuery)
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [vendorQuery])
  
  const fetchVendors = async (query) => {
    try {
      const res = await axiosInstance.get("/vendors/search", {
        params: { q: query }
      })
      setVendorSuggestions(res.data)
    } catch (err) {
      console.error("Error fetching vendor suggestions:", err)
    }
  }
  


  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    poNumber: "",
    reference: "",
    projectId: "",
    status: "pending",
    deliveryAddress: "",
    notes: "",
    vendorName: "",
    vendorContact: "",
    vendorEmail: "",
    vendorPhone: "",
    vendorAddress: "",
  })

  const [items, setItems] = useState([{ id: 1, description: "", quantity: 1, unit: "", unitPrice: 0 }])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (id: number, field: string, value: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: field === "quantity" || field === "unitPrice" ? Number(value) : value } : item
      )
    )
  }

  const addItem = () => {
    setItems([...items, { id: items.length + 1, description: "", quantity: 1, unit: "", unitPrice: 0 }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect
    router.push("/purchase-orders")
  }

  const subtotal = calculateSubtotal()
  const tax = subtotal * 0.1
  const shipping = 0
  const total = subtotal + tax + shipping

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="vendor">Vendor</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
        </TabsList>

        {/* GENERAL TAB */}
        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="po-number">PO Number</Label>
              <Input
                id="po-number"
                placeholder="Enter PO number"
                value={formData.poNumber}
                onChange={(e) => handleChange("poNumber", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                placeholder="Enter reference"
                value={formData.reference}
                onChange={(e) => handleChange("reference", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select
                value={formData.projectId}
                onValueChange={(value) => handleChange("projectId", value)}
              >
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
              <Label htmlFor="delivery-date">Delivery Date</Label>
              <DatePicker />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
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
              <Textarea
                id="delivery-address"
                placeholder="Enter delivery address"
                value={formData.deliveryAddress}
                onChange={(e) => handleChange("deliveryAddress", e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        {/* VENDOR TAB */}
        <TabsContent value="vendor" className="space-y-4 pt-4">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {/* Vendor Name with autocomplete */}
    <div className="space-y-2 relative">
      <Label htmlFor="vendor-name">Vendor Name</Label>
      <Input
        id="vendor-name"
        value={formData.vendorName}
        onChange={(e) => {
          const value = e.target.value
          handleChange("vendorName", value)
          setVendorQuery(value) // state for search
        }}
        autoComplete="off"
        required
      />
      {vendorSuggestions.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto shadow-md">
          {vendorSuggestions.map((vendor) => (
            <li
              key={vendor._id}
              onClick={() => {
                handleChange("vendorName", vendor.companyName)
                handleChange("vendorContact", vendor.contactPerson)
                handleChange("vendorEmail", vendor.email)
                handleChange("vendorPhone", vendor.phone)
                handleChange("vendorAddress", vendor.address)
                setVendorSuggestions([])
              }}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
            >
              {vendor.companyName} — {vendor.contactPerson}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Contact Person */}
    <div className="space-y-2">
      <Label htmlFor="vendor-contact">Contact Person</Label>
      <Input
        id="vendor-contact"
        value={formData.vendorContact}
        onChange={(e) => handleChange("vendorContact", e.target.value)}
      />
    </div>

    {/* Email */}
    <div className="space-y-2">
      <Label htmlFor="vendor-email">Email</Label>
      <Input
        id="vendor-email"
        type="email"
        value={formData.vendorEmail}
        onChange={(e) => handleChange("vendorEmail", e.target.value)}
      />
    </div>

    {/* Phone */}
    <div className="space-y-2">
      <Label htmlFor="vendor-phone">Phone</Label>
      <Input
        id="vendor-phone"
        value={formData.vendorPhone}
        onChange={(e) => handleChange("vendorPhone", e.target.value)}
      />
    </div>

    {/* Address */}
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="vendor-address">Address</Label>
      <Textarea
        id="vendor-address"
        value={formData.vendorAddress}
        onChange={(e) => handleChange("vendorAddress", e.target.value)}
      />
    </div>
  </div>
</TabsContent>
        {/* ITEMS TAB */}
        <TabsContent value="items" className="space-y-4 pt-4">
          <Card>
            <CardContent className="p-4 space-y-4">
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
                    <Input
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      className="text-center"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="Unit"
                      value={item.unit}
                      onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      className="text-right"
                      value={item.unitPrice}
                      min={0}
                      step="0.01"
                      onChange={(e) => handleItemChange(item.id, "unitPrice", e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item.id)} disabled={items.length === 1}>
                      ×
                    </Button>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                Add Item
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
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
