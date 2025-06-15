
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FolderOpen, 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Target,
  AlertCircle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

const ProjectDashboard = () => {
  const { projects, loading } = useProjects();

  const stats = [
    {
      title: "Active Projects",
      value: projects?.filter(p => p.status === 'active').length || 0,
      icon: FolderOpen,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Team Members",
      value: "12",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Hours This Sprint",
      value: "156",
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      title: "Revenue YTD",
      value: "$45,230",
      icon: DollarSign,
      color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ];

  const recentProjects = projects?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                    <Badge variant={
                      project.status === 'active' ? 'default' :
                      project.status === 'completed' ? 'secondary' :
                      'outline'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round((project.actual_hours / project.estimated_hours) * 100) || 0}%</span>
                    </div>
                    <Progress value={Math.round((project.actual_hours / project.estimated_hours) * 100) || 0} />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {project.actual_hours || 0}h / {project.estimated_hours || 0}h
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {project.budget ? `$${project.budget.toLocaleString()}` : 'No budget'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active projects</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sprint Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Current Sprint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Sprint 2024-01</h4>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Focus on user authentication and dashboard improvements
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sprint Progress</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">8</p>
                    <p className="text-xs text-gray-600">To Do</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">5</p>
                    <p className="text-xs text-gray-600">In Progress</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">12</p>
                    <p className="text-xs text-gray-600">Done</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <FolderOpen className="h-6 w-6" />
              New Project
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Target className="h-6 w-6" />
              Create Sprint
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              Add Team Member
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Clock className="h-6 w-6" />
              Log Time
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDashboard;
