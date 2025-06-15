import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Settings, Menu, Workflow, Code, Brain, Layers, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Workflow,
      title: 'Create Workflow',
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/workflows',
    },
    {
      icon: Code,
      title: 'Generate VBA',
      color: 'bg-green-500 hover:bg-green-600',
      path: '/vba-generator',
    },
    {
      icon: Brain,
      title: 'Deploy Agent',
      color: 'bg-purple-500 hover:bg-purple-600',
      path: '/ai-engine',
    },
    {
      icon: Layers,
      title: 'Low-No Code',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      path: '/low-no-code-builder',
    },
    {
      icon: Settings,
      title: 'LLM Config',
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

        {/* Admin Portal and Quick Actions - Horizontal layout */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Admin Portal */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 h-8"
            onClick={() => navigate('/admin')}
            title="Admin Portal"
          >
            <div className="p-1.5 rounded bg-red-500 hover:bg-red-600 text-white">
              <Shield className="h-3 w-3" />
            </div>
            <span className="text-xs">Admin Portal</span>
          </Button>

          {/* Quick Actions - Horizontal buttons with labels */}
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 h-8"
              onClick={() => navigate(action.path)}
              title={action.title}
            >
              <div className={`p-1.5 rounded ${action.color} text-white`}>
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
        <Avatar>
          <AvatarFallback>A0</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
