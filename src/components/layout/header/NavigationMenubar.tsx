
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

const NavigationMenubar = () => {
  return (
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
  );
};

export default NavigationMenubar;
