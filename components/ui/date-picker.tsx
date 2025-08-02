"use client"
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Original DatePicker component
export function DatePicker({ className, ...props }: React.ComponentProps<typeof Button>) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground", className)}
          {...props}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

// New DatePickerWithRange component
interface DatePickerWithRangeProps {
  date: {
    from?: Date
    to?: Date
  }
  setDate: (date: { from?: Date; to?: Date }) => void
}

export function DatePickerWithRange({ date, setDate }: DatePickerWithRangeProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !date?.from || !date?.to ? "text-muted-foreground" : undefined,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              `${format(date.from, "PPP")} - ${format(date.to, "PPP")}`
            ) : (
              format(date.from, "PPP")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center" sideOffset={10}>
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          pagedNavigation
          className="border-0"
        />
      </PopoverContent>
    </Popover>
  )
}
