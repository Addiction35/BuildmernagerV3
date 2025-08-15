"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddItemForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ description: "", unit: "", unitPrice: "" });

  const mutation = useMutation({
    mutationFn: async (newItem: typeof form) => {
      const res = await axiosInstance.post("/items", {
        ...newItem,
        unitPrice: parseFloat(newItem.unitPrice),
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Item added successfully!");
      setForm({ description: "", unit: "", unitPrice: "" });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: () => {
      toast.error("Failed to add item");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form
      className="space-y-3 p-4 border rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="unit"
        placeholder="Unit"
        value={form.unit}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        step="0.01"
        name="unitPrice"
        placeholder="Unit Price"
        value={form.unitPrice}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mutation.isPending ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
}
