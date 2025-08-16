"use client";

import { useState } from "react";
import axios from "axios";

export default function PayslipForm() {
  const [form, setForm] = useState({
    employeeName: "",
    date: "",
    grossPay: "",
    allowanceDeductions: "",
    personalRelief: "",
    preparedBy: "",
    projectId: "",
    deductionRates: {
      paye: "",
      nssfTier1: "",
      nssfTier2: "",
      shif: "",
      housingLevy: "",
    },
    customDeductions: [{ name: "", amount: "", isPercentage: false }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCustomChange = (i: number, field: string, value: string | boolean) => {
    const updated = [...form.customDeductions];
    updated[i][field] = value;
    setForm({ ...form, customDeductions: updated });
  };

  const addCustomDeduction = () => {
    setForm({
      ...form,
      customDeductions: [...form.customDeductions, { name: "", amount: "", isPercentage: false }],
    });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/payslips", form);
    alert("Payslip created successfully!");
  };

  return (
    <form onSubmit={submitForm} className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Create Payslip</h2>

      <div className="grid grid-cols-2 gap-4">
        <input name="employeeName" placeholder="Employee Name" onChange={handleChange} className="input input-bordered w-full" />
        <input type="date" name="date" onChange={handleChange} className="input input-bordered w-full" />
        <input name="grossPay" placeholder="Gross Pay" type="number" onChange={handleChange} className="input input-bordered w-full" />
        <input name="allowanceDeductions" placeholder="Allowance/Deductions" type="number" onChange={handleChange} className="input input-bordered w-full" />
        <input name="personalRelief" placeholder="Personal Relief" type="number" onChange={handleChange} className="input input-bordered w-full" />
        <input name="preparedBy" placeholder="Prepared By" onChange={handleChange} className="input input-bordered w-full" />
        <input name="projectId" placeholder="Project ID" onChange={handleChange} className="input input-bordered w-full" />
      </div>

      <h3 className="text-lg font-semibold">Standard Deductions</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(form.deductionRates).map((field) => (
          <input
            key={field}
            name={`deductionRates.${field}`}
            placeholder={field.toUpperCase()}
            type="number"
            onChange={(e) =>
              setForm({
                ...form,
                deductionRates: { ...form.deductionRates, [field]: e.target.value },
              })
            }
            className="input input-bordered w-full"
          />
        ))}
      </div>

      <h3 className="text-lg font-semibold">Custom Deductions</h3>
      {form.customDeductions.map((ded, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            placeholder="Name"
            value={ded.name}
            onChange={(e) => handleCustomChange(i, "name", e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            placeholder="Amount"
            type="number"
            value={ded.amount}
            onChange={(e) => handleCustomChange(i, "amount", e.target.value)}
            className="input input-bordered w-full"
          />
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={ded.isPercentage}
              onChange={(e) => handleCustomChange(i, "isPercentage", e.target.checked)}
            />
            %
          </label>
        </div>
      ))}
      <button type="button" onClick={addCustomDeduction} className="btn btn-outline btn-sm">
        + Add Deduction
      </button>

      <button type="submit" className="btn btn-primary w-full">
        Create Payslip
      </button>
    </form>
  );
}
