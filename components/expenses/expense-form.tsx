// components/forms/ExpenseForm.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { AutocompleteInput } from "../AutoCompleteItems"

const itemSchema = z.object({
  id: z.number(),
  description: z.string().min(1, "Required"),
  quantity: z.coerce.number().min(1),
  unit: z.string(),
  unitPrice: z.coerce.number().min(0),
})

const formSchema = z.object({
  reference: z.string().optional(),
  date: z.date().optional(),
  vendor: z.string().min(1),
  project: z.string().min(1),
  company: z.string().min(1),
  billed: z.enum(["billed", "unbilled"]),
  status: z.string().min(1),
  notes: z.string().optional(),
  vatRate: z.coerce.number().min(0).max(100),
  items: z.array(itemSchema).min(1),
})


type FormData = z.infer<typeof formSchema>

export function ExpenseForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vatRate: 5,
      billed: "unbilled",
      company: "",
      items: [{ id: 1, description: "", quantity: 1, unit: "", unitPrice: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({ name: "items", control })
  const watchedItems = useWatch({ control, name: "items" })
  const watchedVatRate = useWatch({ control, name: "vatRate" }) || 0

  const subtotal = watchedItems?.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0
    const price = Number(item.unitPrice) || 0
    return sum + qty * price
  }, 0) || 0

  const vatAmount = (subtotal * watchedVatRate) / 100
  const totalWithVat = subtotal + vatAmount

  const onSubmit = async (data: FormData) => {
    console.log("Submitting:", data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/expenses")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="reference">Reference Number</Label>
          <Input id="reference" {...register("reference")} placeholder="Enter reference number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Expense Date</Label>
          <Controller control={control} name="date" render={({ field }) => <DatePicker {...field} />} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input id="vendor" {...register("vendor")} placeholder="Enter vendor name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project">Project</Label>
          <Controller
            control={control}
            name="project"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {["PRJ001", "PRJ002", "PRJ003", "PRJ004", "PRJ005"].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Controller
            control={control}
            name="company"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AcmeCo">Acme Co.</SelectItem>
                  <SelectItem value="Globex">Globex Corporation</SelectItem>
                  <SelectItem value="Soylent">Soylent Ltd.</SelectItem>
                  <SelectItem value="Initech">Initech</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="billed">Billed Status</Label>
          <Controller
            control={control}
            name="billed"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="billed">
                  <SelectValue placeholder="Select billing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="billed">Billed</SelectItem>
                  <SelectItem value="unbilled">Unbilled</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {["pending", "approved", "rejected"].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Expense Items</Label>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-12 gap-4 font-medium">
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2">Unit</div>
              <div className="col-span-2 text-right">Unit Price</div>
              <div className="col-span-1"></div>
            </div>

            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <Controller
                    control={control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <AutocompleteInput
                        value={field.value}
                        onChange={field.onChange}
                        onSelect={(selectedItem) => {
                          field.onChange(selectedItem.description)
                          setValue(`items.${index}.unit`, selectedItem.unit)
                          setValue(`items.${index}.unitPrice`, selectedItem.unitPrice)
                        }}
                      />
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    className="text-center"
                    {...register(`items.${index}.quantity`)}
                    min={1}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Unit"
                    {...register(`items.${index}.unit`)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    className="text-right"
                    {...register(`items.${index}.unitPrice`)}
                    min={0}
                    step="0.01"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} disabled={fields.length === 1}>
                    ×
                  </Button>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" size="sm" onClick={() => append({ id: fields.length + 1, description: "", quantity: 1, unit: "", unitPrice: 0 })}>
              Add Item
            </Button>

            <hr className="my-4" />

            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center gap-4">
                <Label htmlFor="vatRate">VAT (%)</Label>
                <Input
                  id="vatRate"
                  type="number"
                  {...register("vatRate")}
                  className="w-24 text-right"
                  min={0}
                  max={100}
                  step="0.01"
                />
              </div>
              <div className="text-sm text-muted-foreground">Subtotal: ${subtotal.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">VAT: ${vatAmount.toFixed(2)}</div>
              <div className="text-lg font-bold">Total: ${totalWithVat.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" {...register("notes")} placeholder="Enter any additional notes" className="min-h-32" />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/expenses")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Expense"}
        </Button>
      </div>
    </form>
  )
}
