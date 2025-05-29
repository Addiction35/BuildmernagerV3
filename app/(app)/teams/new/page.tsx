import TeamForm from "@/components/teams/team-form"

export default function NewTeamPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Team</h1>
        <p className="text-muted-foreground">Add a new team to the system</p>
      </div>
      <TeamForm />
    </div>
  )
}
