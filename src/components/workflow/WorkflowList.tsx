
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWorkflows } from '@/hooks/useWorkflows';
import { useToast } from '@/hooks/use-toast';
import { Workflow, Play, Pause, Trash2, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

const WorkflowList = () => {
  const { workflows, loading, deleteWorkflow } = useWorkflows();
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Pause className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteWorkflow(id);
      toast({
        title: "Workflow Deleted",
        description: `${name} has been deleted successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete workflow",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="text-center py-12">
        <Workflow className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows yet</h3>
        <p className="text-gray-500 mb-6">Create your first multi-agent workflow to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map((workflow) => (
        <Card key={workflow.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Workflow className="h-5 w-5 text-blue-500" />
                {workflow.name}
              </span>
              <div className="flex items-center gap-2">
                {getStatusIcon(workflow.status)}
                <Badge className={getStatusColor(workflow.status)}>
                  {workflow.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {workflow.description}
            </p>
            
            <div className="space-y-2 text-xs text-gray-500 mb-4">
              <div className="flex justify-between">
                <span>Created:</span>
                <span>{new Date(workflow.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated:</span>
                <span>{new Date(workflow.updated_at).toLocaleDateString()}</span>
              </div>
              {workflow.requirements?.appType && (
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>{workflow.requirements.appType}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              {workflow.status === 'draft' && (
                <Button variant="outline" size="sm">
                  <Play className="h-3 w-3 mr-1" />
                  Start
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600"
                onClick={() => handleDelete(workflow.id, workflow.name)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkflowList;
