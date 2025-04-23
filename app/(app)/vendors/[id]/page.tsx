import { notFound } from "next/navigation"
import { VendorDetails } from "@/components/vendors/vendor-details"

// Mock function to get vendor data
function getVendor(id: string) {
  const vendors = {
    VEN001: {
      id: "VEN001",
      companyName: "ABC Building Supplies",
      vendorType: "Supplier",
      contactPerson: "John Smith",
      email: "john@abcbuilding.com",
      phone: "(555) 123-4567",
      website: "www.abcbuilding.com",
      address: "123 Construction Ave",
      city: "Builderville",
      state: "CA",
      zipCode: "90210",
      taxId: "12-3456789",
      paymentTerms: "Net 30",
      notes: "Preferred supplier for lumber and building materials",
      activeProjects: 3,
      totalSpend: 125000,
      lastOrderDate: "2023-03-15",
      rating: 4.8,
      documents: [
        { id: 1, name: "Contract_2023.pdf", date: "2023-01-10", size: "1.2 MB" },
        { id: 2, name: "Insurance_Certificate.pdf", date: "2023-01-15", size: "0.8 MB" },
      ],
      orders: [
        { id: "PO1234", date: "2023-03-15", amount: 45000, status: "Delivered" },
        { id: "PO1156", date: "2023-02-20", amount: 32000, status: "Delivered" },
        { id: "PO1098", date: "2023-01-25", amount: 48000, status: "Delivered" },
      ],
    },
    VEN002: {
      id: "VEN002",
      companyName: "XYZ Electrical Contractors",
      vendorType: "Contractor",
      contactPerson: "Sarah Johnson",
      email: "sarah@xyzelectrical.com",
      phone: "(555) 987-6543",
      website: "www.xyzelectrical.com",
      address: "456 Wiring Lane",
      city: "Powertown",
      state: "NY",
      zipCode: "10001",
      taxId: "98-7654321",
      paymentTerms: "Net 45",
      notes: "Specialized in commercial electrical installations",
      activeProjects: 2,
      totalSpend: 87500,
      lastOrderDate: "2023-03-10",
      rating: 4.5,
      documents: [
        { id: 1, name: "Service_Agreement.pdf", date: "2023-01-05", size: "1.5 MB" },
        { id: 2, name: "Liability_Insurance.pdf", date: "2023-01-08", size: "0.9 MB" },
      ],
      orders: [
        { id: "PO1222", date: "2023-03-10", amount: 35000, status: "In Progress" },
        { id: "PO1145", date: "2023-02-15", amount: 28500, status: "Completed" },
        { id: "PO1067", date: "2023-01-20", amount: 24000, status: "Completed" },
      ],
    },
    VEN003: {
      id: "VEN003",
      companyName: "Concrete Solutions Inc.",
      vendorType: "Supplier",
      contactPerson: "Michael Brown",
      email: "michael@concretesolutions.com",
      phone: "(555) 456-7890",
      website: "www.concretesolutions.com",
      address: "789 Cement Road",
      city: "Mixerville",
      state: "TX",
      zipCode: "75001",
      taxId: "45-6789012",
      paymentTerms: "Net 30",
      notes: "Premium concrete supplier with on-time delivery",
      activeProjects: 4,
      totalSpend: 210000,
      lastOrderDate: "2023-03-25",
      rating: 4.9,
      documents: [
        { id: 1, name: "Supply_Agreement.pdf", date: "2023-01-12", size: "1.3 MB" },
        { id: 2, name: "Quality_Certification.pdf", date: "2023-01-14", size: "0.7 MB" },
      ],
      orders: [
        { id: "PO1245", date: "2023-03-25", amount: 52000, status: "Delivered" },
        { id: "PO1187", date: "2023-02-28", amount: 48000, status: "Delivered" },
        { id: "PO1134", date: "2023-02-05", amount: 55000, status: "Delivered" },
        { id: "PO1089", date: "2023-01-15", amount: 55000, status: "Delivered" },
      ],
    },
  }

  return vendors[id as keyof typeof vendors]
}

export default function VendorPage({ params }: { params: { id: string } }) {
  const vendor = getVendor(params.id)

  if (!vendor) {
    notFound()
  }

  return <VendorDetails vendor={vendor} />
}
