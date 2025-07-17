
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/profile", { withCredentials: true });
      return res.data.user;
    },
    staleTime: 1000 * 60 * 5, // 🕐 5 min fresh
    retry: 1, // 🔁 Retry once if failed
  });
}

