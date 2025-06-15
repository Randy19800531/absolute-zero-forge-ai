
import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';

interface SuperUserGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const SuperUserGuard = ({ children, fallback }: SuperUserGuardProps) => {
  const { hasRole, loading } = useUserRole();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!hasRole('admin')) {
    return fallback || (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="text-center p-6">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600">
            You need admin or superuser privileges to access this area.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default SuperUserGuard;
