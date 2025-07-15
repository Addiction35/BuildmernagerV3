"use client"
import type React from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller, FormProvider, SubmitHandler } from "react-hook-form"


import { useCreateVendor } from "@/lib/hooks/vendorQueries"

interface VendorFormData {
  companyName: string
  category: string
  contactPerson: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  state: string
  zipCode: string
  taxId: string
  paymentTerms: string
  notes: string
}

export function VendorForm() {
  const router = useRouter()

  // Using the imported addVendor mutation
  const { mutate, isLoading, isError, isSuccess } = useCreateVendor();
  // React Hook Form setup
  const methods = useForm<VendorFormData>({
    defaultValues: {
      companyName: "",
      category: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      taxId: "",
      paymentTerms: "",
      notes: "",
    },
  })

  const { handleSubmit, control } = methods

const onSubmit = (data) => {
  console.log(data)
  mutate(data, {
    onSuccess: () => {
      toast.success("Vendor created successfully!");
      setTimeout(() => {
        router.push("/vendors");
      }, 1500); // Wait for 1.5 seconds (1500ms) before redirecting
    },
    onError: (error) => {
      toast.error("Failed to create Vendor. Please try again.");
      console.error("Error creating Vendor:", error);
    }
  });
};

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="companyName">Company Name *</FormLabel>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => <Input {...field} id="companyName" placeholder="Enter company name" required />}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="category">Vendor Category</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => <Input {...field} id="address" placeholder="Enter Vendor Category" />}
                />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="contactPerson">Primary Contact *</FormLabel>
                  <Controller
                    name="contactPerson"
                    control={control}
                    render={({ field }) => <Input {...field} id="contactPerson" placeholder="Enter contact person name" />}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="email">Email Address *</FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} id="email" type="email" placeholder="Enter email address" required />}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="phone">Phone Number *</FormLabel>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => <Input {...field} id="phone" placeholder="Enter phone number" />}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="website">Website</FormLabel>
                  <Controller
                    name="website"
                    control={control}
                    render={({ field }) => <Input {...field} id="website" placeholder="Enter website URL" />}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="address">Address *</FormLabel>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => <Textarea {...field} id="address" placeholder="Enter full address" />}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <FormLabel htmlFor="city">City</FormLabel>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => <Input {...field} id="city" placeholder="Enter city" />}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="state">State/Province</FormLabel>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => <Input {...field} id="state" placeholder="Enter state/province" />}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="zipCode">Zip/Postal Code</FormLabel>
                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => <Input {...field} id="zipCode" placeholder="Enter zip/postal code" />}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="taxId">Tax ID / Business Number</FormLabel>
                <Controller
                  name="taxId"
                  control={control}
                  render={({ field }) => <Input {...field} id="taxId" placeholder="Enter tax ID or business number" />}
                />
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="paymentTerms">Payment Terms *</FormLabel>
            <Controller
              name="paymentTerms"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="paymentTerms" className="w-full">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="net15">Mobile Money</SelectItem>
                    <SelectItem value="net30">Cheque</SelectItem>
                    <SelectItem value="net45">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />


              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="notes">Notes</FormLabel>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => <Textarea {...field} id="notes" placeholder="Enter additional notes" className="min-h-[100px]" />}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding Vendor..." : "Add Vendor"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </FormProvider>
  )
}
