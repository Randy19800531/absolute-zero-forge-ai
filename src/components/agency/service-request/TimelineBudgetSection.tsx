
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimelineBudgetSectionProps {
  formData: {
    urgency: string;
    start_date: string;
    deadline: string;
    budget_range: string;
  };
  onChange: (field: string, value: string) => void;
}

const TimelineBudgetSection = ({ formData, onChange }: TimelineBudgetSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">⏰ Timeline & Budget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Project Urgency *</Label>
          <RadioGroup
            value={formData.urgency}
            onValueChange={(value) => onChange('urgency', value)}
            className="flex flex-wrap gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="asap" id="asap" />
              <Label htmlFor="asap">🚨 ASAP - Very urgent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="soon" id="soon" />
              <Label htmlFor="soon">⏰ Soon - Within 1-2 months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flexible" id="flexible" />
              <Label htmlFor="flexible">📅 Flexible - When ready</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="start_date">Preferred Start Date</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => onChange('start_date', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => onChange('deadline', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="budget_range">Budget Range</Label>
            <Select value={formData.budget_range} onValueChange={(value) => onChange('budget_range', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-5k">Under $5,000</SelectItem>
                <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                <SelectItem value="over-50k">Over $50,000</SelectItem>
                <SelectItem value="not-sure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineBudgetSection;
