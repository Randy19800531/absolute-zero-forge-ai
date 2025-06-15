
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectDetailsSectionProps {
  formData: {
    project_name: string;
    description: string;
    main_features: string;
    problem_statement: string;
    target_users: string;
  };
  onChange: (field: string, value: string) => void;
}

const ProjectDetailsSection = ({ formData, onChange }: ProjectDetailsSectionProps) => {
  return (
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
            onChange={(e) => onChange('project_name', e.target.value)}
            placeholder="Customer Management System"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Describe what you want your software to do..."
            required
          />
        </div>
        <div>
          <Label htmlFor="main_features">Main Features *</Label>
          <Textarea
            id="main_features"
            value={formData.main_features}
            onChange={(e) => onChange('main_features', e.target.value)}
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
              onChange={(e) => onChange('problem_statement', e.target.value)}
              placeholder="What problem will this solve?"
            />
          </div>
          <div>
            <Label htmlFor="target_users">Target Users</Label>
            <Textarea
              id="target_users"
              value={formData.target_users}
              onChange={(e) => onChange('target_users', e.target.value)}
              placeholder="Who will use this software?"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsSection;
