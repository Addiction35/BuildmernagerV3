import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EstimateForm } from "@/components/estimates/estimate-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Estimate | Construction Management",
  description: "Create a new construction estimate",
}

export default function NewEstimatePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Link href="/estimates">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Estimate</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estimate Details</CardTitle>
          <CardDescription>Create a new estimate with a hierarchical structure</CardDescription>
        </CardHeader>
        <CardContent>
          <EstimateForm />
        </CardContent>
      </Card>
    </div>
  )
}
