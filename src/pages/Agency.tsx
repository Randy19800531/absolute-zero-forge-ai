
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, ArrowLeft, Users, FolderOpen, Clock, Target, BarChart3, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectDashboard from '@/components/agency/ProjectDashboard';
import SprintManagement from '@/components/agency/SprintManagement';
import TaskBoard from '@/components/agency/TaskBoard';
import TeamManagement from '@/components/agency/TeamManagement';
import ServiceRequestForm from '@/components/agency/ServiceRequestForm';
import ServiceRequestList from '@/components/agency/ServiceRequestList';
import TimeTracking from '@/components/agency/TimeTracking';
import ReportsAnalytics from '@/components/agency/ReportsAnalytics';
import AdvancedAnalytics from '@/components/agency/AdvancedAnalytics';

const Agency = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-orange-500" />
                  Agency Workspace
                </h1>
                <p className="text-gray-600">
                  Complete AGILE project management with sprint planning, task tracking, and team collaboration
                </p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-8 mb-6">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="service-requests" className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Service Requests
                </TabsTrigger>
                <TabsTrigger value="sprints" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Sprints
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Reports
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <ProjectDashboard />
              </TabsContent>

              <TabsContent value="service-requests">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Service Requests</h2>
                    <ServiceRequestForm />
                  </div>
                  <ServiceRequestList />
                </div>
              </TabsContent>

              <TabsContent value="sprints">
                <SprintManagement />
              </TabsContent>

              <TabsContent value="tasks">
                <TaskBoard />
              </TabsContent>

              <TabsContent value="team">
                <TeamManagement />
              </TabsContent>

              <TabsContent value="time">
                <TimeTracking />
              </TabsContent>

              <TabsContent value="reports">
                <ReportsAnalytics />
              </TabsContent>

              <TabsContent value="analytics">
                <AdvancedAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Agency;
