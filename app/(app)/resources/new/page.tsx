import type { Metadata } from "next"
import { ResourceForm } from "@/components/resources/resource-form"

export const metadata: Metadata = {
  title: "New Resource | Construction Management",
  description: "Add a new construction resource",
}

export default function NewResourcePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Resource</h1>
          <p className="text-muted-foreground">Add a new resource to your construction inventory</p>
        </div>
      </div>

      <ResourceForm />
    </div>
  )
}
