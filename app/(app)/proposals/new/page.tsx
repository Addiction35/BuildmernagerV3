import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProposalForm } from "@/components/proposals/proposal-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Proposal | Construction Management",
  description: "Create a new construction proposal",
}

import { Suspense } from "react";

export default function NewProposalPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Link href="/proposals">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Proposal</h1>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Card>
          <CardHeader>
            <CardTitle>Proposal Details</CardTitle>
            <CardDescription>Create a new proposal based on an estimate</CardDescription>
          </CardHeader>
          <CardContent>
            <ProposalForm />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
