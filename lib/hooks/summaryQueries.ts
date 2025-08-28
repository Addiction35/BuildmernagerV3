import { useQuery } from "@tanstack/react-query";
import { DashBoardStats, fetchExpRef, fetchPOref, fetchWageref } from "../api/Summary";

export const usePoRefs = () =>
  useQuery({ queryKey: ['purchaseRef'], queryFn: fetchPOref });
export const useWageRefs = () =>
  useQuery({ queryKey: ['WagesRef'], queryFn: fetchWageref });

export const useExpRefs = () =>
  useQuery({ queryKey: ['ExpensesRef'], queryFn: fetchExpRef });

export const useDashBoardGraph = () =>
  useQuery({ queryKey: ['ExpensesRef'], queryFn: DashBoardStats });