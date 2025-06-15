
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Users, Plus, Mail, Clock, DollarSign, Target } from 'lucide-react';

const TeamManagement = () => {
  const teamMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@company.com',
      role: 'Full Stack Developer',
      hourlyRate: 85,
      capacityHours: 40,
      currentSprintHours: 32,
      tasksAssigned: 3,
      tasksCompleted: 8,
      avatar: 'JD'
    },
    {
      id: '2',
      name: 'Sarah Miller',
      email: 'sarah@company.com',
      role: 'UI/UX Designer',
      hourlyRate: 75,
      capacityHours: 40,
      currentSprintHours: 28,
      tasksAssigned: 2,
      tasksCompleted: 12,
      avatar: 'SM'
    },
    {
      id: '3',
      name: 'Alex Johnson',
      email: 'alex@company.com',
      role: 'Frontend Developer',
      hourlyRate: 80,
      capacityHours: 40,
      currentSprintHours: 35,
      tasksAssigned: 4,
      tasksCompleted: 6,
      avatar: 'AL'
    },
    {
      id: '4',
      name: 'Maria Garcia',
      email: 'maria@company.com',
      role: 'QA Tester',
      hourlyRate: 60,
      capacityHours: 40,
      currentSprintHours: 25,
      tasksAssigned: 2,
      tasksCompleted: 15,
      avatar: 'MG'
    }
  ];

  const teamStats = {
    totalMembers: teamMembers.length,
    totalCapacity: teamMembers.reduce((sum, member) => sum + member.capacityHours, 0),
    currentUtilization: teamMembers.reduce((sum, member) => sum + member.currentSprintHours, 0),
    averageRate: Math.round(teamMembers.reduce((sum, member) => sum + member.hourlyRate, 0) / teamMembers.length),
    activeTasks: teamMembers.reduce((sum, member) => sum + member.tasksAssigned, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-gray-600">Manage team members, roles, and capacity planning</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{teamStats.totalMembers}</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{teamStats.currentUtilization}h</div>
            <div className="text-sm text-gray-600">Current Sprint</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{teamStats.totalCapacity}h</div>
            <div className="text-sm text-gray-600">Total Capacity</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">${teamStats.averageRate}</div>
            <div className="text-sm text-gray-600">Avg Hourly Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{teamStats.activeTasks}</div>
            <div className="text-sm text-gray-600">Active Tasks</div>
          </CardContent>
        </Card>
      </div>

      {/* Capacity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Sprint Capacity Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Team Utilization</span>
              <span>{Math.round((teamStats.currentUtilization / teamStats.totalCapacity) * 100)}%</span>
            </div>
            <Progress value={Math.round((teamStats.currentUtilization / teamStats.totalCapacity) * 100)} />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {teamStats.currentUtilization}h of {teamStats.totalCapacity}h capacity allocated
          </p>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-lg">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <Badge variant="outline">{member.role.split(' ')[0]}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                {member.email}
              </div>

              {/* Sprint Workload */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sprint Workload</span>
                  <span>{member.currentSprintHours}h / {member.capacityHours}h</span>
                </div>
                <Progress value={(member.currentSprintHours / member.capacityHours) * 100} />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{member.tasksAssigned}</div>
                  <div className="text-xs text-gray-600">Active Tasks</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{member.tasksCompleted}</div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">${member.hourlyRate}</div>
                  <div className="text-xs text-gray-600">Hourly Rate</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Clock className="h-4 w-4 mr-1" />
                  View Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Target className="h-4 w-4 mr-1" />
                  Assign Task
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
