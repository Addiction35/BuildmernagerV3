"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ReportSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Report</CardTitle>
        <CardDescription>Set up automatic generation and delivery of your report</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="schedule-report">Schedule Report</Label>
            <p className="text-sm text-muted-foreground">Automatically generate this report on a schedule</p>
          </div>
          <Switch id="schedule-report" />
        </div>

        <Tabs defaultValue="frequency" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="frequency">Frequency</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>
          <TabsContent value="frequency" className="space-y-4 pt-4">
            <RadioGroup defaultValue="weekly" className="space-y-4">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="daily" id="daily" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="daily" className="font-medium">
                    Daily
                  </Label>
                  <p className="text-sm text-muted-foreground">The report will be generated every day</p>
                  <div className="mt-2">
                    <Label htmlFor="daily-time">Time</Label>
                    <Input id="daily-time" type="time" defaultValue="06:00" className="mt-1 w-full max-w-[180px]" />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="weekly" id="weekly" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="weekly" className="font-medium">
                    Weekly
                  </Label>
                  <p className="text-sm text-muted-foreground">The report will be generated once a week</p>
                  <div className="mt-2 grid gap-2">
                    <Label htmlFor="weekly-day">Day of Week</Label>
                    <Select defaultValue="monday">
                      <SelectTrigger id="weekly-day" className="w-full max-w-[180px]">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label htmlFor="weekly-time">Time</Label>
                    <Input id="weekly-time" type="time" defaultValue="06:00" className="w-full max-w-[180px]" />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="monthly" id="monthly" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="monthly" className="font-medium">
                    Monthly
                  </Label>
                  <p className="text-sm text-muted-foreground">The report will be generated once a month</p>
                  <div className="mt-2 grid gap-2">
                    <Label htmlFor="monthly-day">Day of Month</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="monthly-day" className="w-full max-w-[180px]">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label htmlFor="monthly-time">Time</Label>
                    <Input id="monthly-time" type="time" defaultValue="06:00" className="w-full max-w-[180px]" />
                  </div>
                </div>
              </div>
            </RadioGroup>
          </TabsContent>
          <TabsContent value="delivery" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Delivery Method</Label>
                <RadioGroup defaultValue="email" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dashboard" id="dashboard" />
                    <Label htmlFor="dashboard">Dashboard Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Email and Dashboard</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Email Recipients</Label>
                <Input id="recipients" placeholder="Enter email addresses (comma separated)" className="w-full" />
                <p className="text-xs text-muted-foreground">Enter multiple email addresses separated by commas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  defaultValue="Project Financial Summary Report"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="attach-pdf">Attach PDF</Label>
                  <Switch id="attach-pdf" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="attach-excel">Attach Excel</Label>
                  <Switch id="attach-excel" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
