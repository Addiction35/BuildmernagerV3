"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, useFieldArray } from "react-hook-form"
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
import { useToast } from "@/hooks/use-toast"
import { useCreateWage } from "@/lib/hooks/wagesQueries"
import { format } from "date-fns"

type Item = {
  description: string
  quantity: number
  unit: string
  unitPrice: number
}

type FormValues = {
  wageNumber?: string
  reference?: string
  projectId: string
  company: string
  date: Date | null
  deliveryDate: Date | null
  deliveryAddress: string
  notes?: string
  vendorName: string
  vendorContact?: string
  vendorEmail?: string
  vendorPhone?: string
  vendorAddress?: string
  items: Item[]
}

export function WagesForm() {
  const router = useRouter()
  const { data: projects } = useProjects()
  const { mutate, isLoading: isCreating } = useCreateWage()
  const [vendorQuery, setVendorQuery] = useState("")
  const [vendorSuggestions, setVendorSuggestions] = useState<any[]>([])
  const { toast } = useToast()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      wageNumber: "",
      reference: "",
      projectId: "",
      company: "",
      date: null,
      deliveryDate: null,
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

  const { fields, append, remove } = useFieldArray({ control, name: "items" })

  const items = watch("items")
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  useEffect(() => {
    const delay = setTimeout(() => {
      if (vendorQuery.length > 1) fetchVendors(vendorQuery)
    }, 300)
    return () => clearTimeout(delay)
  }, [vendorQuery])

  const fetchVendors = async (query: string) => {
    try {
      const res = await axiosInstance.get("/vendors/search", { params: { q: query } })
      setVendorSuggestions(res.data)
    } catch (err) {
      console.error("Vendor fetch error:", err)
    }
  }

  const onSubmit = (data: FormValues) => {
    const { wageNumber, ...rest } = data
    const payload = {
      ...rest,
      date: rest.date?.toISOString(),
      deliveryDate: rest.deliveryDate?.toISOString(),
      amount: total,
    }
    mutate(payload, {
      onSuccess: () => {
        toast({ title: "Success", description: "Wage created successfully." })
        router.push("/wages")
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to create wage. Please try again.",
          variant: "destructive",
        })
      },
    })
  }

  return (
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
            <div>
              <Label>Wage Number</Label>
              <Input {...register("wageNumber")} placeholder="WG-001 (auto generated)" disabled />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  )}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
              </div>

              <div>
                <Label>Delivery Date</Label>
                <Controller
                  control={control}
                  name="deliveryDate"
                  rules={{ required: "Delivery date is required" }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  )}
                />
                {errors.deliveryDate && <p className="text-red-500 text-sm">{errors.deliveryDate.message}</p>}
              </div>
            </div>

            <div>
              <Label>Reference</Label>
              <Input {...register("reference")} />
            </div>

            <div>
              <Label>Project</Label>
              <Controller
                control={control}
                name="projectId"
                rules={{ required: "Project is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
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
                )}
              />
              {errors.projectId && <p className="text-red-500 text-sm">{errors.projectId.message}</p>}
            </div>

            <div>
              <Label>Company</Label>
              <Controller
                control={control}
                name="company"
                rules={{ required: "Company is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
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
              {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
            </div>

            <div className="md:col-span-2">
              <Label>Delivery Address</Label>
              <Textarea {...register("deliveryAddress", { required: "Delivery address is required" })} />
              {errors.deliveryAddress && (
                <p className="text-red-500 text-sm">{errors.deliveryAddress.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label>Notes</Label>
              <Textarea {...register("notes")} />
            </div>
          </div>
        </TabsContent>

        {/* VENDOR TAB */}
        <TabsContent value="vendor" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative">
              <Label>Vendor Name</Label>
              <Input
                {...register("vendorName", { required: "Vendor name is required" })}
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
              {errors.vendorName && <p className="text-red-500 text-sm">{errors.vendorName.message}</p>}
            </div>

            <div>
              <Label>Contact Person</Label>
              <Input {...register("vendorContact")} />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" {...register("vendorEmail")} />
            </div>

            <div>
              <Label>Phone</Label>
              <Input {...register("vendorPhone")} />
            </div>

            <div className="md:col-span-2">
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
                <div className="col-span-5">Description</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2">Unit</div>
                <div className="col-span-2 text-right">Unit Price</div>
                <div className="col-span-1" />
              </div>

              {fields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <Controller
                      control={control}
                      name={`items.${index}.description`}
                      rules={{ required: "Description is required" }}
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

                  <div className="col-span-2">
                    <Input type="number" {...register(`items.${index}.quantity`, { required: true })} />
                  </div>

                  <div className="col-span-2">
                    <Input {...register(`items.${index}.unit`, { required: true })} />
                  </div>

                  <div className="col-span-2">
                    <Input
                      type="number"
                      step="0.01"
                      {...register(`items.${index}.unitPrice`, { required: true })}
                    />
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
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/wages")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Wage"}
        </Button>
      </div>
    </form>
  )
}
