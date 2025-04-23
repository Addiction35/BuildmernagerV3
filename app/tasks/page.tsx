import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TasksTable } from "@/components/tasks/tasks-table"
import { TasksFilter } from "@/components/tasks/tasks-filter"

export const metadata: Metadata = {
  title: "Tasks | Construction Management",
  description: "Manage your construction tasks",
}

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <div className="flex items-center gap-2">
          <Link href="/tasks/new">
            <Button>New Task</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>View and manage all your construction tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <TasksFilter />
          <TasksTable />
        </CardContent>
      </Card>
    </div>
  )
}
