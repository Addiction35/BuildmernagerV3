"use client";

import { useEffect, useState } from "react";
import AddItemForm from "@/components/items/itemsform";
import ItemsTable from "@/components/items/itemsTable";
import api from "@/lib/axios";
import { Toaster } from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export default function ItemsPage() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axiosInstance.get("/items");
    setItems(res.data);
  };

  const handleItemAdded = (item) => {
    setItems((prev) => [...prev, item]);
  };

  const handleItemDeleted = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <AddItemForm onItemAdded={handleItemAdded} />
      <div className="mt-6">
        <ItemsTable data={items} onDeleted={handleItemDeleted} />
      </div>
    </div>
  );
}
