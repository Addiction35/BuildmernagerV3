"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Calendar,
  Check,
  FileText,
  MessageSquare,
  Users,
  Briefcase,
  DollarSign,
  ShoppingCart,
  UserPlus,
  Star,
  AlertCircle,
  Info,
} from "lucide-react"

type Notification = {
  id: string
  type: "project" | "task" | "document" | "comment" | "meeting" | "client" | "vendor" | "team" | "financial"
  priority?: "normal" | "important" | "urgent"
  title: string
  description: string
  time: string
  read: boolean
  user?: {
    name: string
    avatar: string
    initials: string
  }
  link: string
  icon: React.ElementType
}

// Add more notifications with different types and priorities
const notifications: Notification[] = [
  {
    id: "n1",
    type: "project",
    priority: "important",
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
    icon: Users,
  },
  {
    id: "n2",
    type: "task",
    priority: "urgent",
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
    icon: Bell,
  },
  {
    id: "n3",
    type: "document",
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
    icon: FileText,
  },
  {
    id: "n4",
    type: "comment",
    title: "New Comment",
    description: "David Kim commented on 'Hillside Residence' project: 'We need to revise the timeline'",
    time: "Yesterday",
    read: true,
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DK",
    },
    link: "/projects/PRJ003",
    icon: MessageSquare,
  },
  {
    id: "n5",
    type: "meeting",
    priority: "important",
    title: "Meeting Scheduled",
    description: "Project kickoff meeting for 'Community Center' scheduled for June 15, 2023, 10:00 AM",
    time: "Yesterday",
    read: true,
    user: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LW",
    },
    link: "/calendar/MTG001",
    icon: Calendar,
  },
  {
    id: "n6",
    type: "project",
    title: "Project Created",
    description: "New project 'Retail Store Fitout' has been created",
    time: "2 days ago",
    read: true,
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    link: "/projects/PRJ005",
    icon: Users,
  },
  {
    id: "n7",
    type: "task",
    title: "Task Completed",
    description: "Task 'Order electrical supplies' has been marked as completed",
    time: "2 days ago",
    read: true,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    link: "/tasks/TASK002",
    icon: Bell,
  },
  {
    id: "n8",
    type: "document",
    title: "Document Updated",
    description: "Document 'Downtown Office - Building Permit.pdf' has been updated",
    time: "3 days ago",
    read: true,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    link: "/documents/DOC003",
    icon: FileText,
  },
  {
    id: "n9",
    type: "client",
    priority: "important",
    title: "New Client Added",
    description: "ABC Corporation has been added as a new client",
    time: "3 days ago",
    read: true,
    user: {
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JL",
    },
    link: "/clients/CL001",
    icon: Briefcase,
  },
  {
    id: "n10",
    type: "vendor",
    title: "Vendor Payment Due",
    description: "Payment to 'Quality Supplies Inc.' is due in 3 days",
    time: "4 days ago",
    read: true,
    user: {
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RT",
    },
    link: "/vendors/VEN002",
    icon: ShoppingCart,
  },
  {
    id: "n11",
    type: "team",
    title: "Team Member Added",
    description: "Alex Johnson has been added to the 'Electrical' team",
    time: "5 days ago",
    read: true,
    user: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MG",
    },
    link: "/teams/TM003",
    icon: UserPlus,
  },
  {
    id: "n12",
    type: "financial",
    priority: "urgent",
    title: "Budget Exceeded",
    description: "The 'Hillside Residence' project has exceeded its budget by 15%",
    time: "1 week ago",
    read: true,
    user: {
      name: "William Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "WB",
    },
    link: "/projects/PRJ003/financials",
    icon: DollarSign,
  },
]

export function NotificationsList() {
  const [notificationsList, setNotificationsList] = useState(notifications)

  const unreadCount = notificationsList.filter((n) => !n.read).length
  const importantCount = notificationsList.filter((n) => n.priority === "important").length
  const urgentCount = notificationsList.filter((n) => n.priority === "urgent").length

  const markAsRead = (id: string) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map((notification) => ({ ...notification, read: true })))
  }

  const getPriorityIcon = (priority?: string) => {
    if (priority === "important") return <Star className="h-4 w-4 text-amber-500" />
    if (priority === "urgent") return <AlertCircle className="h-4 w-4 text-red-500" />
    return <Info className="h-4 w-4 text-blue-500" />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have {unreadCount} unread notifications</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="important">Important ({importantCount})</TabsTrigger>
            <TabsTrigger value="urgent">Urgent ({urgentCount})</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {notificationsList.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 rounded-lg border p-4 ${!notification.read ? "bg-muted/50" : ""}`}
                >
                  <notification.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      {!notification.read && <Badge variant="default">New</Badge>}
                      {notification.priority && (
                        <div className="flex items-center gap-1" title={`${notification.priority} priority`}>
                          {getPriorityIcon(notification.priority)}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {notification.user && (
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage
                              src={notification.user.avatar || "/placeholder.svg"}
                              alt={notification.user.name}
                            />
                            <AvatarFallback>{notification.user.initials}</AvatarFallback>
                          </Avatar>
                          <span>{notification.user.name}</span>
                        </div>
                      )}
                      <span>•</span>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={notification.link}>
                        <span className="sr-only">View</span>
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <span className="sr-only">Mark as read</span>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="unread" className="mt-4">
            <div className="space-y-4">
              {notificationsList
                .filter((n) => !n.read)
                .map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 rounded-lg border p-4 bg-muted/50">
                    <notification.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        <Badge variant="default">New</Badge>
                        {notification.priority && (
                          <div className="flex items-center gap-1" title={`${notification.priority} priority`}>
                            {getPriorityIcon(notification.priority)}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {notification.user && (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={notification.user.avatar || "/placeholder.svg"}
                                alt={notification.user.name}
                              />
                              <AvatarFallback>{notification.user.initials}</AvatarFallback>
                            </Avatar>
                            <span>{notification.user.name}</span>
                          </div>
                        )}
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={notification.link}>
                          <span className="sr-only">View</span>
                          <FileText className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <span className="sr-only">Mark as read</span>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              {unreadCount === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No unread notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">You're all caught up!</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="important" className="mt-4">
            <div className="space-y-4">
              {notificationsList
                .filter((n) => n.priority === "important")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${!notification.read ? "bg-muted/50" : ""}`}
                  >
                    <notification.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        {!notification.read && <Badge variant="default">New</Badge>}
                        <div className="flex items-center gap-1" title="Important">
                          <Star className="h-4 w-4 text-amber-500" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {notification.user && (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={notification.user.avatar || "/placeholder.svg"}
                                alt={notification.user.name}
                              />
                              <AvatarFallback>{notification.user.initials}</AvatarFallback>
                            </Avatar>
                            <span>{notification.user.name}</span>
                          </div>
                        )}
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={notification.link}>
                          <span className="sr-only">View</span>
                          <FileText className="h-4 w-4" />
                        </Link>
                      </Button>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <span className="sr-only">Mark as read</span>
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              {importantCount === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Star className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No important notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">You have no important notifications at this time</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="urgent" className="mt-4">
            <div className="space-y-4">
              {notificationsList
                .filter((n) => n.priority === "urgent")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${!notification.read ? "bg-muted/50" : ""}`}
                  >
                    <notification.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        {!notification.read && <Badge variant="default">New</Badge>}
                        <div className="flex items-center gap-1" title="Urgent">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {notification.user && (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={notification.user.avatar || "/placeholder.svg"}
                                alt={notification.user.name}
                              />
                              <AvatarFallback>{notification.user.initials}</AvatarFallback>
                            </Avatar>
                            <span>{notification.user.name}</span>
                          </div>
                        )}
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={notification.link}>
                          <span className="sr-only">View</span>
                          <FileText className="h-4 w-4" />
                        </Link>
                      </Button>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <span className="sr-only">Mark as read</span>
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              {urgentCount === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No urgent notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">You have no urgent notifications at this time</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="read" className="mt-4">
            <div className="space-y-4">
              {notificationsList
                .filter((n) => n.read)
                .map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <notification.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        {notification.priority && (
                          <div className="flex items-center gap-1" title={`${notification.priority} priority`}>
                            {getPriorityIcon(notification.priority)}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {notification.user && (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={notification.user.avatar || "/placeholder.svg"}
                                alt={notification.user.name}
                              />
                              <AvatarFallback>{notification.user.initials}</AvatarFallback>
                            </Avatar>
                            <span>{notification.user.name}</span>
                          </div>
                        )}
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={notification.link}>
                        <span className="sr-only">View</span>
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <Button variant="outline">Load More</Button>
      </CardFooter>
    </Card>
  )
}
