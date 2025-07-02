// app/layout.tsx
"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner';
import { AuthProvider } from "./context/authContext"
import Providers from "@/providers"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className={inter.className}>
        <Providers>
        <AuthProvider>
            {children}
            {/* Sonner Toasts */}
            <Toaster richColors position="top-right"/>
        </AuthProvider>
        </Providers>
      </body>

    </html>
  )
}
