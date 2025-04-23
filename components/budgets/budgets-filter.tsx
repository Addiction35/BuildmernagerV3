"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function BudgetsFilter() {
  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search budgets..." className="pl-8" />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="PRJ001">Riverside Apartments</SelectItem>
            <SelectItem value="PRJ002">Downtown Office Renovation</SelectItem>
            <SelectItem value="PRJ003">Hillside Residence</SelectItem>
            <SelectItem value="PRJ004">Community Center</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="over-budget">Over Budget</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="project">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project">Project</SelectItem>
            <SelectItem value="amount-high">Highest Amount</SelectItem>
            <SelectItem value="amount-low">Lowest Amount</SelectItem>
            <SelectItem value="percent-used">Percent Used</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Filter</Button>
      </div>
    </div>
  )
}
