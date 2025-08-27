"use client"

import type React from "react"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { fetchPOById, updatePO } from "@/lib/api/Purchase-Orders"

const ItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Unit is required"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
})

const PurchaseOrderSchema = z.object({
  _id: z.string(),
  projectId: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  reference: z.string().min(1, "Reference is required"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["pending", "approved", "declined", "completed"]),
  date: z.string().min(1, "Date is required"),
  deliveryDate: z.string().min(1, "Delivery date is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  notes: z.string(),
  vendorName: z.string().min(1, "Vendor name is required"),
  vendorContact: z.string().min(1, "Contact person is required"),
  vendorEmail: z.string().email("Valid email is required"),
  vendorPhone: z.string().min(1, "Phone number is required"),
  vendorAddress: z.string().min(1, "Vendor address is required"),
  items: z.array(ItemSchema).min(1, "At least one item is required"),
  amount: z.number(),
  poNumber: z.string().min(1, "PO Number is required"),
})

type Item = z.infer<typeof ItemSchema>
type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>


export default function EditPurchaseOrder() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<PurchaseOrder | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data, isLoading, error } = useQuery({
    queryKey: ["purchase-order", "68ac54a1a6e143292281d951"],
    queryFn: () => fetchPOById("68ac54a1a6e143292281d951"),
    onSuccess: (data) => {
      setFormData(data)
    },
  })

  const updateMutation = useMutation({
    mutationFn: updatePO,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase-order"] })
      toast({
        title: "Success",
        description: "Purchase order updated successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update purchase order",
        variant: "destructive",
      })
    },
  })

  // Initialize form data when query data is available
  if (data && !formData) {
    setFormData(data)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading purchase order...</span>
        </div>
      </div>
    )
  }

  if (error || !formData) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <div className="text-center text-red-500">
          <p>Error loading purchase order</p>
        </div>
      </div>
    )
  }

  const updateField = (field: keyof PurchaseOrder, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    if (!formData) return
    const updatedItems = [...formData.items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setFormData((prev) => (prev ? { ...prev, items: updatedItems } : null))

    // Clear item-specific errors
    const errorKey = `items.${index}.${field}`
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }))
    }
  }

  const addItem = () => {
    if (!formData) return
    const newItem: Item = {
      description: "",
      quantity: 1,
      unit: "piece",
      unitPrice: 0,
    }
    setFormData((prev) => (prev ? { ...prev, items: [...prev.items, newItem] } : null))
  }

  const removeItem = (index: number) => {
    if (!formData) return
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
          }
        : null,
    )
  }

  const calculateTotal = () => {
    if (!formData) return 0
    return formData.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  }

  const validateForm = () => {
    if (!formData) return false

    try {
      const dataToValidate = { ...formData, amount: calculateTotal() }
      PurchaseOrderSchema.parse(dataToValidate)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join(".")
          newErrors[path] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    if (validateForm()) {
      const updatedData = { ...formData, amount: calculateTotal() }
      updateMutation.mutate(updatedData)
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-balance">Edit Purchase Order</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Update purchase order details and items</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="poNumber">PO Number</Label>
              <Input
                id="poNumber"
                value={formData.poNumber}
                onChange={(e) => updateField("poNumber", e.target.value)}
                className={errors.poNumber ? "border-red-500" : ""}
              />
              {errors.poNumber && <p className="text-red-500 text-sm mt-1">{errors.poNumber}</p>}
            </div>
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => updateField("reference", e.target.value)}
                className={errors.reference ? "border-red-500" : ""}
              />
              {errors.reference && <p className="text-red-500 text-sm mt-1">{errors.reference}</p>}
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} disabled>
                <SelectTrigger className="bg-muted text-muted-foreground cursor-not-allowed">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => updateField("date", e.target.value)}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => updateField("deliveryDate", e.target.value)}
                className={errors.deliveryDate ? "border-red-500" : ""}
              />
              {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={formData.projectId.name}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>
            <div>
              <Label htmlFor="projectId">Project ID</Label>
              <Input
                id="projectId"
                value={formData.projectId._id}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <Input
                id="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={(e) => updateField("deliveryAddress", e.target.value)}
                className={errors.deliveryAddress ? "border-red-500" : ""}
              />
              {errors.deliveryAddress && <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Vendor Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Vendor Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                value={formData.vendorName}
                onChange={(e) => updateField("vendorName", e.target.value)}
                className={errors.vendorName ? "border-red-500" : ""}
              />
              {errors.vendorName && <p className="text-red-500 text-sm mt-1">{errors.vendorName}</p>}
            </div>
            <div>
              <Label htmlFor="vendorContact">Contact Person</Label>
              <Input
                id="vendorContact"
                value={formData.vendorContact}
                onChange={(e) => updateField("vendorContact", e.target.value)}
                className={errors.vendorContact ? "border-red-500" : ""}
              />
              {errors.vendorContact && <p className="text-red-500 text-sm mt-1">{errors.vendorContact}</p>}
            </div>
            <div>
              <Label htmlFor="vendorEmail">Email</Label>
              <Input
                id="vendorEmail"
                type="email"
                value={formData.vendorEmail}
                onChange={(e) => updateField("vendorEmail", e.target.value)}
                className={errors.vendorEmail ? "border-red-500" : ""}
              />
              {errors.vendorEmail && <p className="text-red-500 text-sm mt-1">{errors.vendorEmail}</p>}
            </div>
            <div>
              <Label htmlFor="vendorPhone">Phone</Label>
              <Input
                id="vendorPhone"
                value={formData.vendorPhone}
                onChange={(e) => updateField("vendorPhone", e.target.value)}
                className={errors.vendorPhone ? "border-red-500" : ""}
              />
              {errors.vendorPhone && <p className="text-red-500 text-sm mt-1">{errors.vendorPhone}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="vendorAddress">Vendor Address</Label>
              <Input
                id="vendorAddress"
                value={formData.vendorAddress}
                onChange={(e) => updateField("vendorAddress", e.target.value)}
                className={errors.vendorAddress ? "border-red-500" : ""}
              />
              {errors.vendorAddress && <p className="text-red-500 text-sm mt-1">{errors.vendorAddress}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Items */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">Items</CardTitle>
            <Button type="button" onClick={addItem} size="sm" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg">
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Input
                    id={`description-${index}`}
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    className={errors[`items.${index}.description`] ? "border-red-500" : ""}
                  />
                  {errors[`items.${index}.description`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.description`]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                    className={errors[`items.${index}.quantity`] ? "border-red-500" : ""}
                  />
                  {errors[`items.${index}.quantity`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.quantity`]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`unit-${index}`}>Unit</Label>
                  <Input
                    id={`unit-${index}`}
                    value={item.unit}
                    onChange={(e) => updateItem(index, "unit", e.target.value)}
                    className={errors[`items.${index}.unit`] ? "border-red-500" : ""}
                  />
                  {errors[`items.${index}.unit`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.unit`]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`unitPrice-${index}`}>Unit Price</Label>
                  <Input
                    id={`unitPrice-${index}`}
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                    className={errors[`items.${index}.unitPrice`] ? "border-red-500" : ""}
                  />
                  {errors[`items.${index}.unitPrice`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`items.${index}.unitPrice`]}</p>
                  )}
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="text-right">
              <p className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Additional notes..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Button type="button" variant="outline" className="w-full sm:w-auto bg-transparent">
            Cancel
          </Button>
          <Button type="submit" disabled={updateMutation.isPending} className="w-full sm:w-auto">
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
