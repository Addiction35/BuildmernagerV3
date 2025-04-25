import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { ProjectManagerDashboard } from "@/components/dashboard/project-manager-dashboard"
import { QADashboard } from "@/components/dashboard/qa-dashboard"
import jwt from "jsonwebtoken"

export const metadata: Metadata = {
  title: "Dashboard | Construction Management",
  description: "Construction Management Dashboard",
}

export default async function DashboardPage() {
  const cookieStore = await cookies()  // Retrieve cookies
  const token = cookieStore.get("auth_token")?.value  // Assuming your token is stored as 'auth_token'
  console.log(token)
  if (!token) {
    // Redirect if the token is not found
    redirect("/login")
  }

  let user: any
  try {
    // Verify and decode the token using the secret key
    user = jwt.verify(token, process.env.JWT_SECRET!)
  } catch (err) {
    // Redirect if token is invalid or expired
    console.error("Invalid token", err)
    redirect("/login")
  }

  // Extract the role from the decoded JWT
  const role = user.role

  console.log("this is the role", role);

  // Render the corresponding dashboard based on the role
  switch (role) {
    case "admin":
      return <AdminDashboard />
    case "user":
      return <UserDashboard />
    case "project_manager":
      return <ProjectManagerDashboard />
    case "qa":
      return <QADashboard />
    default:
      // Default to User Dashboard if the role is unknown
      return <UserDashboard />
  }
}
