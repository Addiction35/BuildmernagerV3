import type { Metadata } from "next"
import { UsersTable } from "@/components/admin/users-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserPlus } from "lucide-react"

export const metadata: Metadata = {
  title: "User Management | ConstructPro",
  description: "Manage system users and permissions",
}

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage system users, roles, and permissions</p>
        </div>
        <Link href="/admin/users/new">
          <Button className="w-full md:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>
      <UsersTable />
    </div>
  )
}
