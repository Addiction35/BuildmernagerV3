import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileText, Receipt, ShoppingCart } from "lucide-react"

interface ProjectDocumentsProps {
  projectId: string
}

// This would normally come from a database
const getDocuments = (projectId: string) => {
  return [
    {
      id: "EST001",
      type: "Estimate",
      name: "Initial Project Estimate",
      date: "2023-04-10",
      status: "Approved",
      amount: "$1,250,000",
      icon: FileText,
    },
    {
      id: "PRO001",
      type: "Proposal",
      name: "Project Proposal",
      date: "2023-04-20",
      status: "Approved",
      amount: "$1,250,000",
      icon: FileText,
    },
    {
      id: "PO001",
      type: "Purchase Order",
      name: "Building Materials",
      date: "2023-05-05",
      status: "Completed",
      amount: "$350,000",
      icon: ShoppingCart,
    },
    {
      id: "PO002",
      type: "Purchase Order",
      name: "Electrical Components",
      date: "2023-06-15",
      status: "In Progress",
      amount: "$120,000",
      icon: ShoppingCart,
    },
    {
      id: "BILL001",
      type: "Bill",
      name: "Foundation Work",
      date: "2023-06-30",
      status: "Paid",
      amount: "$180,000",
      icon: Receipt,
    },
    {
      id: "EST002",
      type: "Estimate",
      name: "Additional Features",
      date: "2023-07-15",
      status: "Pending",
      amount: "$75,000",
      icon: FileText,
    },
  ]
}

export function ProjectDocuments({ projectId }: ProjectDocumentsProps) {
  const documents = getDocuments(projectId)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Link href={`/estimates/new?project=${projectId}`}>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            New Estimate
          </Button>
        </Link>
        <Link href={`/proposals/new?project=${projectId}`}>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
        </Link>
        <Link href={`/purchase-orders/new?project=${projectId}`}>
          <Button variant="outline" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        </Link>
        <Link href={`/bills/new?project=${projectId}`}>
          <Button variant="outline" size="sm">
            <Receipt className="mr-2 h-4 w-4" />
            New Bill
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <doc.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doc.status === "Approved" || doc.status === "Paid" || doc.status === "Completed"
                        ? "success"
                        : doc.status === "In Progress"
                          ? "default"
                          : doc.status === "Pending"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell>{doc.amount}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/${doc.type.toLowerCase()}s/${doc.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
