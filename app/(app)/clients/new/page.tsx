"use client";

import { useForm, FormProvider } from "react-hook-form";
import { ClientForm } from "@/components/clients/client-form"

export default function NewClientPage() {
  const methods = useForm();
  return (
    <>
    <FormProvider {...methods}>
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Client</h1>
        <p className="text-muted-foreground">Register a new client in the system</p>
      </div>
      <ClientForm />
    </div>
    </FormProvider>
    </>
  )
}
