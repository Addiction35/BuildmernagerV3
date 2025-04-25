"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from '@tanstack/react-query';
import { createClient } from "@/lib/api/clients";


type ClientFormData = {
  companyName: string;
  clientType: string;
  primaryContact: string;
  contactTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  industry: string;
  taxId: string;
  notes: string;
};

export function ClientForm() {
  const router = useRouter()

    const methods = useForm<ClientFormData>({
    defaultValues: {
      companyName: "",
      clientType: "",
      primaryContact: "",
      contactTitle: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      industry: "",
      taxId: "",
      notes: ""
    }
  });

  // Handle form submission using TanStack Query's useMutation
   const { mutateAsync, isLoading } = useMutation({
    mutationFn: createClient,
    onError: (err: unknown) => {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        title: "Client added",
        description: "The client has been added successfully.",
      })
      router.push("/clients")
    },
  })

  const onSubmit = async (formData: ClientFormData) => {
    console.log("Submitting client data:", formData);
    await mutateAsync(formData)
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="companyName">Company/Organization *</FormLabel>
                   <Controller
                    name="companyName"
                    control={methods.control}
                    render={({ field }) => <Input {...field} id="companyName" placeholder="Enter company name" required />}
                  />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="clientType">Client Type *</FormLabel>
                <Controller
                  name="clientType"
                  control={methods.control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value as ClientFormData["clientType"])}
                    >
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
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="primaryContact">Primary Contact Name *</FormLabel>
                  <Controller
                    name="primaryContact"
                    control={methods.control}
                    render={({ field }) => <Input {...field} id="primaryContact" placeholder="Enter client name" required />}
                  />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="contactTitle">Contact Title/Position</FormLabel>
                  <Controller
                    name="contactTitle"
                    control={methods.control}
                    render={({ field }) => <Input {...field} id="contactTitle" placeholder="Enter title or position" />}
                  />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="email">Email Address *</FormLabel>
                  <Controller
                    name="email"
                    control={methods.control}
                    render={({ field }) => <Input {...field} id="email" type="email" placeholder="Enter email address" required />}
                  />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="phone">Phone Number *</FormLabel>
                  <Controller
                    name="phone"
                    control={methods.control}
                    render={({ field }) => <Input {...field} id="phone" placeholder="Enter phone number" required />}
                  />
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="address">Billing Address</FormLabel>
                <Controller
                  name="address"
                  control={methods.control}
                  render={({ field }) => <Textarea {...field} id="address" placeholder="Enter full address" />}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <FormLabel htmlFor="city">City</FormLabel>
                  <Controller
                    name="city"
                    control={methods.control}
                    render={({ field }) => <Input {...field} id="city" placeholder="Enter city" />}
                  />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="state">State/Province</FormLabel>
                  <Controller
                    name="state"
                    control={methods.control}
                    render={({ field }) => <Input {...field} id="state" placeholder="Enter state/province" />}
                  />
              </div>
              <div className="space-y-2">
                <FormLabel htmlFor="zipCode">Zip/Postal Code</FormLabel>
                  <Controller
                    name="zipCode"
                    control={methods.control}
                    render={({ field }) => <Input {...field} id="zipCode" placeholder="Enter zip/postal code" />}
                  />
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="industry">Industry</FormLabel>
            <Controller
              name="industry"
              control={methods.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
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
              )}
            />
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="taxId">Tax ID / Business Number (Optional)</FormLabel>
                <Controller
                  name="taxId"
                  control={methods.control}
                  render={({ field }) => <Input {...field} id="taxId" placeholder="Enter tax ID or business number" />}
                />
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="notes">Additional Notes</FormLabel>
                <Controller
                  name="notes"
                  control={methods.control}
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
              {isLoading ? "Submitting..." : "Add Client"}
            </Button>
        </CardFooter>
      </form>
    </FormProvider>
    </Card>
  )
}
