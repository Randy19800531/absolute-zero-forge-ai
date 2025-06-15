
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Plus } from 'lucide-react';
import { useServiceRequestForm } from '@/hooks/useServiceRequestForm';
import ClientInfoSection from './service-request/ClientInfoSection';
import ProjectDetailsSection from './service-request/ProjectDetailsSection';
import TechnicalRequirementsSection from './service-request/TechnicalRequirementsSection';
import TimelineBudgetSection from './service-request/TimelineBudgetSection';
import AdditionalInfoSection from './service-request/AdditionalInfoSection';

const ServiceRequestForm = () => {
  const [open, setOpen] = useState(false);
  const {
    formData,
    loading,
    handleFieldChange,
    handleDeviceChange,
    submitForm
  } = useServiceRequestForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Service Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Software Development Request
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ClientInfoSection 
            formData={formData} 
            onChange={handleFieldChange} 
          />

          <ProjectDetailsSection 
            formData={formData} 
            onChange={handleFieldChange} 
          />

          <TechnicalRequirementsSection 
            formData={formData} 
            onChange={handleFieldChange}
            onDeviceChange={handleDeviceChange}
          />

          <TimelineBudgetSection 
            formData={formData} 
            onChange={handleFieldChange} 
          />

          <AdditionalInfoSection 
            formData={formData} 
            onChange={handleFieldChange} 
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestForm;
