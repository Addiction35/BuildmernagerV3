export interface Subsection {
  id: string
  code: string
  name: string
  description: string
  quantity: number
  unit: string
  rate: number
  amount: number
}

export interface Section {
  id: string
  code: string
  name: string
  description: string
  quantity: number
  unit: string
  rate: number
  amount: number
  subsections: Subsection[]
}

export interface Group {
  id: string
  code: string
  name: string
  description: string
  quantity: number
  unit: string
  rate: number
  amount: number
  sections: Section[]
}

export interface EstimateData {
  id: string
  name: string
  projectId: string
  clientId: string
  date: string
  status: string
  description: string
  notes: string
  groups: Group[]
}
