
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'workflow',
      title: 'Customer Onboarding Workflow',
      description: 'Completed successfully for 15 new customers',
      time: '2 hours ago',
      status: 'success',
      icon: CheckCircle,
    },
    {
      id: 2,
      type: 'vba',
      title: 'Excel Report Generator',
      description: 'Generated 24 VBA scripts for financial reports',
      time: '4 hours ago',
      status: 'success',
      icon: CheckCircle,
    },
    {
      id: 3,
      type: 'ai',
      title: 'AI Agent Training',
      description: 'Updated knowledge base with new documentation',
      time: '6 hours ago',
      status: 'warning',
      icon: AlertCircle,
    },
    {
      id: 4,
      type: 'integration',
      title: 'Slack Integration',
      description: 'Successfully connected to team workspace',
      time: '1 day ago',
      status: 'success',
      icon: CheckCircle,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Recent Activity</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5" />
              Platform Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <activity.icon className={`h-5 w-5 mt-0.5 ${getStatusColor(activity.status)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 truncate">{activity.title}</h4>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">AI Engine</span>
                </div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Workflows</span>
                </div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">VBA Generator</span>
                </div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Integrations</span>
                </div>
                <span className="text-sm text-yellow-600">Maintenance</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecentActivity;
