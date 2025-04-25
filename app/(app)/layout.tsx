"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { ThemeProvider } from "@/components/theme-provider"
import QueryProvider from "@/components/QueryProvider"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)  // State to store user data

  useEffect(() => {
    // Fetch user data from cookies (or your preferred storage method)
    const userData = Cookies.get("user_data")

    if (userData) {
      const parsedUser = JSON.parse(userData)  // Assuming the user data is stored in JSON format
      setUser(parsedUser)
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <div className="flex min-h-screen flex-col">
          <Header user={user}/>
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">{children}</main>
          </div>
        </div>
      </QueryProvider>
    </ThemeProvider>
  )
}

export default AppLayout
