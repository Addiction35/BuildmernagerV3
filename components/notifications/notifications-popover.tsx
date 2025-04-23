"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Check, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample notification data (in a real app, this would come from an API)
const recentNotifications = [
  {
    id: "n1",
    title: "Project Status Updated",
    description: "Riverside Apartments project status changed to 'In Progress'",
    time: "10 minutes ago",
    read: false,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    link: "/projects/PRJ001",
  },
  {
    id: "n2",
    title: "Task Assigned",
    description: "You have been assigned a new task: 'Complete foundation inspection'",
    time: "1 hour ago",
    read: false,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    link: "/tasks/TASK001",
  },
  {
    id: "n3",
    title: "Document Uploaded",
    description: "New document 'Riverside Apartments - Electrical Plans.pdf' has been uploaded",
    time: "3 hours ago",
    read: false,
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    link: "/documents/DOC002",
  },
]

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState(recentNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">Notifications</h4>
          <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Bell className="h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="space-y-1 p-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 rounded-md p-3 text-sm ${!notification.read ? "bg-muted/50" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      {!notification.read && <Badge variant="default">New</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" asChild className="h-6 w-6">
                      <Link href={notification.link}>
                        <span className="sr-only">View</span>
                        <FileText className="h-3 w-3" />
                      </Link>
                    </Button>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <span className="sr-only">Mark as read</span>
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t p-3">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/notifications">View all notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
