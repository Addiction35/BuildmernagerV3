"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function PayslipForm() {
  const [form, setForm] = useState({
    employeeName: "",
    date: "",
    grossPay: "",
    allowanceDeductions: "",
    personalRelief: "",
    preparedBy: "",
    projectId: "",
    customDeductions: [] as { name: string; amount: string; isPercentage: boolean }[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCustomDeduction = () => {
    setForm({
      ...form,
      customDeductions: [...form.customDeductions, { name: "", amount: "", isPercentage: false }],
    });
  };

  const updateCustomDeduction = (index: number, field: string, value: string | boolean) => {
    const updated = [...form.customDeductions];
    (updated[index] as any)[field] = value;
    setForm({ ...form, customDeductions: updated });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        grossPay: parseFloat(form.grossPay) || 0,
        allowanceDeductions: parseFloat(form.allowanceDeductions) || 0,
        personalRelief: parseFloat(form.personalRelief) || 0,
        customDeductions: form.customDeductions.map((d) => ({
          ...d,
          amount: parseFloat(d.amount) || 0,
        })),
      };
      const res = await axiosInstance.post("/pay-slip", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Payslip created successfully!");
      setForm({
        employeeName: "",
        date: "",
        grossPay: "",
        allowanceDeductions: "",
        personalRelief: "",
        preparedBy: "",
        projectId: "",
        customDeductions: [],
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Error creating payslip");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Payslip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Employee Name</Label>
                <Input
                  name="employeeName"
                  value={form.employeeName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Gross Pay</Label>
                <Input
                  type="number"
                  name="grossPay"
                  value={form.grossPay}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Allowance Deductions</Label>
                <Input
                  type="number"
                  name="allowanceDeductions"
                  value={form.allowanceDeductions}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Personal Relief</Label>
                <Input
                  type="number"
                  name="personalRelief"
                  value={form.personalRelief}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Prepared By</Label>
                <Input
                  name="preparedBy"
                  value={form.preparedBy}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Project ID</Label>
                <Input
                  name="projectId"
                  value={form.projectId}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Custom Deductions */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Custom Deductions</Label>
                <Button type="button" variant="outline" onClick={addCustomDeduction}>
                  + Add Deduction
                </Button>
              </div>
              {form.customDeductions.map((deduction, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <Input
                    placeholder="Deduction Name"
                    value={deduction.name}
                    onChange={(e) => updateCustomDeduction(index, "name", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={deduction.amount}
                    onChange={(e) => updateCustomDeduction(index, "amount", e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={deduction.isPercentage}
                      onChange={(e) => updateCustomDeduction(index, "isPercentage", e.target.checked)}
                    />
                    <Label>%</Label>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Saving..." : "Create Payslip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
