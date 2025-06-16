
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Globe } from 'lucide-react';

const KnowledgeSourceInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Source Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <h4 className="font-semibold">GitHub Repository</h4>
            </div>
            <p className="text-sm text-gray-600">
              Link to GitHub repositories for code knowledge and documentation access.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <h4 className="font-semibold">Web Knowledge</h4>
            </div>
            <p className="text-sm text-gray-600">
              Add web URLs for accessing online knowledge bases and documentation.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <h4 className="font-semibold">GPT Knowledge URL</h4>
            </div>
            <p className="text-sm text-gray-600">
              Special URLs for GPT to access specific knowledge sources and resolve issues.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeSourceInfo;
