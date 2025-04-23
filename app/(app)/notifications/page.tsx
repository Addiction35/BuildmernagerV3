import type { Metadata } from "next"
import { NotificationsList } from "@/components/notifications/notifications-list"
import { NotificationsFilter } from "@/components/notifications/notifications-filter"
import { NotificationsHeader } from "@/components/notifications/notifications-header"

export const metadata: Metadata = {
  title: "Notifications | Construction Management",
  description: "View and manage your notifications",
}

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <NotificationsHeader />

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <NotificationsFilter />
        <NotificationsList />
      </div>
    </div>
  )
}
