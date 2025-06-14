
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileSpreadsheet, Download, Eye } from 'lucide-react';

interface VBATemplateLibraryProps {
  onTemplateSelect: (template: any) => void;
}

const VBATemplateLibrary = ({ onTemplateSelect }: VBATemplateLibraryProps) => {
  const templates = [
    {
      id: 1,
      name: 'Data Cleaner',
      description: 'Remove duplicates and clean text data',
      category: 'Data Processing',
      complexity: 'Beginner',
      downloads: 1234,
    },
    {
      id: 2,
      name: 'Report Generator',
      description: 'Generate formatted reports from raw data',
      category: 'Reporting',
      complexity: 'Intermediate',
      downloads: 856,
    },
    {
      id: 3,
      name: 'Email Automation',
      description: 'Send emails with Excel data attachments',
      category: 'Automation',
      complexity: 'Advanced',
      downloads: 543,
    },
    {
      id: 4,
      name: 'Chart Creator',
      description: 'Automatically create charts from data ranges',
      category: 'Visualization',
      complexity: 'Intermediate',
      downloads: 721,
    },
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-blue-500" />
              {template.name}
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">{template.category}</Badge>
              <Badge className={getComplexityColor(template.complexity)}>
                {template.complexity}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{template.downloads} downloads</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onTemplateSelect(template)}
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => onTemplateSelect(template)}
              >
                <Download className="h-3 w-3 mr-1" />
                Use Template
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VBATemplateLibrary;
