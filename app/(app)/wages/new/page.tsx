import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {  WagesForm } from "@/components/wages/wage-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Wage | Construction Management",
  description: "Create a new wage record",
}

export default function NewWagePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Link href="/wages">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Wage Record</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wage Details</CardTitle>
          <CardDescription>Create a new wage record</CardDescription>
        </CardHeader>
        <CardContent>
          <WagesForm />
        </CardContent>
      </Card>
    </div>
  )
}
