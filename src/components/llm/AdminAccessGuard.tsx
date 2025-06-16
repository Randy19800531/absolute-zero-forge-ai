
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Shield } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/hooks/useAuth';

interface AdminAccessGuardProps {
  children: React.ReactNode;
}

const DebugCard = ({ user, role, hasRole }: { user: any; role: string; hasRole: (role: string) => boolean }) => (
  <Card className="mb-4 border-yellow-200 bg-yellow-50">
    <CardHeader>
      <CardTitle className="text-sm text-yellow-800">🔍 Debug Information</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-yellow-700">
      <div className="grid grid-cols-2 gap-2">
        <div>Email: {user?.email || 'Not logged in'}</div>
        <div>Role: {role || 'No role assigned'}</div>
        <div>Has Admin: {hasRole('admin') ? '✅' : '❌'}</div>
        <div>Has Superuser: {hasRole('superuser') ? '✅' : '❌'}</div>
      </div>
      <div className="mt-2 text-xs">
        If you don't see admin access, you may need to:
        <br />1. Login with randypet80@gmail.com
        <br />2. Or assign admin role to your current account
      </div>
    </CardContent>
  </Card>
);

const AdminAccessGuard = ({ children }: AdminAccessGuardProps) => {
  const { hasRole, role, loading } = useUserRole();
  const { user } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading authentication...</span>
      </div>
    );
  }

  // Check if user has admin access
  if (!hasRole('admin')) {
    return (
      <div className="space-y-4">
        <DebugCard user={user} role={role} hasRole={hasRole} />
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-6">
            <Lock className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Access Required</h2>
            <p className="text-gray-600 mb-4">
              You need administrator privileges to access LLM configuration.
            </p>
            <div className="text-sm text-gray-500">
              <p>Current user: {user?.email || 'Not logged in'}</p>
              <p>Current role: {role || 'No role assigned'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DebugCard user={user} role={role} hasRole={hasRole} />
      {children}
    </div>
  );
};

export default AdminAccessGuard;
