
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target, 
  Users,
  Download,
  Calendar,
  PieChart
} from 'lucide-react';

const ReportsAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  const projectMetrics = [
    {
      name: 'Customer Management System',
      status: 'Active',
      progress: 75,
      budget: 45000,
      spent: 33750,
      hoursPlanned: 300,
      hoursSpent: 225,
      teamSize: 4
    },
    {
      name: 'E-commerce Platform',
      status: 'Completed',
      progress: 100,
      budget: 85000,
      spent: 82500,
      hoursPlanned: 520,
      hoursSpent: 518,
      teamSize: 6
    },
    {
      name: 'Mobile App Development',
      status: 'Planning',
      progress: 15,
      budget: 120000,
      spent: 18000,
      hoursPlanned: 800,
      hoursSpent: 120,
      teamSize: 5
    }
  ];

  const financialMetrics = {
    totalRevenue: 250000,
    totalCosts: 180000,
    profitMargin: 28,
    averageHourlyRate: 78,
    billableHours: 2308,
    utilizationRate: 85
  };

  const teamPerformance = [
    { name: 'John Doe', role: 'Full Stack Developer', hoursLogged: 168, tasksCompleted: 12, efficiency: 95 },
    { name: 'Sarah Miller', role: 'UI/UX Designer', hoursLogged: 156, tasksCompleted: 15, efficiency: 88 },
    { name: 'Alex Johnson', role: 'Frontend Developer', hoursLogged: 162, tasksCompleted: 10, efficiency: 92 },
    { name: 'Maria Garcia', role: 'QA Tester', hoursLogged: 148, tasksCompleted: 18, efficiency: 90 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-gray-600">Analyze project performance, financials, and team productivity</p>
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
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Revenue</span>
                </div>
                <div className="text-2xl font-bold text-green-600">${financialMetrics.totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-gray-600">+12% from last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Hours Logged</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{financialMetrics.billableHours}</div>
                <div className="text-xs text-gray-600">{financialMetrics.utilizationRate}% utilization</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Active Projects</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">{projectMetrics.filter(p => p.status === 'Active').length}</div>
                <div className="text-xs text-gray-600">2 completing this month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Profit Margin</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">{financialMetrics.profitMargin}%</div>
                <div className="text-xs text-gray-600">+3% from last month</div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                  const revenue = [180000, 195000, 220000, 210000, 235000, 250000][index];
                  const height = (revenue / 250000) * 200;
                  return (
                    <div key={month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                        style={{ height: `${height}px` }}
                      ></div>
                      <div className="text-xs mt-2">{month}</div>
                      <div className="text-xs text-gray-600">${(revenue/1000).toFixed(0)}k</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          {projectMetrics.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{project.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'Active' ? 'bg-green-100 text-green-800' :
                      project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-600">{project.progress}% Complete</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">${project.spent.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Spent of ${project.budget.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{project.hoursSpent}h</div>
                    <div className="text-xs text-gray-600">of {project.hoursPlanned}h planned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{project.teamSize}</div>
                    <div className="text-xs text-gray-600">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{Math.round((project.spent / project.hoursSpent) || 0)}</div>
                    <div className="text-xs text-gray-600">$/hour</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Project Revenue</span>
                    <span className="font-bold">${(financialMetrics.totalRevenue * 0.85).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Consulting</span>
                    <span className="font-bold">${(financialMetrics.totalRevenue * 0.10).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maintenance</span>
                    <span className="font-bold">${(financialMetrics.totalRevenue * 0.05).toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Revenue</span>
                    <span>${financialMetrics.totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Team Salaries</span>
                    <span className="font-bold">${(financialMetrics.totalCosts * 0.70).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tools & Software</span>
                    <span className="font-bold">${(financialMetrics.totalCosts * 0.15).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Infrastructure</span>
                    <span className="font-bold">${(financialMetrics.totalCosts * 0.10).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Other Expenses</span>
                    <span className="font-bold">${(financialMetrics.totalCosts * 0.05).toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Costs</span>
                    <span>${financialMetrics.totalCosts.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          {teamPerformance.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{member.efficiency}%</div>
                    <div className="text-xs text-gray-600">Efficiency</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{member.hoursLogged}h</div>
                    <div className="text-xs text-gray-600">Hours Logged</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{member.tasksCompleted}</div>
                    <div className="text-xs text-gray-600">Tasks Completed</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{Math.round(member.hoursLogged / member.tasksCompleted)}</div>
                    <div className="text-xs text-gray-600">Avg Hours/Task</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
