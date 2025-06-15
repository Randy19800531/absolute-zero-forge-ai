
import React from 'react';
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
  Palette,
  BookOpen,
  Layers
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/', section: 'main' },
  { icon: Brain, label: 'AI Engine', href: '/ai-engine', section: 'ai' },
  { icon: Workflow, label: 'Workflows', href: '/workflows', section: 'ai' },
  { icon: Code, label: 'VBA Generator', href: '/vba-generator', section: 'ai' },
  { icon: Layers, label: 'Low-No Code Builder', href: '/low-no-code-builder', section: 'ai' },
  { icon: Palette, label: 'Theme Customizer', href: '/theme-customizer', section: 'customization' },
  { icon: Building2, label: 'Agency Workspace', href: '/agency', section: 'workspace' },
  { icon: BarChart3, label: 'Projects', href: '/projects', section: 'workspace' },
  { icon: BookOpen, label: 'Documentation', href: '/documentation', section: 'support' },
  { icon: Shield, label: 'Admin Portal', href: '/admin', section: 'admin' },
  { icon: TestTube, label: 'Testing Suite', href: '/testing', section: 'dev' },
  { icon: Zap, label: 'Integrations', href: '/integrations', section: 'dev' },
];

const groupedItems = {
  main: menuItems.filter(item => item.section === 'main'),
  ai: menuItems.filter(item => item.section === 'ai'),
  customization: menuItems.filter(item => item.section === 'customization'),
  workspace: menuItems.filter(item => item.section === 'workspace'),
  support: menuItems.filter(item => item.section === 'support'),
  admin: menuItems.filter(item => item.section === 'admin'),
  dev: menuItems.filter(item => item.section === 'dev'),
};

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <img 
            src="/lovable-uploads/e98ccf6d-cbf3-4af9-aadd-04d01eacfc41.png" 
            alt="Absolute-0.AI" 
            className="h-6 w-6 rounded-full"
          />
          <span className="font-bold text-lg">A0.AI</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.main.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.ai.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Customization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.customization.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.workspace.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.support.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin & Development</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[...groupedItems.admin, ...groupedItems.dev].map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
