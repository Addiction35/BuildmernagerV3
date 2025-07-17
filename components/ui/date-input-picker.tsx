"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface DateInputPickerProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DateInputPicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled,
}: DateInputPickerProps) {
  const [inputValue, setInputValue] = React.useState(date ? format(date, "PPP") : "")

  React.useEffect(() => {
    setInputValue(date ? format(date, "PPP") : "")
  }, [date])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    // Attempt to parse the date from the input string
    const parsedDate = new Date(e.target.value)
    if (!isNaN(parsedDate.getTime())) {
      onDateChange(parsedDate)
    } else {
      onDateChange(undefined) // Clear date if input is invalid
    }
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange(selectedDate)
    setInputValue(selectedDate ? format(selectedDate, "PPP") : "")
  }

  return (
    <Popover>
      <div className={cn("relative flex items-center", className)}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-8" // Make space for the icon
        />
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "absolute right-0 h-full px-2 py-0", // Position icon inside input
              !date && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="sr-only">Pick a date</span>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0 z-[50]" align="start">
        <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus disabled={disabled} />
      </PopoverContent>
    </Popover>
  )
}
