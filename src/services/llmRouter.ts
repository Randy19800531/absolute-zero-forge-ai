
interface LLMProvider {
  id: string;
  name: string;
  priority: 'primary' | 'secondary';
}

interface TaskLLMMapping {
  taskType: string;
  primary: LLMProvider;
  secondary: LLMProvider;
  reasoning: string;
}

export class LLMRouter {
  private taskMappings: TaskLLMMapping[] = [
    {
      taskType: 'ai-agents',
      primary: { id: 'gpt4o', name: 'GPT-4o', priority: 'primary' },
      secondary: { id: 'o3', name: 'o3 / o1 (OpenAI)', priority: 'secondary' },
      reasoning: 'GPT-4o delivers state-of-the-art multimodal reasoning and agentic planning; o-series is nearly as strong in deep tool-use chains and keeps response quality high if 4o quota is hit.'
    },
    {
      taskType: 'low-no-code-builder',
      primary: { id: 'gemini', name: 'Gemini', priority: 'primary' },
      secondary: { id: 'gpt4o', name: 'GPT-4o', priority: 'secondary' },
      reasoning: 'Gemini is purpose-built for Cloud Workstations & Workspace add-ons, generating UI scaffolds and low-code flows quickly; GPT-4o backs it up when you need broader language coverage or VBA-style syntax help.'
    },
    {
      taskType: 'workflow-builder',
      primary: { id: 'o3', name: 'o3 / o1 (OpenAI)', priority: 'primary' },
      secondary: { id: 'gemini', name: 'Gemini', priority: 'secondary' },
      reasoning: 'The o-series outperforms peers on long-horizon reasoning and conditional branching—ideal for orchestrating multi-step workflows. Gemini offers tight integration with Google ecosystem services for visual flow mapping.'
    },
    {
      taskType: 'vba-generator',
      primary: { id: 'gpt4o', name: 'GPT-4o', priority: 'primary' },
      secondary: { id: 'claude', name: 'Claude', priority: 'secondary' },
      reasoning: "GPT-4o's code-gen scores excel at Excel (pun intended); Claude's long-context window and meticulous commenting style give you a safe backup for very large macros or step-by-step explanations."
    },
    {
      taskType: 'testing-suite',
      primary: { id: 'o3', name: 'o3 / o1 (OpenAI)', priority: 'primary' },
      secondary: { id: 'gpt4o', name: 'GPT-4o', priority: 'secondary' },
      reasoning: 'o-series (especially o3-pro) is tuned for correctness-focused output—perfect for generating unit, integration, and regression tests. GPT-4o provides rapid multimodal test-case reasoning when speed matters.'
    },
    {
      taskType: 'documentation',
      primary: { id: 'claude', name: 'Claude', priority: 'primary' },
      secondary: { id: 'perplexity', name: 'Perplexity', priority: 'secondary' },
      reasoning: "Claude's 200K context means it can ingest entire specs or SOPs and output clean, structured docs; Perplexity augments docs with live cited references when external standards or latest regulations are needed."
    },
    {
      taskType: 'code-analysis',
      primary: { id: 'o3', name: 'o3 / o1 (OpenAI)', priority: 'primary' },
      secondary: { id: 'gpt4o', name: 'GPT-4o', priority: 'secondary' },
      reasoning: 'o-series leads on static-analysis benchmarks and can "think longer" about edge-cases; GPT-4o offers a quicker multimodal sanity-check (e.g., attach screenshots or logs).'
    }
  ];

  private getAvailableProviders(): string[] {
    const savedKeys = localStorage.getItem('llm-api-keys');
    if (!savedKeys) return [];
    
    const keys = JSON.parse(savedKeys);
    return Object.keys(keys).filter(key => keys[key] && keys[key].trim());
  }

  public getOptimalLLM(taskType: string): { provider: LLMProvider; isAvailable: boolean; fallbackProvider?: LLMProvider; fallbackAvailable?: boolean } {
    const mapping = this.taskMappings.find(m => m.taskType === taskType);
    if (!mapping) {
      // Default fallback
      return {
        provider: { id: 'gpt4o', name: 'GPT-4o', priority: 'primary' },
        isAvailable: false
      };
    }

    const availableProviders = this.getAvailableProviders();
    const primaryAvailable = availableProviders.includes(mapping.primary.id);
    const secondaryAvailable = availableProviders.includes(mapping.secondary.id);

    return {
      provider: mapping.primary,
      isAvailable: primaryAvailable,
      fallbackProvider: mapping.secondary,
      fallbackAvailable: secondaryAvailable
    };
  }

  public getTaskMapping(taskType: string): TaskLLMMapping | null {
    return this.taskMappings.find(m => m.taskType === taskType) || null;
  }

  public getAllTaskMappings(): TaskLLMMapping[] {
    return this.taskMappings;
  }

  public async executeWithOptimalLLM(taskType: string, prompt: string, options?: any): Promise<string> {
    const { provider, isAvailable, fallbackProvider, fallbackAvailable } = this.getOptimalLLM(taskType);
    
    let selectedProvider = provider;
    if (!isAvailable && fallbackAvailable && fallbackProvider) {
      selectedProvider = fallbackProvider;
      console.log(`Primary LLM ${provider.name} not available for ${taskType}, using fallback ${fallbackProvider.name}`);
    } else if (!isAvailable) {
      throw new Error(`No available LLM configured for task type: ${taskType}. Please configure API keys in LLM Configuration.`);
    }

    // This is a mock implementation - in reality, you'd call the actual LLM APIs
    console.log(`Executing ${taskType} task with ${selectedProvider.name}`);
    console.log(`Prompt: ${prompt}`);
    
    return `Mock response from ${selectedProvider.name} for ${taskType} task`;
  }

  public getProviderStatus(providerId: string): { connected: boolean; name: string } {
    const availableProviders = this.getAvailableProviders();
    const providerNames: Record<string, string> = {
      'gpt4o': 'GPT-4o',
      'o3': 'o3 / o1 (OpenAI)',
      'gemini': 'Gemini',
      'claude': 'Claude',
      'perplexity': 'Perplexity'
    };

    return {
      connected: availableProviders.includes(providerId),
      name: providerNames[providerId] || providerId
    };
  }
}

export const llmRouter = new LLMRouter();
