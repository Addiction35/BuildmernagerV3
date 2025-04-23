import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { ProjectManagerDashboard } from "@/components/dashboard/project-manager-dashboard"
import { QADashboard } from "@/components/dashboard/qa-dashboard"

export const metadata: Metadata = {
  title: "Dashboard | Construction Management",
  description: "Construction Management Dashboard",
}

export default function DashboardPage() {
  // In a real application, this would come from an authentication system
  // For demo purposes, we'll use a cookie to simulate different roles
  const cookieStore = cookies()
  const userRole = cookieStore.get("userRole")?.value || "admin"

  // Redirect to login if not authenticated
  // In a real app, this would check for a valid session
  const isAuthenticated = true
  if (!isAuthenticated) {
    redirect("/login")
  }

  // Render the appropriate dashboard based on user role
  switch (userRole) {
    case "admin":
      return <AdminDashboard />
    case "user":
      return <UserDashboard />
    case "project_manager":
      return <ProjectManagerDashboard />
    case "qa":
      return <QADashboard />
    default:
      return <UserDashboard />
  }
}
