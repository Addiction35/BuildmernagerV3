// src/types.ts
export type Project {
  _id: string;
  name: string;
  client: string;
  location: string;
  status: string;
  value: number;
  startDate: string;
  endDate: string;
  progress: number;
  type: string;
  manager: string;
  supervisor: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
}
