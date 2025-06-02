"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Settings,
  Calculator,
  Mail,
  Bell,
  Users,
  Palette,
  Plus,
  Trash2,
  Upload,
  Save,
  Eye,
  EyeOff,
} from "lucide-react"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [taxRates, setTaxRates] = useState([
    { id: 1, name: "Sales Tax", rate: "8.25", type: "percentage" },
    { id: 2, name: "Federal Tax", rate: "21.00", type: "percentage" },
  ])

  const addTaxRate = () => {
    const newRate = {
      id: Date.now(),
      name: "",
      rate: "",
      type: "percentage",
    }
    setTaxRates([...taxRates, newRate])
  }

  const removeTaxRate = (id: number) => {
    setTaxRates(taxRates.filter((rate) => rate.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
            <Settings className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
            <p className="text-gray-600">Manage your construction company's configuration and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="tax" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="tax" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Tax</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Branding</span>
            </TabsTrigger>
          </TabsList>

          {/* Tax Management */}
          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Configuration</CardTitle>
                <CardDescription>
                  Manage tax rates, tax IDs, and other tax-related information for your construction projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-tax-id">Company Tax ID</Label>
                    <Input id="company-tax-id" placeholder="XX-XXXXXXX" defaultValue="12-3456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ein">Employer Identification Number (EIN)</Label>
                    <Input id="ein" placeholder="XX-XXXXXXX" defaultValue="98-7654321" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Tax Rates</h3>
                    <Button onClick={addTaxRate} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tax Rate
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {taxRates.map((rate) => (
                      <div key={rate.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <Input placeholder="Tax name" defaultValue={rate.name} />
                        </div>
                        <div className="w-32">
                          <Input placeholder="Rate" defaultValue={rate.rate} />
                        </div>
                        <Select defaultValue={rate.type}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">%</SelectItem>
                            <SelectItem value="fixed">Fixed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" onClick={() => removeTaxRate(rate.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Tax Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Configuration */}
          <TabsContent value="email" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>SMTP Configuration</CardTitle>
                  <CardDescription>Configure your email server settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">Port</Label>
                      <Input id="smtp-port" placeholder="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-security">Security</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select security" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">Username</Label>
                    <Input id="smtp-username" placeholder="your-email@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="smtp-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full">Test Connection</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Customize email templates for different events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-type">Template Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project-update">Project Update</SelectItem>
                        <SelectItem value="invoice">Invoice Generation</SelectItem>
                        <SelectItem value="payment-reminder">Payment Reminder</SelectItem>
                        <SelectItem value="milestone">Project Milestone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Subject Line</Label>
                    <Input id="email-subject" placeholder="Enter email subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-body">Email Body</Label>
                    <Textarea id="email-body" placeholder="Enter email content..." className="min-h-[120px]" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Preview
                    </Button>
                    <Button className="flex-1">Save Template</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Preferences */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications about your construction projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Notifications</h3>
                  <div className="space-y-4">
                    {[
                      {
                        id: "milestones",
                        label: "Project Milestones",
                        description: "Get notified when project milestones are reached",
                      },
                      {
                        id: "budget-alerts",
                        label: "Budget Alerts",
                        description: "Receive alerts when budget thresholds are exceeded",
                      },
                      {
                        id: "document-approvals",
                        label: "Document Approvals",
                        description: "Notifications for document approval requests",
                      },
                      {
                        id: "schedule-changes",
                        label: "Schedule Changes",
                        description: "Updates about project timeline modifications",
                      },
                      {
                        id: "safety-incidents",
                        label: "Safety Incidents",
                        description: "Immediate alerts for safety-related incidents",
                      },
                    ].map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{notification.label}</div>
                          <div className="text-sm text-gray-600">{notification.description}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Switch id={`${notification.id}-email`} />
                            <Label htmlFor={`${notification.id}-email`} className="text-sm">
                              Email
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch id={`${notification.id}-app`} />
                            <Label htmlFor={`${notification.id}-app`} className="text-sm">
                              In-App
                            </Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Delivery Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="notification-frequency">Email Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-hours">Quiet Hours</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quiet hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Quiet Hours</SelectItem>
                          <SelectItem value="evening">6 PM - 8 AM</SelectItem>
                          <SelectItem value="night">10 PM - 6 AM</SelectItem>
                          <SelectItem value="weekend">Weekends</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user roles, permissions, and access levels</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Smith", email: "john@construction.com", role: "Administrator", status: "Active" },
                    {
                      name: "Sarah Johnson",
                      email: "sarah@construction.com",
                      role: "Project Manager",
                      status: "Active",
                    },
                    { name: "Mike Wilson", email: "mike@construction.com", role: "Foreman", status: "Active" },
                    { name: "Lisa Brown", email: "lisa@construction.com", role: "Accountant", status: "Inactive" },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={user.role === "Administrator" ? "default" : "secondary"}>{user.role}</Badge>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Configure permissions for different user roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-select">Select Role</Label>
                    <Select>
                      <SelectTrigger className="w-full md:w-64">
                        <SelectValue placeholder="Select role to configure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="pm">Project Manager</SelectItem>
                        <SelectItem value="foreman">Foreman</SelectItem>
                        <SelectItem value="accountant">Accountant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      "View Projects",
                      "Create Projects",
                      "Edit Projects",
                      "Delete Projects",
                      "Manage Users",
                      "View Reports",
                      "Manage Finances",
                      "Access Settings",
                    ].map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Switch id={permission.toLowerCase().replace(" ", "-")} />
                        <Label htmlFor={permission.toLowerCase().replace(" ", "-")}>{permission}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Branding */}
          <TabsContent value="branding" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Company Logo</CardTitle>
                  <CardDescription>Upload and manage your company logo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">Upload Logo</Button>
                      <div className="text-sm text-gray-600">Recommended: 200x200px, PNG or SVG</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Enter company name" defaultValue="BuildCorp Construction" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-tagline">Tagline</Label>
                    <Input
                      id="company-tagline"
                      placeholder="Enter company tagline"
                      defaultValue="Building Tomorrow, Today"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                  <CardDescription>Customize your company's color palette</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input id="primary-color" type="color" defaultValue="#ea580c" className="w-16 h-10" />
                        <Input defaultValue="#ea580c" className="flex-1" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input id="secondary-color" type="color" defaultValue="#f97316" className="w-16 h-10" />
                        <Input defaultValue="#f97316" className="flex-1" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex gap-2">
                        <Input id="accent-color" type="color" defaultValue="#fb923c" className="w-16 h-10" />
                        <Input defaultValue="#fb923c" className="flex-1" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Color Preview</Label>
                    <div className="flex gap-2">
                      <div className="h-12 w-12 rounded bg-orange-600"></div>
                      <div className="h-12 w-12 rounded bg-orange-500"></div>
                      <div className="h-12 w-12 rounded bg-orange-400"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
                <CardDescription>Customize the appearance of invoices, reports, and other documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="header-style">Header Style</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select header style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="times">Times New Roman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Include Company Logo</div>
                    <div className="text-sm text-gray-600">Show logo on all documents</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Branding Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
