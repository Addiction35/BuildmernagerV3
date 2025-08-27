// app/vendors/[id]/edit/page.tsx
"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { fetchVendorById, updateVendor } from "@/lib/api/vendors"
import { use, useEffect } from "react"

// ✅ Validation schema
const VendorSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  category: z.string().optional(),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone number is required"),
  website: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  taxId: z.string().optional(),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["Active", "Inactive"]),
})

type VendorForm = z.infer<typeof VendorSchema>

export default function EditVendorPage({ params }: { params: { id: string } }) {
  const { id } = use(params)
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<VendorForm>({
    resolver: zodResolver(VendorSchema),
    defaultValues: {}, // start empty
  })

  const { data: vendorData, isLoading } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => fetchVendorById(id),
    enabled: !!id,
  })

  // 🔑 Reset form values when vendorData is loaded
  useEffect(() => {
    if (vendorData) {
      form.reset(vendorData)
    }
  }, [vendorData, form])

const mutation = useMutation({
  mutationFn: ({ updates, id }: { updates: VendorForm; id: string }) =>
    updateVendor({ updates, id }),
  onSuccess: () => {
    toast.success("Vendor updated successfully")
    queryClient.invalidateQueries(["vendors"])
    router.push("/vendors")
  },
  onError: (error: any) => {
    toast.error(error?.response?.data?.message || "Update failed")
  },
})

const onSubmit = (values: VendorForm) => {
  mutation.mutate({ updates: values, id })
}

  if (isLoading) return <p className="p-4">Loading vendor...</p>

  return (
<div className="max-w-3xl mx-auto py-4 px-2">
  <Card className="shadow-md rounded-2xl">
    <CardHeader className="border-b pb-4">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          ← Back
        </Button>

        {/* Title */}
        <CardTitle className="text-xl sm:text-2xl font-bold text-center sm:text-right w-full sm:w-auto">
          Edit Vendor
        </CardTitle>
      </div>
    </CardHeader>

    <CardContent className="pt-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label className="mb-1 block text-sm font-medium">Company Name</Label>
          <Input {...form.register("companyName")} placeholder="Enter company name" />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Contact Person</Label>
          <Input {...form.register("contactPerson")} placeholder="Enter contact person" />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Email</Label>
          <Input type="email" {...form.register("email")} placeholder="example@email.com" />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Phone</Label>
          <Input {...form.register("phone")} placeholder="+1 234 567 890" />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Website</Label>
          <Input {...form.register("website")} placeholder="www.example.com" />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Address</Label>
          <Input {...form.register("address")} placeholder="Street address" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block text-sm font-medium">City</Label>
            <Input {...form.register("city")} />
          </div>
          <div>
            <Label className="mb-1 block text-sm font-medium">State</Label>
            <Input {...form.register("state")} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block text-sm font-medium">Zip Code</Label>
            <Input {...form.register("zipCode")} />
          </div>
          <div>
            <Label className="mb-1 block text-sm font-medium">Tax ID</Label>
            <Input {...form.register("taxId")} />
          </div>
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Payment Terms</Label>
          <Input {...form.register("paymentTerms")} placeholder="e.g. Net 30" />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Status</Label>
          <select
            {...form.register("status")}
            className="border rounded-lg p-2 w-full focus:ring focus:ring-primary"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium">Notes</Label>
          <Input {...form.register("notes")} placeholder="Additional notes..." />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>

  )
}
