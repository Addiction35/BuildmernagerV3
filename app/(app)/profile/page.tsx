"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileInfo } from "@/components/profile/profile-info";
import { ProfileSettings } from "@/components/profile/profile-settings";
import { ProfileSecurity } from "@/components/profile/profile-security";
import { ProfileNotifications } from "@/components/profile/profile-notifications";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/lib/hooks/useProfile";


export default function ProfilePage() {
  const { data: user, isLoading, isError, error } = useProfile();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-destructive">
        Failed to load profile: {error?.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Profile - {user.name}
        </h1>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="space-y-6 pt-4">
          <ProfileInfo user={user} />
        </TabsContent>
        <TabsContent value="settings" className="space-y-6 pt-4">
          <ProfileSettings user={user} />
        </TabsContent>
        <TabsContent value="security" className="space-y-6 pt-4">
          <ProfileSecurity user={user} />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-6 pt-4">
          <ProfileNotifications user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
