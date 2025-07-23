"use client"

import Link from "next/link"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

type Notification = {
  _id: string
  type: string
  message: string
  link: string
  isRead: boolean
  createdAt: string
}

export default function NotificationsDropdown({
  notifications,
  setNotifications,
}: {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}) {
  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  return (
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

      <DropdownMenuContent align="end" className="w-96 max-h-[500px] overflow-y-auto rounded-lg shadow-lg">
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
              onClick={() => markAsRead(notification._id)}
              className={`block px-4 py-3 border-b last:border-b-0 transition-colors ${
                notification.isRead
                  ? "bg-white hover:bg-gray-50 text-gray-600"
                  : "bg-blue-50 hover:bg-blue-100 text-gray-800 font-medium"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="truncate w-72">{notification.message}</span>
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
  )
}
