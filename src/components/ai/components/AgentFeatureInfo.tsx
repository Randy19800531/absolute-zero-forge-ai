
import React from 'react';
import { Database, Globe } from 'lucide-react';

const AgentFeatureInfo = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Database className="h-5 w-5 text-blue-600" />
            <strong className="text-blue-800">Platform Expertise</strong>
          </div>
          <p className="text-sm text-blue-700">
            All agents are trained experts on this automation platform and can guide you through any feature.
          </p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="h-5 w-5 text-green-600" />
            <strong className="text-green-800">Internet Research</strong>
          </div>
          <p className="text-sm text-green-700">
            Each agent can access the internet to research current information and provide up-to-date solutions.
          </p>
        </div>
      </div>

      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💭 <strong>Advanced Memory:</strong> All agents remember your conversations, learn your preferences, and provide increasingly personalized expert assistance.
        </p>
      </div>
    </>
  );
};

export default AgentFeatureInfo;
