import { Button } from "@/components/ui/button"
import { VendorForm } from "@/components/vendors/vendor-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewVendorPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2">
        <Link href="/vendors">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add New Vendor</h1>
        <p className="text-muted-foreground">Register a new vendor in the system</p>
      </div>
      <VendorForm />
    </div>
  )
}
