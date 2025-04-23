import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileInfo } from "@/components/profile/profile-info"
import { ProfileSettings } from "@/components/profile/profile-settings"
import { ProfileSecurity } from "@/components/profile/profile-security"
import { ProfileNotifications } from "@/components/profile/profile-notifications"

export const metadata: Metadata = {
  title: "Profile | Construction Management",
  description: "Manage your profile and account settings",
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="space-y-6 pt-4">
          <ProfileInfo />
        </TabsContent>
        <TabsContent value="settings" className="space-y-6 pt-4">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="security" className="space-y-6 pt-4">
          <ProfileSecurity />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-6 pt-4">
          <ProfileNotifications />
        </TabsContent>
      </Tabs>
    </div>
  )
}
