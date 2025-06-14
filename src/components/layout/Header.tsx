
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Settings, Menu } from 'lucide-react';

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
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/e98ccf6d-cbf3-4af9-aadd-04d01eacfc41.png" 
            alt="Absolute-0.AI" 
            className="h-8 w-8 rounded-full"
          />
          <h1 className="text-xl font-bold text-gray-900">Absolute-0.AI</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarFallback>A0</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
