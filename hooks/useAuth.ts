// hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      })
      if (!res.ok) throw new Error("Not authenticated")
      return res.json()
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}
