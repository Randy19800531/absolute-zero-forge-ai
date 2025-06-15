
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface TechnicalRequirementsSectionProps {
  formData: {
    devices: string[];
    current_software: string;
    integrations: string;
  };
  onChange: (field: string, value: string) => void;
  onDeviceChange: (device: string, checked: boolean) => void;
}

const TechnicalRequirementsSection = ({ formData, onChange, onDeviceChange }: TechnicalRequirementsSectionProps) => {
  const deviceOptions = [
    'Computer/Laptop',
    'Tablet (iPad, etc.)',
    'Smartphone',
    'Anywhere with internet'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">📱 Technical Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Devices/Platforms *</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {deviceOptions.map((device) => (
              <div key={device} className="flex items-center space-x-2">
                <Checkbox
                  id={device}
                  checked={formData.devices.includes(device)}
                  onCheckedChange={(checked) => onDeviceChange(device, checked as boolean)}
                />
                <Label htmlFor={device} className="text-sm">{device}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="current_software">Current Software</Label>
            <Textarea
              id="current_software"
              value={formData.current_software}
              onChange={(e) => onChange('current_software', e.target.value)}
              placeholder="What do you use now?"
            />
          </div>
          <div>
            <Label htmlFor="integrations">Required Integrations</Label>
            <Textarea
              id="integrations"
              value={formData.integrations}
              onChange={(e) => onChange('integrations', e.target.value)}
              placeholder="Payment systems, email, etc."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalRequirementsSection;
