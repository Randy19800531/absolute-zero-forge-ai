
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Settings } from 'lucide-react';
import UserMenu from './UserMenu';

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <Settings className="h-5 w-5" />
      </Button>
      <UserMenu />
    </div>
  );
};

export default HeaderActions;
