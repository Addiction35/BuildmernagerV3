"use client";
import { useForm, FormProvider } from "react-hook-form";
import { TaskForm } from "@/components/tasks/task-form"
export default function NewTaskPage() {
  const methods = useForm();
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Task</h1>
        <p className="text-muted-foreground">Add a new task to the system</p>
      </div>
      <FormProvider {...methods}>
        <TaskForm />
      </FormProvider>
    </div>
  );
}