
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useSprints } from '@/hooks/useSprints';
import { useProjects } from '@/hooks/useProjects';
import { Plus, Target } from 'lucide-react';

const CreateSprintDialog = () => {
  const { toast } = useToast();
  const { createSprint } = useSprints();
  const { projects } = useProjects();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    project_id: '',
    start_date: '',
    end_date: '',
    capacity_hours: 80,
    status: 'planning' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.project_id) {
        throw new Error('Please select a project');
      }

      await createSprint({
        name: formData.name,
        goal: formData.goal,
        project_id: formData.project_id,
        start_date: formData.start_date,
        end_date: formData.end_date,
        capacity_hours: formData.capacity_hours,
        status: formData.status
      });

      setOpen(false);
      setFormData({
        name: '',
        goal: '',
        project_id: '',
        start_date: '',
        end_date: '',
        capacity_hours: 80,
        status: 'planning'
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Sprint
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Create New Sprint
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Sprint Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Sprint 2024-01"
              required
            />
          </div>

          <div>
            <Label htmlFor="goal">Sprint Goal</Label>
            <Textarea
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
              placeholder="What do you want to achieve in this sprint?"
            />
          </div>

          <div>
            <Label htmlFor="project_id">Project *</Label>
            <Select value={formData.project_id} onValueChange={(value) => setFormData(prev => ({ ...prev, project_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date *</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="capacity_hours">Capacity (Hours)</Label>
            <Input
              id="capacity_hours"
              type="number"
              value={formData.capacity_hours}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity_hours: parseInt(e.target.value) }))}
              placeholder="80"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Sprint'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSprintDialog;
