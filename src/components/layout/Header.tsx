
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import HeaderLogo from './header/HeaderLogo';
import NavigationMenubar from './header/NavigationMenubar';
import QuickActionsMenu from './header/QuickActionsMenu';
import HeaderActions from './header/HeaderActions';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <HeaderLogo />
      </div>
      
      <div className="flex items-center gap-6">
        <NavigationMenubar />
        <QuickActionsMenu />
      </div>
      
      <HeaderActions />
    </header>
  );
};

export default Header;
