
import React, { useState } from 'react';
import { TestCase } from '@/types/testing';
import AITestParametersForm from './AITestParametersForm';
import GeneratedTestsList from './GeneratedTestsList';
import { generateTestsWithAI, exportTestsToJSON } from '@/services/aiTestGenerationService';

interface AITestGeneratorProps {
  onTestGenerated: (testCase: Partial<TestCase>) => Promise<void>;
}

const AITestGenerator = ({ onTestGenerated }: AITestGeneratorProps) => {
  const [description, setDescription] = useState('');
  const [appType, setAppType] = useState('');
  const [testType, setTestType] = useState('');
  const [complexity, setComplexity] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const [generatedTests, setGeneratedTests] = useState<Array<Partial<TestCase>>>([]);

  const handleGenerateTests = async () => {
    if (!description.trim()) return;

    setGenerating(true);
    try {
      const aiGeneratedTests = await generateTestsWithAI({
        description,
        appType,
        testType,
        complexity
      });
      
      setGeneratedTests(aiGeneratedTests);
    } catch (error) {
      console.error('Error generating tests:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleAcceptTest = async (test: Partial<TestCase>) => {
    await onTestGenerated(test);
    setGeneratedTests(prev => prev.filter(t => t !== test));
  };

  const handleRejectTest = (test: Partial<TestCase>) => {
    setGeneratedTests(prev => prev.filter(t => t !== test));
  };

  const handlePurgeOldTests = () => {
    setGeneratedTests([]);
    setDescription('');
    setAppType('');
    setTestType('');
    setComplexity('medium');
  };

  const handleExportTests = () => {
    exportTestsToJSON(generatedTests, {
      description,
      appType,
      testType,
      complexity
    });
  };

  return (
    <div className="space-y-6">
      <AITestParametersForm
        description={description}
        setDescription={setDescription}
        appType={appType}
        setAppType={setAppType}
        testType={testType}
        setTestType={setTestType}
        complexity={complexity}
        setComplexity={setComplexity}
        generating={generating}
        onGenerateTests={handleGenerateTests}
        onExportTests={handleExportTests}
        onPurgeOldTests={handlePurgeOldTests}
        hasGeneratedTests={generatedTests.length > 0}
      />

      <GeneratedTestsList
        generatedTests={generatedTests}
        onAcceptTest={handleAcceptTest}
        onRejectTest={handleRejectTest}
      />
    </div>
  );
};

export default AITestGenerator;
