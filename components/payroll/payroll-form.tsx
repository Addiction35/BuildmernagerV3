"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Sample data for employees
const employees = [
  { id: "EMP001", name: "John Doe", position: "Foreman", hourlyRate: 35 },
  { id: "EMP002", name: "Jane Smith", position: "Electrician", hourlyRate: 32 },
  { id: "EMP003", name: "Mike Johnson", position: "Plumber", hourlyRate: 30 },
  { id: "EMP004", name: "Sarah Williams", position: "Carpenter", hourlyRate: 28 },
  { id: "EMP005", name: "Robert Brown", position: "Laborer", hourlyRate: 22 },
]

// Sample data for projects
const projects = [
  { id: "PRJ001", name: "Riverside Apartments" },
  { id: "PRJ002", name: "Downtown Office Complex" },
  { id: "PRJ003", name: "Hillside Residential Development" },
  { id: "PRJ004", name: "Community Center Renovation" },
]

const payrollFormSchema = z.object({
  payPeriodStart: z.date({
    required_error: "Pay period start date is required.",
  }),
  payPeriodEnd: z.date({
    required_error: "Pay period end date is required.",
  }),
  paymentDate: z.date({
    required_error: "Payment date is required.",
  }),
  reference: z.string().min(1, "Reference is required"),
  description: z.string().optional(),
  entries: z
    .array(
      z.object({
        employeeId: z.string().min(1, "Employee is required"),
        projectId: z.string().min(1, "Project is required"),
        hours: z.coerce.number().min(0, "Hours must be a positive number"),
        rate: z.coerce.number().min(0, "Rate must be a positive number"),
        overtime: z.coerce.number().min(0, "Overtime must be a positive number"),
        deductions: z.coerce.number().min(0, "Deductions must be a positive number"),
        notes: z.string().optional(),
      }),
    )
    .min(1, "At least one payroll entry is required"),
})

type PayrollFormValues = z.infer<typeof payrollFormSchema>

const defaultValues: Partial<PayrollFormValues> = {
  payPeriodStart: new Date(),
  payPeriodEnd: new Date(),
  paymentDate: new Date(),
  reference: `PR-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
  description: "",
  entries: [
    {
      employeeId: "",
      projectId: "",
      hours: 0,
      rate: 0,
      overtime: 0,
      deductions: 0,
      notes: "",
    },
  ],
}

export function PayrollForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PayrollFormValues>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues,
  })

  function onSubmit(data: PayrollFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsSubmitting(false)
      router.push("/payroll")
    }, 1000)
  }

  const { fields, append, remove } = form.useFieldArray({
    name: "entries",
    control: form.control,
  })

  // Calculate totals
  const entries = form.watch("entries")
  const totalRegularPay = entries.reduce((sum, entry) => {
    return sum + (entry.hours || 0) * (entry.rate || 0)
  }, 0)

  const totalOvertimePay = entries.reduce((sum, entry) => {
    return sum + (entry.overtime || 0) * (entry.rate ? entry.rate * 1.5 : 0)
  }, 0)

  const totalDeductions = entries.reduce((sum, entry) => {
    return sum + (entry.deductions || 0)
  }, 0)

  const netPay = totalRegularPay + totalOvertimePay - totalDeductions

  // Auto-fill rate when employee is selected
  const handleEmployeeChange = (index: number, employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId)
    if (employee) {
      form.setValue(`entries.${index}.rate`, employee.hourlyRate)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="payPeriodStart"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pay Period Start</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payPeriodEnd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pay Period End</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference</FormLabel>
                <FormControl>
                  <Input placeholder="PR-2023-05" {...field} />
                </FormControl>
                <FormDescription>A unique reference for this payroll run</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Bi-weekly payroll" {...field} />
                </FormControl>
                <FormDescription>Optional description for this payroll run</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Payroll Entries</h3>

          {fields.map((field, index) => (
            <Card key={field.id} className="mb-4">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-md">Entry #{index + 1}</CardTitle>
                {index > 0 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
                  <FormField
                    control={form.control}
                    name={`entries.${index}.employeeId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            handleEmployeeChange(index, value)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem key={employee.id} value={employee.id}>
                                {employee.name} - {employee.position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`entries.${index}.projectId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projects.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                {project.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`entries.${index}.rate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name={`entries.${index}.hours`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regular Hours</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`entries.${index}.overtime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overtime Hours</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`entries.${index}.deductions`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deductions ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name={`entries.${index}.notes`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() =>
              append({
                employeeId: "",
                projectId: "",
                hours: 0,
                rate: 0,
                overtime: 0,
                deductions: 0,
                notes: "",
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <Separator />

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Payroll Summary</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Regular Pay</p>
              <p className="text-lg font-medium">${totalRegularPay.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overtime Pay</p>
              <p className="text-lg font-medium">${totalOvertimePay.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deductions</p>
              <p className="text-lg font-medium">${totalDeductions.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Pay</p>
              <p className="text-lg font-medium">${netPay.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/payroll")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Create Payroll Run"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
