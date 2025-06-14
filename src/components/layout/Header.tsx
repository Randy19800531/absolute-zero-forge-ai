
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Settings, Menu } from 'lucide-react';
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
  const handleSubscribe = (planName: string) => {
    console.log(`Subscribing to ${planName} plan`);
    // TODO: Integrate with Stripe checkout
  };

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
          <MenubarTrigger>Pricing</MenubarTrigger>
          <MenubarContent className="w-96">
            <div className="p-4">
              <div className="space-y-4">
                {/* Starter Plan */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Starter</h3>
                      <p className="text-2xl font-bold">$29<span className="text-sm text-gray-600">/month</span></p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleSubscribe('Starter')}>
                      Start Trial
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Perfect for individuals</p>
                  <ul className="text-xs space-y-1">
                    <li>• Up to 5 AI workflows</li>
                    <li>• 50 VBA scripts/month</li>
                    <li>• Basic LLM integrations</li>
                  </ul>
                </div>

                {/* Professional Plan */}
                <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Professional</h3>
                      <p className="text-2xl font-bold">$79<span className="text-sm text-gray-600">/month</span></p>
                    </div>
                    <Button size="sm" onClick={() => handleSubscribe('Professional')}>
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Ideal for growing teams</p>
                  <ul className="text-xs space-y-1">
                    <li>• Unlimited AI workflows</li>
                    <li>• 500 VBA scripts/month</li>
                    <li>• All LLM integrations</li>
                    <li>• Team collaboration</li>
                  </ul>
                </div>

                {/* Enterprise Plan */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Enterprise</h3>
                      <p className="text-2xl font-bold">$199<span className="text-sm text-gray-600">/month</span></p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleSubscribe('Enterprise')}>
                      Contact Sales
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">For large organizations</p>
                  <ul className="text-xs space-y-1">
                    <li>• Unlimited everything</li>
                    <li>• Custom VBA templates</li>
                    <li>• SOC 2 compliance</li>
                    <li>• API access</li>
                  </ul>
                </div>
              </div>
            </div>
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
