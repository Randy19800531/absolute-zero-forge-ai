
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Building2, 
  Shield, 
  Workflow, 
  Code, 
  TestTube,
  BarChart3,
  Zap,
  Home,
  X,
  Palette
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/', section: 'main' },
  { icon: Brain, label: 'AI Engine', href: '/ai-engine', section: 'ai' },
  { icon: Workflow, label: 'Workflows', href: '/workflows', section: 'ai' },
  { icon: Code, label: 'VBA Generator', href: '/vba-generator', section: 'ai' },
  { icon: Palette, label: 'Theme Customizer', href: '/theme-customizer', section: 'customization' },
  { icon: Building2, label: 'Agency Workspace', href: '/agency', section: 'workspace' },
  { icon: BarChart3, label: 'Projects', href: '/projects', section: 'workspace' },
  { icon: Shield, label: 'Admin Portal', href: '/admin', section: 'admin' },
  { icon: TestTube, label: 'Testing Suite', href: '/testing', section: 'dev' },
  { icon: Zap, label: 'Integrations', href: '/integrations', section: 'dev' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img 
              src="/Logo Final.PNG" 
              alt="Absolute-0.AI" 
              className="h-6 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-bold text-lg">A0.AI</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden text-white hover:bg-gray-800">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
              asChild
            >
              <Link to={item.href} className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
