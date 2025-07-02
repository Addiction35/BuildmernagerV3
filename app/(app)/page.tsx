'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


import { AdminDashboard } from '@/components/dashboard/admin-dashboard';
import { ProjectManagerDashboard } from '@/components/dashboard/project-manager-dashboard';
import { QADashboard } from '@/components/dashboard/qa-dashboard';
import { UserDashboard } from '@/components/dashboard/user-dashboard';
import { useAuth } from '../context/authContext';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !user) return <p className="p-6">Loading dashboard...</p>;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'project_manager':
      return <ProjectManagerDashboard />;
    case 'qa':
      return <QADashboard />;
    case 'user':
    default:
      return <UserDashboard />;
  }
}
