// types/client.ts

export type ClientFormData = {
  companyName: string;
  clientType: "individual" | "business" | "government" | "nonprofit";
  primaryContact: string;
  contactTitle?: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  industry:
    | "residential"
    | "commercial"
    | "industrial"
    | "infrastructure"
    | "healthcare"
    | "education"
    | "government"
    | "other";
  taxId?: string;
  notes?: string;
};

export type Client = {
  id: string
  name: string
  type: "Individual" | "Company" | "Organization" // or whatever values you support
  contact: string
  email: string
  status: "Active" | "Inactive"
  projects: number
}