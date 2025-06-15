
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Upload, Plus } from 'lucide-react';

const ServiceRequestForm = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    company: '',
    project_name: '',
    description: '',
    main_features: '',
    problem_statement: '',
    target_users: '',
    daily_tasks: '',
    reports_needed: '',
    devices: [] as string[],
    current_software: '',
    integrations: '',
    urgency: '',
    start_date: '',
    deadline: '',
    budget_range: '',
    inspiration: ''
  });

  const deviceOptions = [
    'Computer/Laptop',
    'Tablet (iPad, etc.)',
    'Smartphone',
    'Anywhere with internet'
  ];

  const handleDeviceChange = (device: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      devices: checked 
        ? [...prev.devices, device]
        : prev.devices.filter(d => d !== device)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert([{
          ...formData,
          devices: JSON.stringify(formData.devices)
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Service Request Submitted",
        description: `Request ${data.request_number} has been created successfully!`,
      });

      setOpen(false);
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        company: '',
        project_name: '',
        description: '',
        main_features: '',
        problem_statement: '',
        target_users: '',
        daily_tasks: '',
        reports_needed: '',
        devices: [],
        current_software: '',
        integrations: '',
        urgency: '',
        start_date: '',
        deadline: '',
        budget_range: '',
        inspiration: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Service Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Software Development Request
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">👋 Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="ABC Bakery"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_email">Email Address *</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client_phone">Phone Number</Label>
                  <Input
                    id="client_phone"
                    type="tel"
                    value={formData.client_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project_name">Project Name *</Label>
                <Input
                  id="project_name"
                  value={formData.project_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_name: e.target.value }))}
                  placeholder="Customer Management System"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you want your software to do..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="main_features">Main Features *</Label>
                <Textarea
                  id="main_features"
                  value={formData.main_features}
                  onChange={(e) => setFormData(prev => ({ ...prev, main_features: e.target.value }))}
                  placeholder="List the most important features you need..."
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="problem_statement">Problem Statement</Label>
                  <Textarea
                    id="problem_statement"
                    value={formData.problem_statement}
                    onChange={(e) => setFormData(prev => ({ ...prev, problem_statement: e.target.value }))}
                    placeholder="What problem will this solve?"
                  />
                </div>
                <div>
                  <Label htmlFor="target_users">Target Users</Label>
                  <Textarea
                    id="target_users"
                    value={formData.target_users}
                    onChange={(e) => setFormData(prev => ({ ...prev, target_users: e.target.value }))}
                    placeholder="Who will use this software?"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📱 Technical Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Devices/Platforms *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {deviceOptions.map((device) => (
                    <div key={device} className="flex items-center space-x-2">
                      <Checkbox
                        id={device}
                        checked={formData.devices.includes(device)}
                        onCheckedChange={(checked) => handleDeviceChange(device, checked as boolean)}
                      />
                      <Label htmlFor={device} className="text-sm">{device}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current_software">Current Software</Label>
                  <Textarea
                    id="current_software"
                    value={formData.current_software}
                    onChange={(e) => setFormData(prev => ({ ...prev, current_software: e.target.value }))}
                    placeholder="What do you use now?"
                  />
                </div>
                <div>
                  <Label htmlFor="integrations">Required Integrations</Label>
                  <Textarea
                    id="integrations"
                    value={formData.integrations}
                    onChange={(e) => setFormData(prev => ({ ...prev, integrations: e.target.value }))}
                    placeholder="Payment systems, email, etc."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline & Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⏰ Timeline & Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Project Urgency *</Label>
                <RadioGroup
                  value={formData.urgency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asap" id="asap" />
                    <Label htmlFor="asap">🚨 ASAP - Very urgent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="soon" id="soon" />
                    <Label htmlFor="soon">⏰ Soon - Within 1-2 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="flexible" />
                    <Label htmlFor="flexible">📅 Flexible - When ready</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="start_date">Preferred Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="budget_range">Budget Range</Label>
                  <Select value={formData.budget_range} onValueChange={(value) => setFormData(prev => ({ ...prev, budget_range: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                      <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                      <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                      <SelectItem value="over-50k">Over $50,000</SelectItem>
                      <SelectItem value="not-sure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📎 Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="inspiration">Inspiration & References</Label>
                <Textarea
                  id="inspiration"
                  value={formData.inspiration}
                  onChange={(e) => setFormData(prev => ({ ...prev, inspiration: e.target.value }))}
                  placeholder="Any software or websites that inspired your idea?"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestForm;
