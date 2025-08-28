"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useExpRefs, usePoRefs, useWageRefs } from "@/lib/hooks/summaryQueries"
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

type DataCategory = "expenses" | "purchaseOrders" | "wages"

// Custom label renderer with connector lines
const renderCustomizedLabel = (props: any) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, outerRadius, percent, name } = props
  const radius = outerRadius + 20
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${name} ${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

export function DashboardPieChart() {
  const [category, setCategory] = useState<DataCategory>("expenses")

  const { data: purchaseOrdersByReference, isLoading, error } = usePoRefs()
  const { data: wagesByReference } = useWageRefs()
  const { data: expensesByReference } = useExpRefs()

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading Summary...</div>
  }

  if (error || !purchaseOrdersByReference) {
    return <div className="p-4 text-sm text-red-500">Failed to load Summary.</div>
  }

  // Select data based on category
  const getData = () => {
    switch (category) {
      case "expenses":
        return expensesByReference
      case "purchaseOrders":
        return purchaseOrdersByReference
      case "wages":
        return wagesByReference
      default:
        return expensesByReference
    }
  }

  // Map API {reference, amount} -> recharts {name, value}
  const rawData =
    getData()
      ?.filter((item) => item.reference && item.amount > 0)
      .map((item) => ({
        name: item.reference,
        value: item.amount,
        reference: item.reference,
        amount: item.amount,
      })) ?? []

  // ✅ If empty, show one fallback slice
  const data =
    rawData.length > 0
      ? rawData
      : [{ name: "No Data", value: 1, reference: "N/A", amount: 0 }]

  // ✅ Calculate total (real total, not counting placeholder)
  const total = rawData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Expenditure Breakdown</CardTitle>
          <CardDescription>Distribution by reference</CardDescription>
        </div>
        <Select value={category} onValueChange={(value) => setCategory(value as DataCategory)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expenses">Expenses</SelectItem>
            <SelectItem value="purchaseOrders">Purchase Orders</SelectItem>
            <SelectItem value="wages">Wages</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, _name, props: any) => [
                  `Ksh ${Number(value).toLocaleString()}`,
                  props.payload?.name || "Reference",
                ]}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">
              Total {category === "expenses" ? "Expenses" : category === "purchaseOrders" ? "Purchase Orders" : "Wages"}
            </p>
            <p className="text-2xl font-bold">Ksh {total.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Reference Breakdown</p>
            <div className="mt-2 space-y-1">
              {data.map((item, index) => (
                <div key={item.reference + index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="mr-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs">{item.reference}</span>
                  </div>
                  <span className="text-xs font-medium">Ksh {item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
