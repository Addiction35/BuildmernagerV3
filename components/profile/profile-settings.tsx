"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import type { User } from "@/types/user";

interface ProfileSettingsProps {
  user: User;
}

const settingsFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  dateFormat: z.enum(["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"], {
    required_error: "Please select a date format.",
  }),
  timeFormat: z.enum(["12h", "24h"], {
    required_error: "Please select a time format.",
  }),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      theme: user.preferences?.profile?.theme || "system",
      emailNotifications: user.preferences?.notifications?.email ?? true,
      pushNotifications: user.preferences?.notifications?.push ?? true,
      smsNotifications: user.preferences?.notifications?.sms ?? false,
      dateFormat: "MM/DD/YYYY", // Default or map from API if available
      timeFormat: "12h",        // Default or map from API if available
    },
  });

  // Sync user preferences if user changes
  useEffect(() => {
    form.reset({
      theme: user.preferences?.profile?.theme || "system",
      emailNotifications: user.preferences?.notifications?.email ?? true,
      pushNotifications: user.preferences?.notifications?.push ?? true,
      smsNotifications: user.preferences?.notifications?.sms ?? false,
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
    });
  }, [user, form]);

  function onSubmit(data: SettingsFormValues) {
    setIsLoading(true);

    // Simulate API call (replace with axiosInstance.put later)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings updated",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Settings</CardTitle>
        <CardDescription>Manage your application preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Theme */}
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Theme</FormLabel>
                  <FormDescription>
                    Select your preferred theme for the application.
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="light" />
                        </FormControl>
                        <FormLabel className="font-normal">Light</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="dark" />
                        </FormControl>
                        <FormLabel className="font-normal">Dark</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="system" />
                        </FormControl>
                        <FormLabel className="font-normal">System</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date & Time Formats */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Date and Time</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="dateFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Format</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Format</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="space-y-4">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Email Notifications
                        </FormLabel>
                        <FormDescription>
                          Receive notifications via email.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Push */}
                <FormField
                  control={form.control}
                  name="pushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Push Notifications
                        </FormLabel>
                        <FormDescription>
                          Receive push notifications in the browser.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* SMS */}
                <FormField
                  control={form.control}
                  name="smsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          SMS Notifications
                        </FormLabel>
                        <FormDescription>
                          Receive notifications via SMS.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
