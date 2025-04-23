import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1">
            <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
