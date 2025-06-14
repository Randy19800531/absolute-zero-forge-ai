
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
  Palette,
  BookOpen,
  CreditCard,
  Layers
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
  { icon: Layers, label: 'Low-No Code Builder', href: '/low-no-code-builder', section: 'ai' },
  { icon: Palette, label: 'Theme Customizer', href: '/theme-customizer', section: 'customization' },
  { icon: Building2, label: 'Agency Workspace', href: '/agency', section: 'workspace' },
  { icon: BarChart3, label: 'Projects', href: '/projects', section: 'workspace' },
  { icon: BookOpen, label: 'Documentation', href: '/documentation', section: 'support' },
  { icon: Shield, label: 'Admin Portal', href: '/admin', section: 'admin' },
  { icon: TestTube, label: 'Testing Suite', href: '/testing', section: 'dev' },
  { icon: Zap, label: 'Integrations', href: '/integrations', section: 'dev' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const handleSubscribe = (planName: string) => {
    console.log(`Subscribing to ${planName} plan`);
    // TODO: Integrate with Stripe checkout
  };

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
        "fixed left-0 top-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/e98ccf6d-cbf3-4af9-aadd-04d01eacfc41.png" 
              alt="Absolute-0.AI" 
              className="h-6 w-6 rounded-full"
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
          
          {/* Pricing Section */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-3 px-3 py-2 mb-4">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <span className="font-semibold text-gray-200">Pricing Plans</span>
            </div>
            
            <div className="space-y-3 px-2">
              {/* Starter Plan */}
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm text-white">Starter</h3>
                    <p className="text-lg font-bold text-white">$29<span className="text-xs text-gray-400">/mo</span></p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">Perfect for individuals</p>
                <ul className="text-xs text-gray-300 space-y-1 mb-3">
                  <li>• Up to 5 AI workflows</li>
                  <li>• 50 VBA scripts/month</li>
                  <li>• Basic LLM integrations</li>
                </ul>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full text-xs"
                  onClick={() => handleSubscribe('Starter')}
                >
                  Start Trial
                </Button>
              </div>

              {/* Professional Plan */}
              <div className="bg-blue-900 border border-blue-500 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm text-white">Professional</h3>
                    <p className="text-lg font-bold text-white">$79<span className="text-xs text-gray-400">/mo</span></p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">Ideal for growing teams</p>
                <ul className="text-xs text-gray-300 space-y-1 mb-3">
                  <li>• Unlimited AI workflows</li>
                  <li>• 500 VBA scripts/month</li>
                  <li>• All LLM integrations</li>
                  <li>• Team collaboration</li>
                </ul>
                <Button 
                  size="sm" 
                  className="w-full text-xs bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleSubscribe('Professional')}
                >
                  Subscribe
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm text-white">Enterprise</h3>
                    <p className="text-lg font-bold text-white">$199<span className="text-xs text-gray-400">/mo</span></p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">For large organizations</p>
                <ul className="text-xs text-gray-300 space-y-1 mb-3">
                  <li>• Unlimited everything</li>
                  <li>• Custom VBA templates</li>
                  <li>• SOC 2 compliance</li>
                  <li>• API access</li>
                </ul>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full text-xs"
                  onClick={() => handleSubscribe('Enterprise')}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
