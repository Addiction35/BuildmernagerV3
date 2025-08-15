"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export default function AddItemForm({ onItemAdded }) {
  const [form, setForm] = useState({ description: "", unit: "", unitPrice: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/items", {
        ...form,
        unitPrice: parseFloat(form.unitPrice),
      });
      toast.success("Item added successfully!");
      setForm({ description: "", unit: "", unitPrice: "" });
      onItemAdded(res.data);
    } catch (err) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3 p-4 border rounded-md" onSubmit={handleSubmit}>
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
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
}
