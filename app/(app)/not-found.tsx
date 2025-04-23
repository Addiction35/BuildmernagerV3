import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Construction } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <Construction className="h-24 w-24 text-muted-foreground" />
      <h1 className="mt-6 text-3xl font-bold">Page Not Found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Return to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/projects">View Projects</Link>
        </Button>
      </div>
    </div>
  )
}
