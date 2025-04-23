import { notFound } from "next/navigation"
import { ClientDetails } from "@/components/clients/client-details"

// Mock function to get client data
function getClient(id: string) {
  const clients = {
    CLT001: {
      id: "CLT001",
      companyName: "Oakridge Development Corp",
      clientType: "Business",
      primaryContact: "Emily Chen",
      contactTitle: "Project Director",
      email: "emily@oakridge.com",
      phone: "(555) 234-5678",
      address: "789 Corporate Parkway",
      city: "Metropolis",
      state: "IL",
      zipCode: "60001",
      industry: "Commercial",
      taxId: "45-6789012",
      notes: "Major commercial developer with multiple ongoing projects",
      activeProjects: 3,
      totalRevenue: 1250000,
      lastProjectDate: "2023-03-10",
      documents: [
        { id: 1, name: "Contract_2023.pdf", date: "2023-01-05", size: "1.4 MB" },
        { id: 2, name: "Requirements_Spec.pdf", date: "2023-01-12", size: "2.8 MB" },
      ],
      projects: [
        {
          id: "PRJ1234",
          name: "Oakridge Tower Phase 1",
          startDate: "2023-03-10",
          budget: 450000,
          status: "In Progress",
        },
        {
          id: "PRJ1156",
          name: "Westside Office Complex",
          startDate: "2022-11-15",
          budget: 380000,
          status: "In Progress",
        },
        { id: "PRJ1098", name: "Downtown Retail Center", startDate: "2022-08-20", budget: 420000, status: "Completed" },
      ],
    },
    CLT002: {
      id: "CLT002",
      companyName: "Greenfield City Council",
      clientType: "Government",
      primaryContact: "Robert Williams",
      contactTitle: "Infrastructure Manager",
      email: "robert.williams@greenfield.gov",
      phone: "(555) 876-5432",
      address: "123 City Hall Plaza",
      city: "Greenfield",
      state: "WA",
      zipCode: "98001",
      industry: "Government",
      taxId: "Gov-12345",
      notes: "Municipal client with focus on infrastructure projects",
      activeProjects: 2,
      totalRevenue: 3750000,
      lastProjectDate: "2023-02-15",
      documents: [
        { id: 1, name: "Municipal_Agreement.pdf", date: "2023-01-08", size: "1.9 MB" },
        { id: 2, name: "Project_Scope.pdf", date: "2023-01-20", size: "3.2 MB" },
      ],
      projects: [
        {
          id: "PRJ1222",
          name: "Main Street Bridge Renovation",
          startDate: "2023-02-15",
          budget: 1850000,
          status: "In Progress",
        },
        {
          id: "PRJ1145",
          name: "City Park Redevelopment",
          startDate: "2022-10-10",
          budget: 1900000,
          status: "In Progress",
        },
      ],
    },
    CLT003: {
      id: "CLT003",
      companyName: "Sunnyvale Medical Center",
      clientType: "Business",
      primaryContact: "Dr. James Wilson",
      contactTitle: "Facilities Director",
      email: "jwilson@sunnyvalemedical.org",
      phone: "(555) 345-6789",
      address: "456 Healthcare Drive",
      city: "Sunnyvale",
      state: "CA",
      zipCode: "94086",
      industry: "Healthcare",
      taxId: "78-9012345",
      notes: "Expanding healthcare facility with strict compliance requirements",
      activeProjects: 1,
      totalRevenue: 2100000,
      lastProjectDate: "2023-01-20",
      documents: [
        { id: 1, name: "Healthcare_Compliance.pdf", date: "2022-12-15", size: "2.1 MB" },
        { id: 2, name: "Expansion_Plans.pdf", date: "2022-12-20", size: "4.5 MB" },
      ],
      projects: [
        { id: "PRJ1198", name: "West Wing Expansion", startDate: "2023-01-20", budget: 2100000, status: "In Progress" },
      ],
    },
  }

  return clients[id as keyof typeof clients]
}

export default function ClientPage({ params }: { params: { id: string } }) {
  const client = getClient(params.id)

  if (!client) {
    notFound()
  }

  return <ClientDetails client={client} />
}
