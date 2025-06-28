// app/layout.tsx
"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner';
import { AuthProvider } from "./context/authContext"

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className={inter.className}>
        <AuthProvider>
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            {/* Sonner Toasts */}
            <Toaster richColors position="top-right"/>
          </QueryClientProvider>
        </AuthProvider>
      </body>

    </html>
  )
}
