"use client"

import type React from "react"


import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useCreateProject } from "@/lib/hooks/projectQueries"
import { useGetClients } from "@/lib/hooks/clientQueries"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast";
import { ClientForm } from "../clients/client-form"
export function ProjectForm() {
  const router = useRouter()
  const { mutate, isLoading, isError, isSuccess } = useCreateProject();
  const { data: clients, isLoading: clientsLoading } = useGetClients()

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: '',
      client: '',
      location: '',
      status: '',
      startDate: '',
      endDate: '',
      description: '',
      value: '',
      type: '',
      manager: '',
      supervisor: '',
      contactName: '',
      contactRole: '',
      contactEmail: '',
      contactPhone: '',
    },
  });

const onSubmit = (data) => {
  mutate(data, {
    onSuccess: () => {
      toast.success("Project created successfully! 🚀");
      setTimeout(() => {
        router.push("/projects");
      }, 1500); // Wait for 1.5 seconds (1500ms) before redirecting
    },
    onError: (error) => {
      toast.error("Failed to create project. Please try again.");
      console.error("Error creating project:", error);
    }
  });
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input id="name" {...field} placeholder="Enter project name" required />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Controller
                name="client"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>

                    <SelectContent className="bg-white">
                      {clients && clients.length > 0 ? (
                        clients.map((client) => (
                          <SelectItem key={client._id} value={client._id}>
                            {client.companyName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-2 py-1 text-sm text-muted-foreground">
                          No clients found
                        </div>
                      )}

                      <div className="border-t my-1" />

                      {/* Add Client Button inside the dropdown */}
                      <div className="px-2 py-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="w-full text-blue-600 text-left"
                              onClick={(e) => e.stopPropagation()} // Important: Prevent select from triggering
                            >
                              + Add New Client
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="h-3/4 w-full bg-white overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Add Client</DialogTitle>
                              <DialogDescription>
                                Fill out the details to create a new client.
                              </DialogDescription>
                            </DialogHeader>
                            <ClientForm />
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="outline">
                                  Cancel
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => <Input id="location" {...field} placeholder="Enter project location" required />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Input
                    id="start-date"
                    type="date"
                    value={field.value ? field.value.split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <Input
                    id="end-date"
                    type="date"
                    value={field.value ? field.value.split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Textarea id="description" {...field} placeholder="Enter project description" className="min-h-32" />}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="value">Project Value</Label>
              <Controller
                name="value"
                control={control}
                render={({ field }) => <Input id="value" type="number" {...field} placeholder="Enter project value" />}
              />

            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Project Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            </div>
            <div className="space-y-2">
              <Label htmlFor="manager">Project Manager</Label>
              <Controller
                name="manager"
                control={control}
                render={({ field }) => <Input id="manager" {...field} placeholder="Enter project manager" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisor">Site Supervisor</Label>
              <Controller
                name="supervisor"
                control={control}
                render={({ field }) => <Input id="supervisor" {...field} placeholder="Enter site supervisor" />}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4 pt-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Primary Contact</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Controller
                      name="contactName"
                      control={control}
                      render={({ field }) => <Input id="contact-name" {...field} placeholder="Enter contact name" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-role">Role</Label>
                    <Controller
                      name="contactRole"
                      control={control}
                      render={({ field }) => <Input id="contact-role" {...field} placeholder="Enter contact name" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Controller
                      name="contactEmail"
                      control={control}
                      render={({ field }) => <Input id="contact-email" type="email" {...field} placeholder="Enter contact email" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Controller
                      name="contactPhone"
                      control={control}
                      render={({ field }) => <Input id="contact-phone" {...field} placeholder="Enter contact phone" />}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button type="button" variant="outline" className="w-full">
            Add Another Contact
          </Button>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 pt-4">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center gap-2">
              <h3 className="text-lg font-medium">Upload Project Documents</h3>
              <p className="text-sm text-muted-foreground">Drag and drop files here or click to browse</p>
              <Button type="button" variant="outline" className="mt-2">
                Browse Files
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/projects")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </form>
  )
}
