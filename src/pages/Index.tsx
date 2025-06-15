
import HeroSection from '@/components/dashboard/HeroSection';
import StatsGrid from '@/components/dashboard/StatsGrid';
import FeaturesGrid from '@/components/dashboard/FeaturesGrid';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PricingSection from '@/components/dashboard/PricingSection';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          
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
            
            <div className="container mx-auto px-6 py-8 space-y-12">
              <HeroSection />
              <StatsGrid />
              <FeaturesGrid />
              <RecentActivity />
            </div>
            
            <div className="container mx-auto px-6 py-8">
              <PricingSection />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
