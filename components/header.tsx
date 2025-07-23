"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/mobile-sidebar"
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

interface HeaderProps {
  user: any  // Define the type of your user data (adjust based on your actual data)
}
export const Header = () => {
  const {isAuthenticated, user,} = useAuth() || {isAuthenticated: false}

  
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New project assigned", read: false, time: "5 min ago" },
    { id: 2, title: "Estimate approved", read: false, time: "1 hour ago" },
    { id: 3, title: "Task deadline approaching", read: false, time: "3 hours ago" },
  ])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

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
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
                Mark all as read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start p-3 cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className={notification.read ? "text-muted-foreground" : "font-medium"}>
                      {notification.title}
                    </span>
                    {!notification.read && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                  </div>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer justify-center">
              <Link href="/notifications" className="w-full text-center">
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
