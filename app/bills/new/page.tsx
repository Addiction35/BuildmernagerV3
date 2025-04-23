import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BillForm } from "@/components/bills/bill-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Bill | Construction Management",
  description: "Create a new bill",
}

export default function NewBillPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Link href="/bills">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Bill</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
          <CardDescription>Create a new bill for payment</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading form...</div>}>
            <BillForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
