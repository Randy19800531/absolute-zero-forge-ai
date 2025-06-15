
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import HeroSection from '@/components/dashboard/HeroSection';
import StatsGrid from '@/components/dashboard/StatsGrid';
import FeaturesGrid from '@/components/dashboard/FeaturesGrid';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PricingSection from '@/components/dashboard/PricingSection';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1">
          {!user && (
            <div className="bg-blue-600 text-white p-4 text-center">
              <div className="flex items-center justify-center gap-4">
                <span>Ready to build intelligent AI agents?</span>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In / Sign Up
                </Button>
              </div>
            </div>
          )}
          
          <HeroSection />
          <StatsGrid />
          <FeaturesGrid />
          <QuickActions />
          <RecentActivity />
          <PricingSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
