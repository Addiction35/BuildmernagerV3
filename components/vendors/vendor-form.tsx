"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function VendorForm() {
  const router = useRouter()

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // In a real app, you would submit the form data to your API
    toast({
      title: "Vendor added",
      description: "The vendor has been added successfully.",
    })

    // Redirect to vendors page
    router.push("/vendors")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Information</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="companyName">Company Name</FormLabel>
                <Input id="companyName" placeholder="Enter company name" required />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="vendorType">Vendor Type</FormLabel>
                <Select>
                  <SelectTrigger id="vendorType">
                    <SelectValue placeholder="Select vendor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="service">Service Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="contactPerson">Primary Contact</FormLabel>
                <Input id="contactPerson" placeholder="Enter contact person name" />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input id="email" type="email" placeholder="Enter email address" required />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="website">Website</FormLabel>
                <Input id="website" placeholder="Enter website URL" />
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="address">Address</FormLabel>
              <Textarea id="address" placeholder="Enter full address" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <FormLabel htmlFor="city">City</FormLabel>
                <Input id="city" placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="state">State/Province</FormLabel>
                <Input id="state" placeholder="Enter state/province" />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="zipCode">Zip/Postal Code</FormLabel>
                <Input id="zipCode" placeholder="Enter zip/postal code" />
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="taxId">Tax ID / Business Number</FormLabel>
              <Input id="taxId" placeholder="Enter tax ID or business number" />
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="paymentTerms">Payment Terms</FormLabel>
              <Select>
                <SelectTrigger id="paymentTerms">
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net15">Net 15</SelectItem>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net45">Net 45</SelectItem>
                  <SelectItem value="net60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="notes">Notes</FormLabel>
              <Textarea id="notes" placeholder="Enter additional notes" className="min-h-[100px]" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Add Vendor</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
