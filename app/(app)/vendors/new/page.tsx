import { VendorForm } from "@/components/vendors/vendor-form"

export default function NewVendorPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Vendor</h1>
        <p className="text-muted-foreground">Register a new vendor in the system</p>
      </div>
      <VendorForm />
    </div>
  )
}
