import { notFound } from "next/navigation"
import { TaskDetails } from "@/components/tasks/task-details"

// Mock function to get task data
function getTask(id: string) {
  const tasks = {
    TASK001: {
      id: "TASK001",
      title: "Complete foundation work",
      description: "Finish the foundation work for the main building structure",
      status: "In Progress",
      priority: "High",
      assignee: "John Doe",
      project: "Residential Building A",
      startDate: "2023-04-15",
      dueDate: "2023-04-30",
      completionPercentage: 65,
      comments: [
        { id: 1, user: "Jane Smith", text: "Materials have been delivered", date: "2023-04-16" },
        { id: 2, user: "John Doe", text: "Started work on the north section", date: "2023-04-17" },
      ],
      attachments: [
        { id: 1, name: "foundation_plan.pdf", size: "2.4 MB", uploadedBy: "Robert Johnson", date: "2023-04-14" },
      ],
    },
    TASK002: {
      id: "TASK002",
      title: "Electrical wiring installation",
      description: "Install electrical wiring throughout the second floor",
      status: "To Do",
      priority: "Medium",
      assignee: "Jane Smith",
      project: "Commercial Complex B",
      startDate: "2023-05-01",
      dueDate: "2023-05-15",
      completionPercentage: 0,
      comments: [],
      attachments: [
        { id: 1, name: "electrical_plan.pdf", size: "3.1 MB", uploadedBy: "Robert Johnson", date: "2023-04-25" },
      ],
    },
    TASK003: {
      id: "TASK003",
      title: "Plumbing inspection",
      description: "Conduct inspection of all plumbing work on the first floor",
      status: "Completed",
      priority: "High",
      assignee: "Robert Johnson",
      project: "Residential Building A",
      startDate: "2023-04-10",
      dueDate: "2023-04-12",
      completionPercentage: 100,
      comments: [
        {
          id: 1,
          user: "Robert Johnson",
          text: "Inspection completed, all systems functioning properly",
          date: "2023-04-12",
        },
      ],
      attachments: [
        { id: 1, name: "inspection_report.pdf", size: "1.7 MB", uploadedBy: "Robert Johnson", date: "2023-04-12" },
      ],
    },
  }

  return tasks[id as keyof typeof tasks]
}

export default function TaskPage({ params }: { params: { id: string } }) {
  const task = getTask(params.id)

  if (!task) {
    notFound()
  }

  return <TaskDetails task={task} />
}
