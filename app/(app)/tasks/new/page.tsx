"use client";

import dynamic from "next/dynamic";

const TaskForm = dynamic(() => import("@/components/tasks/task-form"), { ssr: false });

export default function NewTaskPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Task</h1>
        <p className="text-muted-foreground">Add a new task to the system</p>
      </div>
      <TaskForm />
    </div>
  );
}