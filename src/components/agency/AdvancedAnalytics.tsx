
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Download,
  Calendar,
  Clock,
  Target,
  Users,
  DollarSign
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalHours: number;
  billableHours: number;
  teamUtilization: number;
  averageTaskCompletion: number;
  sprintVelocity: number;
}

const AdvancedAnalytics = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('month');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    totalHours: 0,
    billableHours: 0,
    teamUtilization: 0,
    averageTaskCompletion: 0,
    sprintVelocity: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    
    // Set up real-time subscription for analytics updates
    const channel = supabase
      .channel('analytics-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        () => fetchAnalytics()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks'
        },
        () => fetchAnalytics()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Calculate date range
      const now = new Date();
      let startDate = new Date();
      
      switch (timeRange) {
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      // Fetch projects data
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .gte('created_at', startDate.toISOString());

      // Fetch service requests data
      const { data: serviceRequestsData } = await supabase
        .from('service_requests')
        .select('*')
        .gte('created_at', startDate.toISOString());

      // Calculate analytics
      const totalProjects = projectsData?.length || 0;
      const activeProjects = projectsData?.filter(p => p.status === 'active').length || 0;
      const completedProjects = projectsData?.filter(p => p.status === 'completed').length || 0;
      
      const totalHours = projectsData?.reduce((sum, p) => sum + (p.actual_hours || 0), 0) || 0;
      const estimatedHours = projectsData?.reduce((sum, p) => sum + (p.estimated_hours || 0), 0) || 0;
      
      const teamUtilization = estimatedHours > 0 ? Math.round((totalHours / estimatedHours) * 100) : 0;
      
      setAnalytics({
        totalProjects,
        activeProjects,
        completedProjects,
        totalTasks: 25, // Mock data - would come from tasks table
        completedTasks: 18, // Mock data
        totalHours,
        billableHours: Math.round(totalHours * 0.85), // 85% billable rate
        teamUtilization,
        averageTaskCompletion: 72, // Mock data
        sprintVelocity: 23 // Mock data
      });
      
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    const reportData = {
      timeRange,
      generatedAt: new Date().toISOString(),
      analytics
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "Analytics report exported successfully",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportReport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.activeProjects}</p>
                <p className="text-xs text-gray-500">of {analytics.totalProjects} total</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Task Completion</p>
                <p className="text-2xl font-bold text-green-600">{analytics.averageTaskCompletion}%</p>
                <p className="text-xs text-gray-500">{analytics.completedTasks}/{analytics.totalTasks} tasks</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Utilization</p>
                <p className="text-2xl font-bold text-purple-600">{analytics.teamUtilization}%</p>
                <p className="text-xs text-gray-500">{analytics.totalHours}h logged</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Billable Hours</p>
                <p className="text-2xl font-bold text-orange-600">{analytics.billableHours}h</p>
                <p className="text-xs text-gray-500">Sprint velocity: {analytics.sprintVelocity}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completed Projects</span>
                <span>{Math.round((analytics.completedProjects / analytics.totalProjects) * 100) || 0}%</span>
              </div>
              <Progress value={Math.round((analytics.completedProjects / analytics.totalProjects) * 100) || 0} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Task Completion Rate</span>
                <span>{analytics.averageTaskCompletion}%</span>
              </div>
              <Progress value={analytics.averageTaskCompletion} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Team Utilization</span>
                <span>{analytics.teamUtilization}%</span>
              </div>
              <Progress value={analytics.teamUtilization} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">New service request submitted</span>
                <Badge variant="outline">2h ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sprint "Q1 Features" completed</span>
                <Badge variant="outline">1d ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Team member added to project</span>
                <Badge variant="outline">2d ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Project milestone reached</span>
                <Badge variant="outline">3d ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
