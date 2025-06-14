
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';

const RecentActivity = () => {
  const activityGroups = {
    'VBA Generator': [
      {
        id: 1,
        title: 'VBA Script Generated',
        description: 'Excel automation for data processing',
        time: '2 minutes ago',
        status: 'completed',
        icon: CheckCircle,
      },
      {
        id: 5,
        title: 'Template Export',
        description: 'Exported custom VBA template',
        time: '3 hours ago',
        status: 'completed',
        icon: CheckCircle,
      },
    ],
    'Workflows': [
      {
        id: 2,
        title: 'Workflow Execution',
        description: 'Customer data sync workflow',
        time: '15 minutes ago',
        status: 'running',
        icon: Play,
      },
      {
        id: 6,
        title: 'Workflow Created',
        description: 'New email automation workflow',
        time: '4 hours ago',
        status: 'completed',
        icon: CheckCircle,
      },
    ],
    'AI Engine': [
      {
        id: 3,
        title: 'AI Agent Training',
        description: 'Sales assistant personality update',
        time: '1 hour ago',
        status: 'completed',
        icon: CheckCircle,
      },
      {
        id: 7,
        title: 'Memory Update',
        description: 'Conversation context refreshed',
        time: '5 hours ago',
        status: 'completed',
        icon: CheckCircle,
      },
    ],
    'Agency Tools': [
      {
        id: 4,
        title: 'Template Upload',
        description: 'New project requirements template',
        time: '2 hours ago',
        status: 'error',
        icon: AlertCircle,
      },
      {
        id: 8,
        title: 'Project Created',
        description: 'Client onboarding project setup',
        time: '6 hours ago',
        status: 'completed',
        icon: CheckCircle,
      },
    ],
  };

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
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(activityGroups).map(([feature, activities]) => (
            <div key={feature} className="space-y-3">
              <h3 className="font-semibold text-sm text-gray-700 border-b border-gray-200 pb-2">
                {feature}
              </h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                    <div className="p-1">
                      <activity.icon className={`h-4 w-4 ${
                        activity.status === 'completed' ? 'text-green-500' :
                        activity.status === 'running' ? 'text-blue-500' :
                        activity.status === 'error' ? 'text-red-500' : 'text-gray-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{activity.title}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{activity.description}</div>
                      <div className="flex flex-col gap-1 mt-2">
                        <Badge variant="secondary" className={`${getStatusColor(activity.status)} text-xs w-fit`}>
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
