"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    expenses: 4000,
    revenue: 2400,
  },
  {
    name: "Feb",
    expenses: 3000,
    revenue: 1398,
  },
  {
    name: "Mar",
    expenses: 2000,
    revenue: 9800,
  },
  {
    name: "Apr",
    expenses: 2780,
    revenue: 3908,
  },
  {
    name: "May",
    expenses: 1890,
    revenue: 4800,
  },
  {
    name: "Jun",
    expenses: 2390,
    revenue: 3800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#22c55e" name="Revenue" />
        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  )
}
