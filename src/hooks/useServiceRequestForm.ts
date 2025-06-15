
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceRequestFormData {
  client_name: string;
  client_email: string;
  client_phone: string;
  company: string;
  project_name: string;
  description: string;
  main_features: string;
  problem_statement: string;
  target_users: string;
  daily_tasks: string;
  reports_needed: string;
  devices: string[];
  current_software: string;
  integrations: string;
  urgency: string;
  start_date: string;
  deadline: string;
  budget_range: string;
  inspiration: string;
}

export const useServiceRequestForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ServiceRequestFormData>({
    client_name: '',
    client_email: '',
    client_phone: '',
    company: '',
    project_name: '',
    description: '',
    main_features: '',
    problem_statement: '',
    target_users: '',
    daily_tasks: '',
    reports_needed: '',
    devices: [],
    current_software: '',
    integrations: '',
    urgency: '',
    start_date: '',
    deadline: '',
    budget_range: '',
    inspiration: ''
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeviceChange = (device: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      devices: checked 
        ? [...prev.devices, device]
        : prev.devices.filter(d => d !== device)
    }));
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      client_email: '',
      client_phone: '',
      company: '',
      project_name: '',
      description: '',
      main_features: '',
      problem_statement: '',
      target_users: '',
      daily_tasks: '',
      reports_needed: '',
      devices: [],
      current_software: '',
      integrations: '',
      urgency: '',
      start_date: '',
      deadline: '',
      budget_range: '',
      inspiration: ''
    });
  };

  const submitForm = async (): Promise<boolean> => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          client_name: formData.client_name,
          client_email: formData.client_email,
          client_phone: formData.client_phone,
          company: formData.company,
          project_name: formData.project_name,
          description: formData.description,
          main_features: formData.main_features,
          problem_statement: formData.problem_statement,
          target_users: formData.target_users,
          daily_tasks: formData.daily_tasks,
          reports_needed: formData.reports_needed,
          devices: JSON.stringify(formData.devices),
          current_software: formData.current_software,
          integrations: formData.integrations,
          urgency: formData.urgency,
          start_date: formData.start_date || null,
          deadline: formData.deadline || null,
          budget_range: formData.budget_range,
          inspiration: formData.inspiration
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Service Request Submitted",
        description: `Request ${data.request_number} has been created successfully!`,
      });

      resetForm();
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleFieldChange,
    handleDeviceChange,
    submitForm,
    resetForm
  };
};
