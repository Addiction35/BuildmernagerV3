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

export function ClientForm() {
  const router = useRouter()

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // In a real app, you would submit the form data to your API
    toast({
      title: "Client added",
      description: "The client has been added successfully.",
    })

    // Redirect to clients page
    router.push("/clients")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="companyName">Company/Organization Name</FormLabel>
                <Input id="companyName" placeholder="Enter company name" required />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="clientType">Client Type</FormLabel>
                <Select>
                  <SelectTrigger id="clientType">
                    <SelectValue placeholder="Select client type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="nonprofit">Non-Profit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="primaryContact">Primary Contact Name</FormLabel>
                <Input id="primaryContact" placeholder="Enter primary contact name" required />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="contactTitle">Contact Title/Position</FormLabel>
                <Input id="contactTitle" placeholder="Enter title or position" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input id="email" type="email" placeholder="Enter email address" required />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <Input id="phone" placeholder="Enter phone number" required />
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="address">Billing Address</FormLabel>
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
              <FormLabel htmlFor="industry">Industry</FormLabel>
              <Select>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="taxId">Tax ID / Business Number (Optional)</FormLabel>
              <Input id="taxId" placeholder="Enter tax ID or business number" />
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="notes">Additional Notes</FormLabel>
              <Textarea id="notes" placeholder="Enter additional notes" className="min-h-[100px]" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Add Client</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
