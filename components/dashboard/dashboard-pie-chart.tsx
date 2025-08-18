"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

type DataCategory = "expenses" | "purchaseOrders" | "wages"

interface ApiResponse {
  reference: string
  amount: number
}

export function DashboardPieChart() {
  const [category, setCategory] = useState<DataCategory>("expenses")
  const [data, setData] = useState<{ reference: string; name: string; value: number }[]>([])

  // Fetch data from API whenever category changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/summary/${category}`)
        const json: ApiResponse[] = await res.json()

        // Transform into recharts-friendly format
        const mapped = json
          .filter(item => item.reference && item.amount > 0) // skip empty refs & zero values
          .map(item => ({
            reference: item.reference,
            name: item.reference, // recharts uses "name"
            value: item.amount,   // recharts uses "value"
          }))

        setData(mapped)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    fetchData()
  }, [category])

  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0)

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
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">
              Total {category === "expenses" ? "Expenses" : category === "purchaseOrders" ? "Purchase Orders" : "Wages"}
            </p>
            <p className="text-2xl font-bold">${total.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Reference Breakdown</p>
            <div className="mt-2 space-y-1">
              {data.map((item, index) => (
                <div key={item.reference} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="mr-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
