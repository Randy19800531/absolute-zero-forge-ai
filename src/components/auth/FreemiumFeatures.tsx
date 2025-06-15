
import React from 'react';
import { Star } from 'lucide-react';

const FreemiumFeatures = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Star className="h-5 w-5 text-yellow-400" />
        <span className="font-semibold">Start Free - No Credit Card Required</span>
      </div>
      <ul className="text-sm text-purple-200 space-y-2 ml-8">
        <li>• Create up to 5 AI workflows</li>
        <li>• 50 VBA script generations/month</li>
        <li>• Basic LLM integrations (GPT-4o)</li>
        <li>• 5GB storage included</li>
        <li>• 14-day premium trial</li>
      </ul>
    </div>
  );
};

export default FreemiumFeatures;
