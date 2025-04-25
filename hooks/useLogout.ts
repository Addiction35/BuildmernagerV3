// hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      try {
        // Optionally call the backend logout endpoint if needed
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, { withCredentials: true });
        
        // Clear cookies
        Cookies.remove("auth_token");
        Cookies.remove("user_data");
      } catch (error) {
        throw new Error("Logout failed");
      }
    },
    onSuccess: () => {
      toast({
        title: "Logged out successfully",
        description: "You have been logged out.",
        variant: "default",
      });
      router.push("/login");
    },
    onError: (error: any) => {
      toast({
        title: "Logout failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });
};
