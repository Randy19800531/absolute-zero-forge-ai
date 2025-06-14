
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import HeroSection from '@/components/dashboard/HeroSection';
import StatsGrid from '@/components/dashboard/StatsGrid';
import FeaturesGrid from '@/components/dashboard/FeaturesGrid';
import PricingSection from '@/components/dashboard/PricingSection';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <HeroSection />
            <StatsGrid />

            {/* Main Content Grid - Equal Heights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 flex">
                <div className="w-full">
                  <QuickActions />
                </div>
              </div>
              <div className="lg:col-span-2 flex">
                <div className="w-full">
                  <RecentActivity />
                </div>
              </div>
            </div>

            <FeaturesGrid />
            <PricingSection />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
