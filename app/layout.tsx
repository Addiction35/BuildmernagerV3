
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>          {children}
          {/* Sonner Toasts */}
          <Toaster />
      </body>

    </html>
  )
}
