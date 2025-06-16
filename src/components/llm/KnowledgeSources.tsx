
import React from 'react';
import KnowledgeSourceForm from './knowledge/KnowledgeSourceForm';
import KnowledgeSourceList from './knowledge/KnowledgeSourceList';
import KnowledgeSourceInfo from './knowledge/KnowledgeSourceInfo';
import { useKnowledgeSources } from './knowledge/useKnowledgeSources';

const KnowledgeSources = () => {
  const {
    sources,
    newSource,
    setNewSource,
    saveSource,
    removeSource
  } = useKnowledgeSources();

  return (
    <div className="space-y-6">
      <KnowledgeSourceForm
        newSource={newSource}
        onSourceChange={setNewSource}
        onSaveSource={saveSource}
      />
      
      <KnowledgeSourceList
        sources={sources}
        onRemoveSource={removeSource}
      />
      
      <KnowledgeSourceInfo />
    </div>
  );
};

export default KnowledgeSources;
