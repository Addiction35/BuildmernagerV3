"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useProjects } from "@/lib/hooks/projectQueries"
import axiosInstance from "@/lib/axios"
import { AutocompleteInput } from "../AutoCompleteItems"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import TextField from "@mui/material/TextField"
import dayjs from "dayjs"
import { useToast } from "@/hooks/use-toast" // Import useToast
import { useCreateExpense } from "@/lib/hooks/expenseQueries"

const itemSchema = z.object({
  description: z.string().min(1),
  quantity: z.coerce.number().min(1),
  unit: z.string(),
  unitPrice: z.coerce.number().nonnegative(),
})

const formSchema = z.object({
  expenseNumber: z.string().optional(),
  reference: z.string().optional(),
  projectId: z.string().min(1),
  company: z.string().min(1),
  status: z.enum(["pending", "in-transit", "delivered"]),
  date: z.date(), // This is the start date, must be a Date object
  deliveryDate: z.date(), // Must be a Date object
  deliveryAddress: z.string(),
  notes: z.string().optional(),
  vendorName: z.string().min(1),
  vendorContact: z.string().optional(),
  vendorEmail: z.string().optional(),
  vendorPhone: z.string().optional(),
  vendorAddress: z.string().optional(),
  items: z.array(itemSchema).min(1),
})

type FormValues = z.infer<typeof formSchema>

export function ExpenseForm() {
  const router = useRouter()
  const { data: projects } = useProjects()
  const { mutate, isLoading: isCreating } = useCreateExpense()
  const [vendorQuery, setVendorQuery] = useState("")
  const [vendorSuggestions, setVendorSuggestions] = useState<any[]>([])
  const { toast } = useToast() // Initialize useToast

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseNumber: "",
      reference: "",
      projectId: "",
      date: null, // Initialize with current date for immediate selection
      deliveryDate: null, // Initialize with current date for immediate selection
      status: "pending",
      company: "",
      deliveryAddress: "",
      notes: "",
      vendorName: "",
      vendorContact: "",
      vendorEmail: "",
      vendorPhone: "",
      vendorAddress: "",
      items: [{ description: "", quantity: 1, unit: "", unitPrice: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const items = watch("items")
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0)
  const tax = subtotal * 0.1
  const shipping = 0
  const total = subtotal + tax + shipping

  useEffect(() => {
    const delay = setTimeout(() => {
      if (vendorQuery.length > 1) {
        fetchVendors(vendorQuery)
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [vendorQuery])

  const fetchVendors = async (query: string) => {
    try {
      const res = await axiosInstance.get("/vendors/search", {
        params: { q: query },
      })
      setVendorSuggestions(res.data)
    } catch (err) {
      console.error("Vendor fetch error:", err)
    }
  }
  const onSubmit = (data: FormValues) => {
    console.log("Form data before formatting:", data)
    // Destructure `expenseNumber` out of `data` and remove `subtotal`, `tax`, `total` from the payload.
    const { expenseNumber, ...restOfData } = data
    const payload = {
      ...restOfData,
      date: restOfData.date.toISOString(),
      deliveryDate: restOfData.deliveryDate.toISOString(),
    }
    mutate(payload, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Expense created successfully.",
        })
        router.push("/expenses")
      },
      onError: (err) => {
        console.error("Create failed:", err)
        toast({
          title: "Error",
          description: "Failed to create . Please try again.",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="vendor">Vendor</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
          </TabsList>
          {/* GENERAL TAB */}
          <TabsContent value="general" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* PO Number */}
              <div className="space-y-2">
                <Label htmlFor="expenseNumber">Expense Number</Label>
                <Input id="expenseNumber" {...register("expenseNumber")} disabled />
                {errors.expenseNumber && <p className="text-sm text-red-500">{errors.expenseNumber.message}</p>}
              </div>
              {/* Start & Delivery Dates in One Row */}
              <div className="grid grid-cols-1 grid-cols-2  py-2 space-x-2  p-0">
                {/* Start Date */}
                <div className="">
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Start Date"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) => {
                          field.onChange(newValue ? newValue.toDate() : null)
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth error={!!errors.date} helperText={errors.date?.message} />
                        )}
                      />
                    )}
                  />
                </div>
                {/* Delivery Date */}
                <div className="">
                  <Controller
                    name="deliveryDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Delivery Date"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) => {
                          field.onChange(newValue ? newValue.toDate() : null)
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!errors.deliveryDate}
                            helperText={errors.deliveryDate?.message}
                          />
                        )}
                      />
                    )}
                  />
                </div>
              </div>
              {/* Reference (optional) */}
              <div className="space-y-2">
                <Label htmlFor="reference">Reference</Label>
                <Input id="reference" {...register("reference")} />
              </div>
              {/* Project Select */}
              <div className="space-y-2">
                <Label htmlFor="projectId">Project</Label>
                <Controller
                  control={control}
                  name="projectId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="projectId">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {projects?.map((project) => (
                          <SelectItem key={project._id} value={project._id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.projectId && <p className="text-sm text-red-500">{errors.projectId.message}</p>}
              </div>
              {/* Status Select */}
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
                      <SelectContent className="bg-white">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {/* Company Select */}
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
                      <SelectContent className="bg-white">
                        <SelectItem value="AcmeCo">Acme Co.</SelectItem>
                        <SelectItem value="Globex">Globex Corporation</SelectItem>
                        <SelectItem value="Soylent">Soylent Ltd.</SelectItem>
                        <SelectItem value="Initech">Initech</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {/* Delivery Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Textarea id="deliveryAddress" {...register("deliveryAddress")} />
              </div>
              {/* Notes */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" {...register("notes")} />
              </div>
            </div>
          </TabsContent>
          {/* VENDOR TAB */}
          <TabsContent value="vendor" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 relative">
                <Label>Vendor Name</Label>
                <Input
                  {...register("vendorName")}
                  onChange={(e) => {
                    const val = e.target.value
                    setValue("vendorName", val)
                    setVendorQuery(val)
                  }}
                />
                {vendorSuggestions.length > 0 && (
                  <ul className="absolute z-20 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow">
                    {vendorSuggestions.map((vendor) => (
                      <li
                        key={vendor._id}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                        onClick={() => {
                          setValue("vendorName", vendor.companyName)
                          setValue("vendorContact", vendor.contactPerson)
                          setValue("vendorEmail", vendor.email)
                          setValue("vendorPhone", vendor.phone)
                          setValue("vendorAddress", vendor.address)
                          setVendorSuggestions([])
                        }}
                      >
                        {vendor.companyName} — {vendor.contactPerson}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="space-y-2">
                <Label>Contact Person</Label>
                <Input {...register("vendorContact")} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" {...register("vendorEmail")} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input {...register("vendorPhone")} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Address</Label>
                <Textarea {...register("vendorAddress")} />
              </div>
            </div>
          </TabsContent>
          {/* ITEMS TAB */}
          <TabsContent value="items" className="space-y-4 pt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-12 gap-4 font-medium">
                  <div className="col-span-5 min-w-0">Description</div>
                  <div className="col-span-2 text-center min-w-0">Quantity</div>
                  <div className="col-span-2 min-w-0">Unit</div>
                  <div className="col-span-2 text-right min-w-0">Unit Price</div>
                  <div className="col-span-1" />
                </div>
                {fields.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5 min-w-0">
                      <Controller
                        control={control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                          <AutocompleteInput
                            value={field.value}
                            onChange={field.onChange}
                            onSelect={(selectedItem) => {
                              setValue(`items.${index}.description`, selectedItem.description)
                              setValue(`items.${index}.unit`, selectedItem.unit)
                              setValue(`items.${index}.unitPrice`, selectedItem.unitPrice)
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-2 min-w-0">
                      <Input type="number" {...register(`items.${index}.quantity`)} />
                    </div>
                    <div className="col-span-2 min-w-0">
                      <Input {...register(`items.${index}.unit`)} />
                    </div>
                    <div className="col-span-2 min-w-0">
                      <Input type="number" step="0.01" {...register(`items.${index}.unitPrice`)} />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ description: "", quantity: 1, unit: "", unitPrice: 0 })}
                >
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
          <Button type="button" variant="outline" onClick={() => router.push("/expenses")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Expense"}
          </Button>
        </div>
      </form>
    </LocalizationProvider>
  )
}
