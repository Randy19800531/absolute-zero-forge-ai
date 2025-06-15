
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MousePointer, Type, CheckCircle, Clock, Navigation, ChevronDown, Hand } from 'lucide-react';
import { useStepLibrary } from '@/hooks/useStepLibrary';

interface StepLibraryProps {
  onAddStep: (step: any) => void;
}

const iconMap = {
  MousePointer,
  Type,
  CheckCircle,
  Clock,
  Navigation,
  ChevronDown,
  Hand
};

const StepLibrary = ({ onAddStep }: StepLibraryProps) => {
  const { steps, loading } = useStepLibrary();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Step Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {steps.map((step) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Plus;
            
            return (
              <Button
                key={step.id}
                variant="outline"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => onAddStep(step)}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="font-medium">{step.name}</div>
                    {step.description && (
                      <div className="text-xs text-gray-500 mt-1">{step.description}</div>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StepLibrary;
