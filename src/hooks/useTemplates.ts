
import { useState, useEffect } from 'react';
import { templateLibrary, AppTemplate } from '@/services/templateLibrary';

export const useTemplates = (category?: string) => {
  const [templates, setTemplates] = useState<AppTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, [category]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const data = await templateLibrary.getTemplates(category);
      setTemplates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (template: Omit<AppTemplate, 'id' | 'usage_count'>, userId: string) => {
    try {
      const newTemplate = await templateLibrary.createTemplate(template, userId);
      setTemplates(prev => [newTemplate, ...prev]);
      return newTemplate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create template');
      throw err;
    }
  };

  const useTemplate = async (templateId: string) => {
    try {
      await templateLibrary.useTemplate(templateId);
      // Update local state to reflect usage count increment
      setTemplates(prev => prev.map(t => 
        t.id === templateId 
          ? { ...t, usage_count: t.usage_count + 1 }
          : t
      ));
    } catch (err) {
      console.error('Failed to update template usage:', err);
    }
  };

  return {
    templates,
    loading,
    error,
    createTemplate,
    useTemplate,
    refetch: fetchTemplates
  };
};
