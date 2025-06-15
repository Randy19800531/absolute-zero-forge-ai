
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import HeaderLogo from './header/HeaderLogo';
import NavigationMenubar from './header/NavigationMenubar';
import QuickActionsMenu from './header/QuickActionsMenu';
import HeaderActions from './header/HeaderActions';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
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
