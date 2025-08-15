"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ItemActions({ item }: { item: any }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: item.description,
    unit: item.unit,
    unitPrice: item.unitPrice,
  });

  const queryClient = useQueryClient();

// Update mutation
const updateMutation = useMutation({
  mutationFn: async (data: typeof formData) => {
    try {
      const res = await axiosInstance.put(`/items/${item._id}`, data);
      return res.data; // ✅ make sure to return something usable
    } catch (err) {
      throw err; // let TanStack handle it
    }
  },
  onSuccess: () => {
    toast.success("Item updated");
    queryClient.invalidateQueries({ queryKey: ["items"] });
    setIsEditOpen(false);
  },
  onError: () => {
    toast.error("Failed to update item");
  },
});

// Delete mutation
const deleteMutation = useMutation({
  mutationFn: async () => {
    try {
      await axiosInstance.delete(`/items/${item._id}`);
    } catch (err) {
      throw err;
    }
  },
  onSuccess: () => {
    toast.success("Item deleted");
    queryClient.invalidateQueries({ queryKey: ["items"] });
  },
  onError: () => {
    toast.error("Failed to delete item");
  },
});


  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="flex space-x-2">
      {/* View / Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="bg-green-500 hover:bg-green-600">
            View
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>Unit</Label>
              <Input
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>Unit Price</Label>
              <Input
                type="number"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unitPrice: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <b>{item.description}</b>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
