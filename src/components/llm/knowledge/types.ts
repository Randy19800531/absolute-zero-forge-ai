
export interface KnowledgeSource {
  id: string;
  type: 'github' | 'web' | 'gpt-url';
  name: string;
  url: string;
  description?: string;
}

export interface NewKnowledgeSource {
  type: 'github' | 'web' | 'gpt-url';
  name: string;
  url: string;
  description: string;
}
