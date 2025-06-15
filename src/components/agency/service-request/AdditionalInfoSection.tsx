
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdditionalInfoSectionProps {
  formData: {
    inspiration: string;
    daily_tasks: string;
    reports_needed: string;
  };
  onChange: (field: string, value: string) => void;
}

const AdditionalInfoSection = ({ formData, onChange }: AdditionalInfoSectionProps) => {
  return (
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
            onChange={(e) => onChange('inspiration', e.target.value)}
            placeholder="Any software or websites that inspired your idea?"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="daily_tasks">Daily Tasks</Label>
            <Textarea
              id="daily_tasks"
              value={formData.daily_tasks}
              onChange={(e) => onChange('daily_tasks', e.target.value)}
              placeholder="What tasks will users perform daily?"
            />
          </div>
          <div>
            <Label htmlFor="reports_needed">Reports Needed</Label>
            <Textarea
              id="reports_needed"
              value={formData.reports_needed}
              onChange={(e) => onChange('reports_needed', e.target.value)}
              placeholder="What reports will you need?"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoSection;
