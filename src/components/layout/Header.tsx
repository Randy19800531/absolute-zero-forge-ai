
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Settings, Menu, Workflow, Code, Brain, Layers, Shield, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const quickActions = [
    {
      icon: Workflow,
      title: 'Workflow',
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/workflows',
    },
    {
      icon: Code,
      title: 'VBA',
      color: 'bg-green-500 hover:bg-green-600',
      path: '/vba-generator',
    },
    {
      icon: Brain,
      title: 'Agent',
      color: 'bg-purple-500 hover:bg-purple-600',
      path: '/ai-engine',
    },
    {
      icon: Layers,
      title: 'Builder',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      path: '/low-no-code-builder',
    },
    {
      icon: Settings,
      title: 'LLM',
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/llm-config',
    },
  ];

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
      
      <div className="flex items-center gap-6">
        {/* Navigation Menubar */}
        <Menubar className="hidden lg:flex">
          <MenubarMenu>
            <MenubarTrigger>Features</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>AI Workflows</MenubarItem>
              <MenubarItem>VBA Generation</MenubarItem>
              <MenubarItem>LLM Integrations</MenubarItem>
              <MenubarItem>Team Collaboration</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Solutions</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Workflow Automation</MenubarItem>
              <MenubarItem>VBA Development</MenubarItem>
              <MenubarItem>AI Integration</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Enterprise Solutions</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Resources</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Documentation</MenubarItem>
              <MenubarItem>API Reference</MenubarItem>
              <MenubarItem>Community</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Support</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Admin Portal and Quick Actions - Compact horizontal layout */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Admin Portal */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 h-8 px-3"
            onClick={() => navigate('/admin')}
            title="Admin Portal"
          >
            <div className="p-1 rounded bg-red-500 hover:bg-red-600 text-white">
              <Shield className="h-3 w-3" />
            </div>
            <span className="text-xs">Admin Portal</span>
          </Button>

          {/* Quick Actions - Compact horizontal buttons */}
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 h-8 px-2"
              onClick={() => navigate(action.path)}
              title={action.title}
            >
              <div className={`p-1 rounded ${action.color} text-white`}>
                <action.icon className="h-3 w-3" />
              </div>
              <span className="text-xs">{action.title}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        {/* User Avatar with Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Account</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/account')}>
              <User className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
