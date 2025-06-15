
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  budget: number;
  estimated_hours: number;
  actual_hours: number;
  start_date: string;
  end_date: string;
  team_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Project interface
      const transformedData = (data || []).map(project => ({
        ...project,
        status: project.status as Project['status']
      }));
      
      setProjects(transformedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Partial<Project>) => {
    try {
      // Ensure required fields are present
      const insertData = {
        name: projectData.name || '',
        team_id: projectData.team_id || '',
        description: projectData.description,
        status: projectData.status,
        budget: projectData.budget,
        estimated_hours: projectData.estimated_hours,
        actual_hours: projectData.actual_hours,
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        created_by: user?.id || ''
      };

      const { data, error } = await supabase
        .from('projects')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      const transformedData = {
        ...data,
        status: data.status as Project['status']
      };

      setProjects(prev => [transformedData, ...prev]);
      return transformedData;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedData = {
        ...data,
        status: data.status as Project['status']
      };

      setProjects(prev => prev.map(p => p.id === id ? transformedData : p));
      return transformedData;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  return {
    projects,
    loading,
    createProject,
    updateProject,
    refetch: fetchProjects
  };
};
