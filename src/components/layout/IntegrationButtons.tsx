
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const IntegrationButtons = () => {
  const { toast } = useToast();

  const handleGitHubConnect = () => {
    toast({
      title: "GitHub Integration",
      description: "Click the GitHub button in the top right of the interface to connect your repository.",
    });
  };

  const handleSupabaseConnect = () => {
    toast({
      title: "Supabase Integration", 
      description: "Click the green Supabase button in the top right of the interface to connect your backend.",
    });
  };

  return (
    <div className="flex gap-3">
      <Button 
        onClick={handleGitHubConnect}
        variant="outline"
        className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800"
      >
        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <span className="text-gray-900 text-xs font-bold">G</span>
        </div>
        Connect GitHub
      </Button>
      
      <Button 
        onClick={handleSupabaseConnect}
        variant="outline"
        className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
      >
        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <span className="text-green-600 text-xs font-bold">S</span>
        </div>
        Connect Supabase
      </Button>
    </div>
  );
};

export default IntegrationButtons;
