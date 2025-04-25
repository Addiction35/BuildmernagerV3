"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import QueryProvider from "@/components/QueryProvider"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

const AppLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
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
