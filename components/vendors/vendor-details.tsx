"use client"

import Link from "next/link"
import { ArrowLeft, Building, Calendar, Download, FileText, Globe, Mail, MapPin, Phone, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Document {
  id: number
  name: string
  date: string
  size: string
}

interface Order {
  id: string
  date: string
  amount: number
  status: string
}

interface Vendor {
  id: string
  companyName: string
  vendorType: string
  contactPerson: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  state: string
  zipCode: string
  taxId: string
  paymentTerms: string
  notes: string
  activeProjects: number
  totalSpend: number
  lastOrderDate: string
  rating: number
  documents: Document[]
  orders: Order[]
}

interface VendorDetailsProps {
  vendor: Vendor
}

export function VendorDetails({ vendor }: VendorDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Pending":
        return "bg-yellow-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/vendors" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vendors
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{vendor.companyName}</CardTitle>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge>{vendor.vendorType}</Badge>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(vendor.rating) ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm">{vendor.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Edit</Button>
                <Button>New Order</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{vendor.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{vendor.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{vendor.website}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {vendor.address}, {vendor.city}, {vendor.state} {vendor.zipCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Business Information</h3>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Tax ID / Business Number</p>
                        <p>{vendor.taxId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Terms</p>
                        <p>{vendor.paymentTerms}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Primary Contact</p>
                        <p>{vendor.contactPerson}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Notes</h3>
                    <p className="mt-2 text-muted-foreground">{vendor.notes}</p>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 border-b px-4 py-3 font-medium">
                      <div>Order ID</div>
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    {vendor.orders.map((order) => (
                      <div key={order.id} className="grid grid-cols-4 px-4 py-3">
                        <div className="font-medium">{order.id}</div>
                        <div>{formatDate(order.date)}</div>
                        <div>{formatCurrency(order.amount)}</div>
                        <div>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  {vendor.documents.length > 0 ? (
                    <div className="space-y-2">
                      {vendor.documents.map((document) => (
                        <div key={document.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-blue-500" />
                            <div>
                              <p className="font-medium">{document.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {document.size} • Uploaded on {formatDate(document.date)}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No documents available</p>
                  )}

                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Upload Document
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Vendor Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">{vendor.activeProjects}</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <p className="text-sm text-muted-foreground">Total Spend</p>
                  <p className="text-2xl font-bold">{formatCurrency(vendor.totalSpend)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Order</h3>
                <div className="mt-1 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(vendor.lastOrderDate)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
                <div className="mt-2 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    Create Purchase Order
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Quote
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Vendor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
