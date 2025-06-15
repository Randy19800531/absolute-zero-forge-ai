
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, Edit, CheckCircle, Clock, AlertCircle, FileX } from 'lucide-react';

interface ServiceRequest {
  id: string;
  request_number: string;
  client_name: string;
  client_email: string;
  company: string;
  project_name: string;
  description: string;
  status: string;
  urgency: string;
  budget_range: string;
  created_at: string;
}

const ServiceRequestList = () => {
  const { toast } = useToast();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  const fetchServiceRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServiceRequests(data || []);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setServiceRequests(prev => 
        prev.map(sr => sr.id === id ? { ...sr, status: newStatus } : sr)
      );

      toast({
        title: "Status Updated",
        description: `Service request status updated to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      submitted: { variant: 'outline' as const, icon: Clock, color: 'text-blue-600' },
      reviewing: { variant: 'secondary' as const, icon: Eye, color: 'text-yellow-600' },
      approved: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      in_progress: { variant: 'default' as const, icon: AlertCircle, color: 'text-purple-600' },
      completed: { variant: 'secondary' as const, icon: CheckCircle, color: 'text-green-600' },
      rejected: { variant: 'destructive' as const, icon: FileX, color: 'text-red-600' }
    };

    const config = variants[status as keyof typeof variants] || variants.submitted;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants = {
      asap: { variant: 'destructive' as const, label: '🚨 ASAP' },
      soon: { variant: 'default' as const, label: '⏰ Soon' },
      flexible: { variant: 'outline' as const, label: '📅 Flexible' }
    };

    const config = variants[urgency as keyof typeof variants] || variants.flexible;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredRequests = serviceRequests.filter(sr => {
    const matchesSearch = 
      sr.request_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sr.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sr.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sr.project_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sr.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by request number, client, company, or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="reviewing">Reviewing</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Service Requests List */}
      {filteredRequests.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileX className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No service requests found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((sr) => (
            <Card key={sr.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {sr.request_number}
                      {getStatusBadge(sr.status)}
                      {sr.urgency && getUrgencyBadge(sr.urgency)}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {sr.client_name} • {sr.company}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Select
                      value={sr.status}
                      onValueChange={(value) => updateStatus(sr.id, value)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">{sr.project_name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{sr.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Submitted: {new Date(sr.created_at).toLocaleDateString()}</span>
                    <span>Budget: {sr.budget_range || 'Not specified'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceRequestList;
