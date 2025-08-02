"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { formatDistanceToNow } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/authContext"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchNotificationsById } from "@/lib/hooks/notifications"

export const Header = () => {
  const { isAuthenticated, user } = useAuth() || { isAuthenticated: false, user: null }
  const id = "6878a45770a46bdcb999a56c"
  const queryClient = useQueryClient()

  const {
    data: notifications = [], // ✅ fallback to empty array
    isLoading,
  } = useQuery({
    queryKey: ["notifications", id],
    queryFn: () => fetchNotificationsById(id),
    enabled: !!id,
  })

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ✅ Only count unread safely
  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.isRead).length
    : 0

  // ✅ Use queryClient.setQueryData to update notifications safely
  const markAsRead = (nid: string) => {
    queryClient.setQueryData(["notifications", id], (prev: any[] = []) =>
      prev.map((n) => (n._id === nid ? { ...n, isRead: true } : n))
    )
  }

  const markAllAsRead = () => {
    queryClient.setQueryData(["notifications", id], (prev: any[] = []) =>
      prev.map((n) => ({ ...n, isRead: true }))
    )
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-16">Loading...</div>
  }

  return (
    <header
      className={`sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <MobileSidebar />

      <Link href="/" className="hidden items-center gap-2 md:flex">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <span className="text-lg font-bold text-primary-foreground">S1</span>
        </div>
        <span className="text-xl font-bold">Studio1:1</span>
      </Link>

      <div className="hidden md:flex items-center justify-center md:flex-1">
        <form className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, clients, documents..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </form>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4 md:justify-end">
       <ModeToggle />

        {user ? (
          <UserNav
            name={user?.name ?? "Unknown"}
            email={user?.email ?? ""}
            avatarUrl={user?.avatarUrl ?? ""}
          />
        ) : (
          <div className="text-sm italic text-gray-400">Loading user...</div>
        )}
      </div>
    </header>
  )
}
