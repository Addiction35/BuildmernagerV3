"use client";

import AddItemForm from "@/components/items/itemsform";
import ItemsTable from "@/components/items/itemsTable";
import { Toaster } from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function ItemsPage() {
  const queryClient = useQueryClient();

  // Fetch items with TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axiosInstance.get("/items");
      return res.data.data; // ✅ matches your controller's "data" field
    },
  });

  // Add item handler (invalidate query so list refreshes)
  const handleItemAdded = () => {
    queryClient.invalidateQueries({ queryKey: ["items"] });
  };

  // Delete item handler (invalidate query so list refreshes)
  const handleItemDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ["items"] });
  };

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Items</h1>

      {/* Add Item Form */}
      <AddItemForm onItemAdded={handleItemAdded} />

      <div className="mt-6">
        {isLoading && <p>Loading items...</p>}
        {isError && <p className="text-red-500">Failed to load items</p>}
        {data && <ItemsTable data={data} onDeleted={handleItemDeleted} />}
      </div>
    </div>
  );
}
