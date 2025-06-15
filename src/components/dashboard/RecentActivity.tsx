
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'running' | 'error' | 'pending';
  icon: any;
  category: string;
}

const RecentActivity = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Load activities from localStorage
    const storedActivities = JSON.parse(localStorage.getItem('recent_activities') || '[]');
    setActivities(storedActivities);
  }, []);

  const clearAllActivity = () => {
    localStorage.removeItem('recent_activities');
    setActivities([]);
    toast({
      title: "Activity Cleared",
      description: "All recent activity has been cleared.",
    });
  };

  const deleteActivity = (activityId: string) => {
    const updatedActivities = activities.filter(a => a.id !== activityId);
    setActivities(updatedActivities);
    localStorage.setItem('recent_activities', JSON.stringify(updatedActivities));
    toast({
      title: "Activity Deleted",
      description: "The activity has been removed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'running': return Play;
      case 'error': return AlertCircle;
      default: return CheckCircle;
    }
  };

  // Group activities by category
  const groupedActivities = activities.reduce((groups: { [key: string]: Activity[] }, activity) => {
    if (!groups[activity.category]) {
      groups[activity.category] = [];
    }
    groups[activity.category].push(activity);
    return groups;
  }, {});

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          {activities.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllActivity}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
            <p className="text-gray-500">Activity from your workflows, agents, and tools will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {Object.entries(groupedActivities).map(([category, categoryActivities]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-semibold text-sm text-gray-700 border-b border-gray-200 pb-2">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryActivities.map((activity) => {
                    const StatusIcon = getStatusIcon(activity.status);
                    return (
                      <div key={activity.id} className="flex items-start gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                        <div className="flex-shrink-0 mt-0.5">
                          <StatusIcon className={`h-4 w-4 ${
                            activity.status === 'completed' ? 'text-green-500' :
                            activity.status === 'running' ? 'text-blue-500' :
                            activity.status === 'error' ? 'text-red-500' : 'text-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{activity.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">{activity.description}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className={`${getStatusColor(activity.status)} text-xs px-2 py-0.5`}>
                              {activity.status}
                            </Badge>
                            <span className="text-xs text-gray-400">{activity.time}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteActivity(activity.id)}
                          className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
