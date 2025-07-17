"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "@/lib/axios";

interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  status?: string;
  notificationPreferences?: object;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false); // 🔥 Track hydration

  const isAuthenticated = !!user;

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Restore user from localStorage after mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setReady(true); // ✅ Hydration complete
  }, []);

  const authContextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated]
  );

  // ⛔ Prevent rendering children until hydration complete
  if (!ready) return null;

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
