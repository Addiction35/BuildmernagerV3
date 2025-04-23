import { notFound } from "next/navigation"
import { TeamDetails } from "@/components/teams/team-details"

// Mock function to get team data
function getTeam(id: string) {
  const teams = {
    TEAM001: {
      id: "TEAM001",
      name: "Alpha Construction Crew",
      department: "Construction",
      description: "Specialized in residential building construction with expertise in modern techniques",
      teamLead: {
        id: "user1",
        name: "John Doe",
        role: "Project Manager",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
      },
      members: [
        { id: "user1", name: "John Doe", role: "Project Manager", avatar: "JD" },
        { id: "user4", name: "Emily Davis", role: "Construction Manager", avatar: "ED" },
        { id: "user7", name: "David Miller", role: "Carpenter", avatar: "DM" },
        { id: "user8", name: "Lisa Taylor", role: "Safety Officer", avatar: "LT" },
      ],
      specializations: "Residential construction, Framing, Finishing, Foundation work",
      activeProjects: 2,
      completedProjects: 15,
      performance: 92,
      projects: [
        {
          id: "PRJ1234",
          name: "Oakridge Tower Phase 1",
          startDate: "2023-03-10",
          endDate: "2023-08-15",
          status: "In Progress",
        },
        {
          id: "PRJ1098",
          name: "Downtown Retail Center",
          startDate: "2022-08-20",
          endDate: "2023-01-15",
          status: "Completed",
        },
      ],
    },
    TEAM002: {
      id: "TEAM002",
      name: "Beta Engineering Team",
      department: "Engineering",
      description: "Structural engineering specialists with focus on commercial buildings",
      teamLead: {
        id: "user2",
        name: "Jane Smith",
        role: "Engineer",
        email: "jane.smith@example.com",
        phone: "(555) 234-5678",
      },
      members: [
        { id: "user2", name: "Jane Smith", role: "Engineer", avatar: "JS" },
        { id: "user3", name: "Robert Johnson", role: "Architect", avatar: "RJ" },
      ],
      specializations: "Structural engineering, CAD design, Load calculations, Seismic analysis",
      activeProjects: 3,
      completedProjects: 8,
      performance: 95,
      projects: [
        {
          id: "PRJ1222",
          name: "Main Street Bridge Renovation",
          startDate: "2023-02-15",
          endDate: "2023-09-30",
          status: "In Progress",
        },
        {
          id: "PRJ1156",
          name: "Westside Office Complex",
          startDate: "2022-11-15",
          endDate: "2023-06-30",
          status: "In Progress",
        },
        {
          id: "PRJ1145",
          name: "City Park Redevelopment",
          startDate: "2022-10-10",
          endDate: "2023-04-15",
          status: "In Progress",
        },
      ],
    },
    TEAM003: {
      id: "TEAM003",
      name: "Delta Electrical Crew",
      department: "Electrical",
      description: "Specialized electrical installation and maintenance team",
      teamLead: {
        id: "user5",
        name: "Michael Wilson",
        role: "Electrician",
        email: "michael.wilson@example.com",
        phone: "(555) 345-6789",
      },
      members: [
        { id: "user5", name: "Michael Wilson", role: "Electrician", avatar: "MW" },
        { id: "user6", name: "Sarah Brown", role: "Plumber", avatar: "SB" },
      ],
      specializations: "Electrical wiring, Circuit installation, Lighting systems, Power distribution",
      activeProjects: 1,
      completedProjects: 12,
      performance: 88,
      projects: [
        {
          id: "PRJ1198",
          name: "West Wing Expansion",
          startDate: "2023-01-20",
          endDate: "2023-07-15",
          status: "In Progress",
        },
      ],
    },
  }

  return teams[id as keyof typeof teams]
}

export default function TeamPage({ params }: { params: { id: string } }) {
  const team = getTeam(params.id)

  if (!team) {
    notFound()
  }

  return <TeamDetails team={team} />
}
