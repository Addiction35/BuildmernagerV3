"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Printer, Receipt } from "lucide-react"
import { fetchPOById } from "@/lib/api/Purchase-Orders"
import { useReactToPrint } from "react-to-print"
import { use } from "react"

export default function PurchaseOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const printRef = useRef<HTMLDivElement>(null)

  const {
    data: purchaseOrder,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["purchaseOrder", id],
    queryFn: () => fetchPOById(id),
    enabled: !!id,
  })

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Purchase Order ${purchaseOrder?.poNumber}`,
    removeAfterPrint: true,
  })

  const statusColors: Record<string, string> = {
    approved: "bg-green-100 text-green-800",
    delivered: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-600",
    default: "bg-gray-100 text-gray-800",
  }

  if (isLoading) return <div className="text-center py-10 text-gray-500">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">Error loading purchase order</div>
  if (!purchaseOrder) return notFound()

  //    Calculate subtotal from all items
const subtotal = purchaseOrder.items?.reduce((acc, item) => {
  const amount =
    typeof item.amount === "number"
      ? item.amount
      : (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
  return acc + amount;
}, 0) || 0;

const tax = subtotal * 0.1; // Assuming a 10% tax rate

  return (
    <div ref={printRef} className="flex flex-col gap-8 p-6 bg-white">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Link href="/purchase-orders">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            Purchase Order {purchaseOrder.poNumber || "N/A"}
          </h1>
          <span
            className={`px-2 py-3 rounded-md text-sm font-bold ${
              statusColors[purchaseOrder.status] || statusColors.default
            }`}
          >
            {purchaseOrder.status || "Unknown"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print / Export PDF
          </Button>
          {!purchaseOrder.billed && (
            <Link href={`/bills/new?from=po&id=${purchaseOrder.id || ""}`}>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Receipt className="mr-2 h-4 w-4" />
                Convert to Bill
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-500">Purchase Order Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900 font-semibold">
                {purchaseOrder.date
                  ? new Date(purchaseOrder.date).toLocaleDateString()
                  : "Unknown Date"}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-500">Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-blue-600 font-semibold">
                {purchaseOrder.projectId?.name || "-"}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-500">Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900 font-semibold">{purchaseOrder.reference || "-"}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">Vendor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-gray-700">
                {Object.entries({
                  Name: purchaseOrder.vendorName,
                  Address: purchaseOrder.vendorAddress,
                  Contact: purchaseOrder.vendorContact,
                  Email: purchaseOrder.vendorEmail,
                  Phone: purchaseOrder.vendorPhone,
                }).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-1">
                    <dt className="font-medium text-gray-600">{key}</dt>
                    <dd className="text-right text-gray-800">{value || "-"}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card className="shadow border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-gray-700">
                {Object.entries({
                  "Delivery Date": purchaseOrder.deliveryDate
                    ? new Date(purchaseOrder.deliveryDate).toLocaleDateString()
                    : "Unknown Date",
                  "Delivery Address": purchaseOrder.deliveryAddress,
                  Status: purchaseOrder.status,
                  Company: purchaseOrder.company,
                }).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-1">
                    <dt className="font-medium text-gray-600">{key}</dt>
                    <dd className="text-right text-gray-800">{value || "-"}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Purchase Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left font-semibold">Description</th>
                    <th className="p-3 text-center font-semibold">Quantity</th>
                    <th className="p-3 text-center font-semibold">Unit</th>
                    <th className="p-3 text-right font-semibold">Unit Price</th>
                    <th className="p-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrder.items?.length > 0 ? (
                    purchaseOrder.items.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.description || "-"}</td>
                      <td className="p-3 text-center">{item.quantity ?? 0}</td>
                      <td className="p-3 text-center">{item.unit || "-"}</td>
                      <td className="p-3 text-right">
                        {new Intl.NumberFormat("en-KE", {
                          style: "currency",
                          currency: "KES",
                        }).format(item.unitPrice ?? 0)}
                      </td>
                      <td className="p-3 text-right">
                        {(() => {
                          const amount =
                            typeof item.amount === "number"
                              ? item.amount
                              : (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

                          return new Intl.NumberFormat("en-KE", {
                            style: "currency",
                            currency: "KES",
                          }).format(amount);
                        })()}
                      </td>
                    </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-3 text-center text-gray-500">
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
              <tfoot>
                <tr className="border-t font-medium">
                  <td colSpan={4} className="p-3 text-right">Subtotal</td>
                  <td className="p-3 text-right">
                    {new Intl.NumberFormat("en-KE", {
                      style: "currency",
                      currency: "KES",
                    }).format(subtotal)}
                  </td>
                </tr>
                <tr className="border-t font-medium">
                  <td colSpan={4} className="p-3 text-right">Tax</td>
                  <td className="p-3 text-right">
                    {new Intl.NumberFormat("en-KE", {
                      style: "currency",
                      currency: "KES",
                    }).format(tax ?? 0)}
                  </td>
                </tr>
                <tr className="border-t font-bold">
                  <td colSpan={4} className="p-3 text-right">Total</td>
                  <td className="p-3 text-right">
                    {new Intl.NumberFormat("en-KE", {
                      style: "currency",
                      currency: "KES",
                    }).format(purchaseOrder.amount ?? 0)}
                  </td>
                </tr>
              </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {purchaseOrder.notes && (
          <Card className="shadow border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 whitespace-pre-line">{purchaseOrder.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
