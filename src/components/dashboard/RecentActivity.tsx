
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      title: 'VBA Script Generated',
      description: 'Excel automation for data processing',
      time: '2 minutes ago',
      status: 'completed',
      icon: CheckCircle,
    },
    {
      id: 2,
      title: 'Workflow Execution',
      description: 'Customer data sync workflow',
      time: '15 minutes ago',
      status: 'running',
      icon: Play,
    },
    {
      id: 3,
      title: 'AI Agent Training',
      description: 'Sales assistant personality update',
      time: '1 hour ago',
      status: 'completed',
      icon: CheckCircle,
    },
    {
      id: 4,
      title: 'Template Upload',
      description: 'New project requirements template',
      time: '2 hours ago',
      status: 'error',
      icon: AlertCircle,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-1">
              <activity.icon className={`h-4 w-4 ${
                activity.status === 'completed' ? 'text-green-500' :
                activity.status === 'running' ? 'text-blue-500' :
                activity.status === 'error' ? 'text-red-500' : 'text-gray-500'
              }`} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{activity.title}</div>
              <div className="text-xs text-gray-500 mt-1">{activity.description}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
