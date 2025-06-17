
import React, { useState } from 'react';
import { TestCase } from '@/types/testing';
import AITestParametersForm from './AITestParametersForm';
import GeneratedTestsList from './GeneratedTestsList';
import { aiTestGenerationService } from '@/services/aiTestGenerationService';
import type { GeneratedTestCase } from '@/services/aiTestGenerationService';

interface AITestGeneratorProps {
  onTestGenerated: (testCase: Partial<TestCase>) => Promise<void>;
}

const AITestGenerator = ({ onTestGenerated }: AITestGeneratorProps) => {
  const [description, setDescription] = useState('');
  const [appType, setAppType] = useState('');
  const [testType, setTestType] = useState('');
  const [complexity, setComplexity] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const [generatedTests, setGeneratedTests] = useState<GeneratedTestCase[]>([]);

  const handleGenerateTests = async () => {
    if (!description.trim()) return;

    setGenerating(true);
    try {
      const aiGeneratedTests = await aiTestGenerationService.generateTestsWithAI({
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

  const convertGeneratedTestToTestCase = (generatedTest: GeneratedTestCase): Partial<TestCase> => {
    return {
      name: generatedTest.name,
      description: generatedTest.description,
      category: generatedTest.category as any,
      steps: generatedTest.steps.map(step => ({
        id: step.id,
        type: 'click' as const,
        name: step.action,
        parameters: {
          selector: step.target,
          value: step.value,
          expected: step.expected
        },
        description: step.description
      })),
      assertions: generatedTest.assertions,
      conditions: generatedTest.conditions,
      status: 'draft' as const
    };
  };

  const handleAcceptTest = async (test: GeneratedTestCase) => {
    const convertedTest = convertGeneratedTestToTestCase(test);
    await onTestGenerated(convertedTest);
    setGeneratedTests(prev => prev.filter(t => t !== test));
  };

  const handleRejectTest = (test: GeneratedTestCase) => {
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
    aiTestGenerationService.exportTestsToJSON(generatedTests, {
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
