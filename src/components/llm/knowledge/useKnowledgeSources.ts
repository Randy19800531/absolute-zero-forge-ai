
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { KnowledgeSource, NewKnowledgeSource } from './types';

export const useKnowledgeSources = () => {
  const { toast } = useToast();
  const [sources, setSources] = useState<KnowledgeSource[]>([]);
  const [newSource, setNewSource] = useState<NewKnowledgeSource>({
    type: 'github',
    name: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    // Load saved knowledge sources from localStorage
    const savedSources = localStorage.getItem('knowledge-sources');
    if (savedSources) {
      setSources(JSON.parse(savedSources));
    }
  }, []);

  const saveSource = () => {
    const source: KnowledgeSource = {
      id: Date.now().toString(),
      ...newSource
    };

    const updatedSources = [...sources, source];
    setSources(updatedSources);
    localStorage.setItem('knowledge-sources', JSON.stringify(updatedSources));

    setNewSource({
      type: 'github',
      name: '',
      url: '',
      description: ''
    });

    toast({
      title: "Knowledge Source Added",
      description: `${source.name} has been added successfully.`,
    });
  };

  const removeSource = (id: string) => {
    const updatedSources = sources.filter(source => source.id !== id);
    setSources(updatedSources);
    localStorage.setItem('knowledge-sources', JSON.stringify(updatedSources));

    toast({
      title: "Knowledge Source Removed",
      description: "The knowledge source has been removed.",
    });
  };

  return {
    sources,
    newSource,
    setNewSource,
    saveSource,
    removeSource
  };
};
