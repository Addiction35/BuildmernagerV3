"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  Users,
  Briefcase,
  DollarSign,
  ShoppingCart,
  UserPlus,
  Building,
  Clock,
} from "lucide-react"

export function NotificationsFilter() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "projects",
    "tasks",
    "documents",
    "comments",
    "meetings",
  ])

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filter</CardTitle>
        <CardDescription>Filter notifications by type</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible defaultValue="notification-type">
          <AccordionItem value="notification-type">
            <AccordionTrigger className="text-sm font-medium">Notification Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="projects"
                    checked={selectedTypes.includes("projects")}
                    onCheckedChange={() => handleTypeChange("projects")}
                  />
                  <Label htmlFor="projects" className="flex items-center gap-2 font-normal">
                    <Users className="h-4 w-4" /> Projects
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tasks"
                    checked={selectedTypes.includes("tasks")}
                    onCheckedChange={() => handleTypeChange("tasks")}
                  />
                  <Label htmlFor="tasks" className="flex items-center gap-2 font-normal">
                    <Bell className="h-4 w-4" /> Tasks
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="documents"
                    checked={selectedTypes.includes("documents")}
                    onCheckedChange={() => handleTypeChange("documents")}
                  />
                  <Label htmlFor="documents" className="flex items-center gap-2 font-normal">
                    <FileText className="h-4 w-4" /> Documents
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="comments"
                    checked={selectedTypes.includes("comments")}
                    onCheckedChange={() => handleTypeChange("comments")}
                  />
                  <Label htmlFor="comments" className="flex items-center gap-2 font-normal">
                    <MessageSquare className="h-4 w-4" /> Comments
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="meetings"
                    checked={selectedTypes.includes("meetings")}
                    onCheckedChange={() => handleTypeChange("meetings")}
                  />
                  <Label htmlFor="meetings" className="flex items-center gap-2 font-normal">
                    <Calendar className="h-4 w-4" /> Meetings
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="clients"
                    checked={selectedTypes.includes("clients")}
                    onCheckedChange={() => handleTypeChange("clients")}
                  />
                  <Label htmlFor="clients" className="flex items-center gap-2 font-normal">
                    <Briefcase className="h-4 w-4" /> Clients
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vendors"
                    checked={selectedTypes.includes("vendors")}
                    onCheckedChange={() => handleTypeChange("vendors")}
                  />
                  <Label htmlFor="vendors" className="flex items-center gap-2 font-normal">
                    <ShoppingCart className="h-4 w-4" /> Vendors
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="teams"
                    checked={selectedTypes.includes("teams")}
                    onCheckedChange={() => handleTypeChange("teams")}
                  />
                  <Label htmlFor="teams" className="flex items-center gap-2 font-normal">
                    <UserPlus className="h-4 w-4" /> Teams
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="financials"
                    checked={selectedTypes.includes("financials")}
                    onCheckedChange={() => handleTypeChange("financials")}
                  />
                  <Label htmlFor="financials" className="flex items-center gap-2 font-normal">
                    <DollarSign className="h-4 w-4" /> Financials
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="time-period">
            <AccordionTrigger className="text-sm font-medium">Time Period</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="today" defaultChecked />
                  <Label htmlFor="today" className="flex items-center gap-2 font-normal">
                    <Clock className="h-4 w-4" /> Today
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="yesterday" defaultChecked />
                  <Label htmlFor="yesterday" className="flex items-center gap-2 font-normal">
                    <Clock className="h-4 w-4" /> Yesterday
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="thisWeek" defaultChecked />
                  <Label htmlFor="thisWeek" className="flex items-center gap-2 font-normal">
                    <Calendar className="h-4 w-4" /> This Week
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="thisMonth" />
                  <Label htmlFor="thisMonth" className="flex items-center gap-2 font-normal">
                    <Calendar className="h-4 w-4" /> This Month
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="older" />
                  <Label htmlFor="older" className="flex items-center gap-2 font-normal">
                    <Calendar className="h-4 w-4" /> Older
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="projects">
            <AccordionTrigger className="text-sm font-medium">Projects</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="all-projects" defaultChecked />
                  <Label htmlFor="all-projects" className="flex items-center gap-2 font-normal">
                    <Building className="h-4 w-4" /> All Projects
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="riverside" />
                  <Label htmlFor="riverside" className="font-normal">
                    Riverside Apartments
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hillside" />
                  <Label htmlFor="hillside" className="font-normal">
                    Hillside Residence
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="community" />
                  <Label htmlFor="community" className="font-normal">
                    Community Center
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="retail" />
                  <Label htmlFor="retail" className="font-normal">
                    Retail Store Fitout
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Reset Filters
        </Button>
      </CardFooter>
    </Card>
  )
}
