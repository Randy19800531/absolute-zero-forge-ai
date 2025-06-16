
import React, { useState, useEffect } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/hooks/useAuth';
import AdminAccessGuard from './AdminAccessGuard';
import MasterPasswordForm from './MasterPasswordForm';
import LLMProvidersContent from './LLMProvidersContent';

const LLMProviders = () => {
  const { hasRole, role, loading } = useUserRole();
  const { user } = useAuth();
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('LLM Config - Auth Debug:', {
      user: user?.email,
      role,
      hasAdmin: hasRole('admin'),
      hasSuperuser: hasRole('superuser'),
      loading
    });
  }, [user, role, hasRole, loading]);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleLock = () => {
    setIsUnlocked(false);
  };

  return (
    <AdminAccessGuard>
      {!isUnlocked ? (
        <MasterPasswordForm onUnlock={handleUnlock} />
      ) : (
        <LLMProvidersContent onLock={handleLock} />
      )}
    </AdminAccessGuard>
  );
};

export default LLMProviders;
