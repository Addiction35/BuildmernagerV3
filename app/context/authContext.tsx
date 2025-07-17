"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from 'jwt-decode';
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
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const isAuthenticated = !!user;

  const login = (userData: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token); // ✅ Save JWT token
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ Remove token
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const decoded: any = jwtDecode(token); // Optional: validate expiry or extract info
        console.log("✅ Token decoded:", decoded);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("❌ Invalid token:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setReady(true);
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

  if (!ready) return null; // Prevent flicker before restoring state

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
