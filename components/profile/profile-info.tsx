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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

import type { User } from "@/types/user";

interface ProfileInfoProps {
  user: User;
}

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileInfo({ user }: ProfileInfoProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: "",
      title: user.role || "",
      bio: "",
    },
  });

  // Sync user data if user changes
  useEffect(() => {
    form.reset({
      name: user.name || "",
      email: user.email || "",
      phone: "",
      title: user.role || "",
      bio: "",
    });
  }, [user, form]);

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    // Simulate API call (replace with axiosInstance.put later)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[250px_1fr]">
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile picture.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={user.profileImage || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback className="text-4xl">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            Change Picture
          </Button>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your job title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Brief description for your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
