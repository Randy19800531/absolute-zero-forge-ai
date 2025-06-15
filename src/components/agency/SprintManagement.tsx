
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, Target, Users, Clock, BarChart3 } from 'lucide-react';
import CreateSprintDialog from '@/components/agency/CreateSprintDialog';

const SprintManagement = () => {
  const [activeTab, setActiveTab] = useState('current');

  const currentSprint = {
    id: '1',
    name: 'Sprint 2024-01',
    goal: 'Implement user authentication and dashboard improvements',
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    status: 'active',
    progress: 65,
    tasks: {
      todo: 8,
      inProgress: 5,
      done: 12
    },
    capacity: 80,
    actualHours: 52
  };

  const upcomingSprints = [
    {
      id: '2',
      name: 'Sprint 2024-02',
      goal: 'Payment integration and user profiles',
      startDate: '2024-01-30',
      endDate: '2024-02-13',
      status: 'planning'
    },
    {
      id: '3',
      name: 'Sprint 2024-03',
      goal: 'Mobile responsiveness and performance optimization',
      startDate: '2024-02-14',
      endDate: '2024-02-28',
      status: 'planning'
    }
  ];

  const completedSprints = [
    {
      id: '0',
      name: 'Sprint 2023-12',
      goal: 'Project setup and initial wireframes',
      startDate: '2023-12-01',
      endDate: '2023-12-15',
      status: 'completed',
      progress: 100,
      tasks: { todo: 0, inProgress: 0, done: 15 }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sprint Management</h2>
          <p className="text-gray-600">Plan, track, and manage development sprints</p>
        </div>
        <CreateSprintDialog />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="current">Current Sprint</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Current Sprint Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {currentSprint.name}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{currentSprint.goal}</p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sprint Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sprint Progress</span>
                  <span>{currentSprint.progress}%</span>
                </div>
                <Progress value={currentSprint.progress} />
              </div>

              {/* Sprint Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentSprint.tasks.todo}</div>
                    <div className="text-sm text-gray-600">To Do</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{currentSprint.tasks.inProgress}</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{currentSprint.tasks.done}</div>
                    <div className="text-sm text-gray-600">Done</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{currentSprint.actualHours}h</div>
                    <div className="text-sm text-gray-600">of {currentSprint.capacity}h</div>
                  </CardContent>
                </Card>
              </div>

              {/* Sprint Timeline */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">
                    {new Date(currentSprint.startDate).toLocaleDateString()} - {new Date(currentSprint.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {Math.ceil((new Date(currentSprint.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Sprint Report
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Time Tracking
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSprints.map((sprint) => (
            <Card key={sprint.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{sprint.name}</CardTitle>
                    <p className="text-gray-600 mt-1">{sprint.goal}</p>
                  </div>
                  <Badge variant="outline">Planning</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                  </div>
                  <Button variant="outline" size="sm">
                    Plan Sprint
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedSprints.map((sprint) => (
            <Card key={sprint.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{sprint.name}</CardTitle>
                    <p className="text-gray-600 mt-1">{sprint.goal}</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">{sprint.tasks?.done}</div>
                      <div className="text-sm text-gray-600">Tasks Completed</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{sprint.progress}%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">14</div>
                      <div className="text-sm text-gray-600">Days Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                    </div>
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
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

export default SprintManagement;
