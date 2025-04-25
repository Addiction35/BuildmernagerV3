import { AdminDashboard } from '@/components/dashboard/admin-dashboard'
import { ProjectManagerDashboard } from '@/components/dashboard/project-manager-dashboard'
import { QADashboard } from '@/components/dashboard/qa-dashboard'
import { UserDashboard } from '@/components/dashboard/user-dashboard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function DashboardPage() {
  // Retrieve cookies
  const cookieStore = await cookies()
  
  // Get the auth_token and user_data cookies
  const token = cookieStore.get('auth_token')?.value
  const userData = cookieStore.get('user_data')?.value

  console.log('Token:', token)
  console.log('User Data:', userData)

  if (!token || !userData) {
    // Redirect to login if cookies are missing
    redirect("/login")
  }

  // Parse the user_data cookie into an object (it is stored as a string)
  let user: any
  try {
    user = JSON.parse(userData) // Parse the user data string into an object
  } catch (error) {
    console.error("Invalid user data:", error)
    redirect("/login")
  }

  // Now you can access user details like user.role or user._id
  console.log('User:', user)
  const role = user?.role || "user"

  // Based on the user role, render the corresponding dashboard
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
      return <UserDashboard />
  }
}
