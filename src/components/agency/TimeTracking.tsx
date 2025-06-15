
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, Square, Timer, Calendar, BarChart3 } from 'lucide-react';

const TimeTracking = () => {
  const activeSession = {
    id: '1',
    taskName: 'Implement user authentication',
    projectName: 'Customer Management System',
    startTime: '09:30 AM',
    duration: '2h 15m',
    isRunning: true
  };

  const recentEntries = [
    {
      id: '1',
      date: '2024-01-15',
      task: 'Design user interface mockups',
      project: 'E-commerce Platform',
      duration: '3h 30m',
      billable: true
    },
    {
      id: '2',
      date: '2024-01-15',
      task: 'Code review and testing',
      project: 'Customer Management System',
      duration: '1h 45m',
      billable: true
    },
    {
      id: '3',
      date: '2024-01-14',
      task: 'Team planning meeting',
      project: 'Internal',
      duration: '1h 00m',
      billable: false
    },
    {
      id: '4',
      date: '2024-01-14',
      task: 'Database optimization',
      project: 'Mobile App Development',
      duration: '4h 15m',
      billable: true
    }
  ];

  const weeklyStats = {
    totalHours: 42.5,
    billableHours: 38.25,
    projects: 3,
    efficiency: 90
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Time Tracking</h2>
          <p className="text-gray-600">Track work hours and manage project time allocation</p>
        </div>
        <Button className="flex items-center gap-2">
          <Timer className="h-4 w-4" />
          Manual Entry
        </Button>
      </div>

      {/* Active Timer */}
      {activeSession.isRunning && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Play className="h-5 w-5" />
              Active Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900">{activeSession.taskName}</h4>
                <p className="text-sm text-blue-700">{activeSession.projectName}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-blue-600">
                  <span>Started: {activeSession.startTime}</span>
                  <span className="font-mono text-lg">{activeSession.duration}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm">
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalHours}h</div>
            <div className="text-sm text-gray-600">Total Hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{weeklyStats.billableHours}h</div>
            <div className="text-sm text-gray-600">Billable Hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{weeklyStats.projects}</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{weeklyStats.efficiency}%</div>
            <div className="text-sm text-gray-600">Efficiency</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Time Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{entry.task}</h4>
                    <p className="text-sm text-gray-600">{entry.project}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg">{entry.duration}</div>
                    <Badge variant={entry.billable ? 'default' : 'outline'} className="text-xs">
                      {entry.billable ? 'Billable' : 'Non-billable'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Start Timer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Design user interface mockups
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Code review and testing
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Database optimization
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Sprint planning meeting
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Time Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Today:</span>
                  <span className="font-mono">6h 30m</span>
                </div>
                <div className="flex justify-between">
                  <span>This Week:</span>
                  <span className="font-mono">42h 30m</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month:</span>
                  <span className="font-mono">165h 15m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Weekly Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const hours = [8.5, 7.0, 9.2, 8.0, 7.5, 2.3, 0][index];
              return (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-600 mb-2">{day}</div>
                  <div 
                    className="bg-blue-200 rounded-t"
                    style={{ height: `${(hours / 10) * 100}px`, minHeight: '4px' }}
                  ></div>
                  <div className="text-xs mt-1 font-mono">{hours}h</div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Weekly total: 42.5 hours • Daily average: 6.1 hours
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTracking;
