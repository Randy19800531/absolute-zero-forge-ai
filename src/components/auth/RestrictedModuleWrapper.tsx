
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Shield, Key } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import { usePrivilegeElevation } from '@/hooks/usePrivilegeElevation';
import PrivilegeElevationDialog from './PrivilegeElevationDialog';

interface RestrictedModuleWrapperProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'superuser';
  moduleName: string;
  moduleDescription?: string;
}

const RestrictedModuleWrapper = ({
  children,
  requiredRole = 'admin',
  moduleName,
  moduleDescription = "This module requires elevated privileges."
}: RestrictedModuleWrapperProps) => {
  const { hasRole, loading } = useUserRole();
  const { isElevated, isVerifying, elevatePrivileges, revokePrivileges } = usePrivilegeElevation();
  const [showElevationDialog, setShowElevationDialog] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // If user has permanent role access or temporary elevated access
  if (hasRole(requiredRole) || isElevated) {
    return (
      <div className="space-y-4">
        {isElevated && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-orange-700">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Elevated Privileges Active</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={revokePrivileges}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Revoke Access
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        {children}
      </div>
    );
  }

  // If user doesn't have access - show privilege elevation option
  return (
    <div className="space-y-4">
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-6">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {moduleName} - Access Required
          </h2>
          <p className="text-gray-600 mb-4">
            {moduleDescription}
          </p>
          
          <Button 
            onClick={() => setShowElevationDialog(true)}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <Key className="h-4 w-4 mr-2" />
            Enter Admin Password
          </Button>
          
          <div className="text-xs text-gray-500 mt-4">
            <p>🔐 Temporary access will be granted for this session</p>
          </div>
        </CardContent>
      </Card>

      <PrivilegeElevationDialog
        open={showElevationDialog}
        onOpenChange={setShowElevationDialog}
        onElevate={elevatePrivileges}
        isVerifying={isVerifying}
        featureName={moduleName}
      />
    </div>
  );
};

export default RestrictedModuleWrapper;
