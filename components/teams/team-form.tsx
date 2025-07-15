"use client"

import type React from "react"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormDescription, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

const TeamForm = () => {
  const methods = useForm()
  const router = useRouter()
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  // Mock team members data
  const availableMembers = [
    { id: "user1", name: "John Doe", role: "Project Manager" },
    { id: "user2", name: "Jane Smith", role: "Engineer" },
    { id: "user3", name: "Robert Johnson", role: "Architect" },
    { id: "user4", name: "Emily Davis", role: "Construction Manager" },
    { id: "user5", name: "Michael Wilson", role: "Electrician" },
    { id: "user6", name: "Sarah Brown", role: "Plumber" },
    { id: "user7", name: "David Miller", role: "Carpenter" },
    { id: "user8", name: "Lisa Taylor", role: "Safety Officer" },
  ]

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    )
  }

  const onSubmit = async (data: any) => {
    // In a real app, you would submit the form data to your API
    toast({
      title: "Team created",
      description: "Your team has been created successfully.",
    })

    // Redirect to teams page
    router.push("/teams")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Team</CardTitle>
      </CardHeader>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="teamName">Team Name</FormLabel>
                  <Input id="teamName" placeholder="Enter team name" required />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="department">Department</FormLabel>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="architecture">Architecture</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="management">Project Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="teamLead">Team Lead</FormLabel>
                <Select>
                  <SelectTrigger id="teamLead">
                    <SelectValue placeholder="Select team lead" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {availableMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="description">Team Description</FormLabel>
                <Textarea id="description" placeholder="Enter team description" className="min-h-[100px]" />
              </div>

              <div className="space-y-2">
                <FormLabel>Team Members</FormLabel>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {availableMembers.map((member) => (
                        <div key={member.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`member-${member.id}`}
                            checked={selectedMembers.includes(member.id)}
                            onCheckedChange={() => toggleMember(member.id)}
                          />
                          <label
                            htmlFor={`member-${member.id}`}
                            className="flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <span>{member.name}</span>
                            <span className="text-muted-foreground">{member.role}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="specializations">Team Specializations</FormLabel>
                <Textarea id="specializations" placeholder="Enter team specializations" className="min-h-[80px]" />
                <FormDescription>List the key skills and specializations of this team</FormDescription>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Create Team</Button>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  )
}

export default TeamForm
