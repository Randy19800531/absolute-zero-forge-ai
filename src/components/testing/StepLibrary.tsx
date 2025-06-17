
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MousePointer, Type, CheckCircle, Clock, Navigation, Hand, Eye } from 'lucide-react';
import { useStepLibrary } from '@/hooks/useStepLibrary';

interface StepLibraryProps {
  onAddStep: (step: any) => void;
}

const StepLibrary: React.FC<StepLibraryProps> = ({ onAddStep }) => {
  const { steps, loading } = useStepLibrary();

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'click': return <MousePointer className="h-4 w-4" />;
      case 'type': return <Type className="h-4 w-4" />;
      case 'assert': return <CheckCircle className="h-4 w-4" />;
      case 'wait': return <Clock className="h-4 w-4" />;
      case 'navigate': return <Navigation className="h-4 w-4" />;
      case 'select': return <Hand className="h-4 w-4" />;
      case 'hover': return <Eye className="h-4 w-4" />;
      default: return <MousePointer className="h-4 w-4" />;
    }
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'click': return 'bg-blue-100 text-blue-800';
      case 'type': return 'bg-green-100 text-green-800';
      case 'assert': return 'bg-purple-100 text-purple-800';
      case 'wait': return 'bg-yellow-100 text-yellow-800';
      case 'navigate': return 'bg-orange-100 text-orange-800';
      case 'select': return 'bg-pink-100 text-pink-800';
      case 'hover': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading step library...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step) => (
          <Card key={step.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStepIcon(step.type)}
                  <CardTitle className="text-sm">{step.name}</CardTitle>
                </div>
                <Badge className={getStepTypeColor(step.type)}>
                  {step.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {step.description && (
                  <p className="text-sm text-gray-600">{step.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {step.is_custom ? 'Custom' : 'Built-in'}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => onAddStep(step)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {steps.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">No steps found in the library</p>
            <p className="text-sm text-gray-500 mt-2">
              Custom steps will appear here as they are created
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepLibrary;
