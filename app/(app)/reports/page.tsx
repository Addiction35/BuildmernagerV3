import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsTable } from "@/components/reports/reports-table"
import { ReportsFilter } from "@/components/reports/reports-filter"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Reports | Construction Management",
  description: "View and create reports for your construction projects",
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Create, view, and manage reports for your construction projects</p>
        </div>
        <Link href="/reports/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="my-reports" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="my-reports">My Reports</TabsTrigger>

        </TabsList>
        <TabsContent value="my-reports" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle>My Reports</CardTitle>
                <ReportsFilter />
              </div>
              <CardDescription>View and manage reports you have created</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ReportsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
