import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WagesTable } from "@/components/wages/wages-table"

export const metadata: Metadata = {
  title: "Wages | Construction Management",
  description: "Manage your construction wages",
}

export default function WagesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Wages</h1>
        <div className="flex items-center gap-2">
          <Link href="/wages/new">
            <Button>New Wage</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Wages</CardTitle>
          <CardDescription>View and manage all your wage payments</CardDescription>
        </CardHeader>
        <CardContent>
          <WagesTable />
        </CardContent>
      </Card>
    </div>
  )
}
