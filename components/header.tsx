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
import { useState, useEffect, use } from "react"
import { useAuth } from "@/app/context/authContext"
import { useQuery } from "@tanstack/react-query"
import { fetchNotificationsById } from "@/lib/hooks/notifications"

interface HeaderProps {
  user: any  // Define the type of your user data (adjust based on your actual data)
}
export const Header = () => {
  const {isAuthenticated, user,} = useAuth() || {isAuthenticated: false}
  const id = "6878a45770a46bdcb999a56c"
   const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications", id],
    queryFn: () => fetchNotificationsById(id),
    enabled: !!id,
  })

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

const unreadCount = notifications?.filter((n) => n.isRead).length

  //console.log("Notifications:", unreadCount)

const markAsRead = (id: string) => {
  setNotifications((prev) =>
    prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
  )
}

const markAllAsRead = () => {
  setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
}

  if (isLoading) {
    return <div className="flex items-center justify-center h-16">Loading...</div>
  }
  console.log("Notifications:", notifications)
  return (
    <header
      className={`sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 transition-shadow ${scrolled ? "shadow-md" : ""}`}
    >
      <MobileSidebar />

      <Link href="/" className="hidden items-center gap-2 md:flex">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <span className="text-lg font-bold text-primary-foreground">S1</span>
        </div>
        <span className="text-xl font-bold">Studio1:1</span>
      </Link>

      <div className="hidden md:flex items-center justify-center  md:flex-1">
        <form className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, clients, documents..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </form>
      </div>

      <div className="flex flex-1  items-center justify-end gap-4 md:justify-end">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-lg p-2">
        <DropdownMenuLabel className="flex items-center justify-between px-3 py-2">
          <span className="font-semibold">Notifications</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-xs"
          >
            Mark all as read
          </Button>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <Link
              key={notification._id}
              href={notification.link}
              className={`block px-4 py-3 border-b last:border-b-0 transition-colors ${
                notification.isRead
                  ? "bg-white hover:bg-gray-50 text-gray-600"
                  : "bg-blue-50 hover:bg-blue-100 text-gray-800 font-medium"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="truncate text-xs w-72">{notification.message}</span>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </Link>
          ))
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/notifications"
            className="w-full text-center text-primary font-medium py-2"
          >
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        <ModeToggle />
             {user ? (
            <UserNav
              name={user.name}
              email={user.email}
              avatarUrl={user.avatarUrl}
            />
          ) : (
            <div className="text-sm italic text-gray-400">Loading user...</div>
          )}
      </div>
    </header>
  )
}
