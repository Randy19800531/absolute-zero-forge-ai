
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTemplates } from '@/hooks/useTemplates';
import { useWorkflows } from '@/hooks/useWorkflows';
import { workflowOrchestrator, WorkflowRequirements } from '@/services/workflowOrchestrator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Zap, Template, Code, Rocket } from 'lucide-react';

const WorkflowBuilder = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { templates, loading: templatesLoading } = useTemplates();
  const { createWorkflow } = useWorkflows();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    appType: '',
    features: [] as string[],
    targetAudience: '',
    framework: 'React + TypeScript',
    database: false,
    authentication: false,
    apiIntegrations: [] as string[]
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const availableFeatures = [
    'User Authentication', 'Data Management', 'Real-time Updates', 'File Upload',
    'Search & Filter', 'Notifications', 'Analytics', 'API Integration',
    'Payment Processing', 'Email Integration', 'Calendar Integration', 'Reporting'
  ];

  const availableIntegrations = [
    'Stripe', 'PayPal', 'SendGrid', 'Twilio', 'Google Calendar', 
    'Slack', 'Notion', 'Airtable', 'Zapier', 'Mailchimp'
  ];

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setFormData(prev => ({
      ...prev,
      apiIntegrations: prev.apiIntegrations.includes(integration)
        ? prev.apiIntegrations.filter(i => i !== integration)
        : [...prev.apiIntegrations, integration]
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setFormData(prev => ({
        ...prev,
        name: template.name,
        description: template.description,
        appType: template.category,
        features: template.template_data.features
      }));
    }
  };

  const createWorkflowFromTemplate = async () => {
    if (!user || !selectedTemplate) return;

    try {
      setIsCreating(true);
      
      const template = templates.find(t => t.id === selectedTemplate);
      if (!template) throw new Error('Template not found');

      const requirements: WorkflowRequirements = {
        appType: template.category,
        features: template.template_data.features,
        description: template.description,
        targetAudience: 'Small to Medium Business',
        technicalSpecs: {
          framework: 'React + TypeScript',
          database: true,
          authentication: true,
          apiIntegrations: template.template_data.integrations
        }
      };

      const workflow = await workflowOrchestrator.createWorkflow(
        template.name,
        template.description,
        requirements,
        user.id
      );

      // Start workflow execution
      workflowOrchestrator.executeWorkflow(workflow.id);

      toast({
        title: "Workflow Created",
        description: `${template.name} workflow started successfully!`
      });

      setSelectedTemplate(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workflow from template",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const createCustomWorkflow = async () => {
    if (!user || !formData.name) return;

    try {
      setIsCreating(true);

      const requirements: WorkflowRequirements = {
        appType: formData.appType,
        features: formData.features,
        description: formData.description,
        targetAudience: formData.targetAudience,
        technicalSpecs: {
          framework: formData.framework,
          database: formData.database,
          authentication: formData.authentication,
          apiIntegrations: formData.apiIntegrations
        }
      };

      const workflow = await workflowOrchestrator.createWorkflow(
        formData.name,
        formData.description,
        requirements,
        user.id
      );

      // Start workflow execution
      workflowOrchestrator.executeWorkflow(workflow.id);

      toast({
        title: "Workflow Created",
        description: `${formData.name} workflow started successfully!`
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        appType: '',
        features: [],
        targetAudience: '',
        framework: 'React + TypeScript',
        database: false,
        authentication: false,
        apiIntegrations: []
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create custom workflow",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Multi-Agent Workflow Builder</h1>
        <p className="text-gray-600">Create applications using AI specialist agents</p>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Template className="h-4 w-4" />
            Use Template
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Custom Build
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
            </CardHeader>
            <CardContent>
              {templatesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card 
                      key={template.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedTemplate === template.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.description}</p>
                          <Badge variant="outline">{template.category}</Badge>
                          <div className="text-xs text-gray-500">
                            Used {template.usage_count} times
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {selectedTemplate && (
                <div className="mt-6 pt-6 border-t">
                  <Button 
                    onClick={createWorkflowFromTemplate}
                    disabled={isCreating}
                    className="w-full"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    {isCreating ? 'Creating Workflow...' : 'Create from Template'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Application Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Application Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Awesome App"
                  />
                </div>
                <div>
                  <Label htmlFor="appType">Application Type</Label>
                  <Select value={formData.appType} onValueChange={(value) => setFormData(prev => ({ ...prev, appType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CRM">CRM System</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Productivity">Productivity Tool</SelectItem>
                      <SelectItem value="Business">Business Management</SelectItem>
                      <SelectItem value="Marketing">Marketing Tool</SelectItem>
                      <SelectItem value="HR">HR System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what your application should do..."
                />
              </div>

              <div>
                <Label>Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {availableFeatures.map((feature) => (
                    <Button
                      key={feature}
                      variant={formData.features.includes(feature) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFeatureToggle(feature)}
                      className="justify-start"
                    >
                      {feature}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>API Integrations</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {availableIntegrations.map((integration) => (
                    <Button
                      key={integration}
                      variant={formData.apiIntegrations.includes(integration) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleIntegrationToggle(integration)}
                      className="justify-start"
                    >
                      {integration}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={createCustomWorkflow}
                disabled={isCreating || !formData.name}
                className="w-full"
              >
                <Zap className="h-4 w-4 mr-2" />
                {isCreating ? 'Creating Workflow...' : 'Create Custom Workflow'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowBuilder;
