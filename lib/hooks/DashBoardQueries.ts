import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../api/dashboard';

// GET all DashBoard stats
export const useStats = () =>
  useQuery({ queryKey: ['stats'], queryFn: fetchStats });