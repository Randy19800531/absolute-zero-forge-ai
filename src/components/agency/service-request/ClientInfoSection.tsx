
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClientInfoSectionProps {
  formData: {
    client_name: string;
    company: string;
    client_email: string;
    client_phone: string;
  };
  onChange: (field: string, value: string) => void;
}

const ClientInfoSection = ({ formData, onChange }: ClientInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">👋 Client Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client_name">Client Name *</Label>
            <Input
              id="client_name"
              value={formData.client_name}
              onChange={(e) => onChange('client_name', e.target.value)}
              placeholder="John Smith"
              required
            />
          </div>
          <div>
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => onChange('company', e.target.value)}
              placeholder="ABC Bakery"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client_email">Email Address *</Label>
            <Input
              id="client_email"
              type="email"
              value={formData.client_email}
              onChange={(e) => onChange('client_email', e.target.value)}
              placeholder="john@company.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="client_phone">Phone Number</Label>
            <Input
              id="client_phone"
              type="tel"
              value={formData.client_phone}
              onChange={(e) => onChange('client_phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInfoSection;
