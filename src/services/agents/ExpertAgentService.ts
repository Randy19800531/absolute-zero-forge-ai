
export interface AgentKnowledge {
  platformFeatures: string[];
  technicalStack: string[];
  capabilities: string[];
  commonTasks: string[];
}

export interface InternetSearchCapability {
  enabled: boolean;
  searchTopics: string[];
  researchAreas: string[];
}

export class ExpertAgentService {
  private static readonly PLATFORM_KNOWLEDGE: AgentKnowledge = {
    platformFeatures: [
      'AI Engine - Agent creation and management',
      'Agency Dashboard - Project and sprint management',
      'Workflow Builder - Visual automation workflows',
      'LLM Configuration - Multiple AI provider setup',
      'VBA Generator - Excel automation scripts',
      'Testing Suite - Automated testing tools',
      'Low/No-Code Builder - Visual app development',
      'Theme Customizer - UI/UX customization',
      'Documentation - Comprehensive guides',
      'Integrations - External service connections'
    ],
    technicalStack: [
      'React with TypeScript',
      'Tailwind CSS styling',
      'Shadcn UI components',
      'Supabase backend',
      'PostgreSQL database',
      'Edge Functions',
      'Authentication system'
    ],
    capabilities: [
      'Create and manage AI agents',
      'Build visual workflows',
      'Generate VBA code',
      'Configure multiple LLM providers',
      'Manage projects and sprints',
      'Create custom themes',
      'Build applications visually',
      'Integrate external services'
    ],
    commonTasks: [
      'Setting up AI agents for specific tasks',
      'Creating automation workflows',
      'Generating Excel VBA scripts',
      'Configuring OpenAI/Anthropic connections',
      'Managing project sprints',
      'Customizing application themes',
      'Building low-code applications',
      'Setting up integrations'
    ]
  };

  static getAgentSystemPrompt(agentId: string, basePrompt: string): string {
    const knowledgeBase = this.formatKnowledgeBase();
    
    return `${basePrompt}

COMPREHENSIVE PLATFORM KNOWLEDGE:
${knowledgeBase}

EXPERT GUIDANCE PRINCIPLES:
1. Always provide specific, actionable advice based on platform features
2. Reference exact menu locations and button names when guiding users
3. Suggest automation workflows that leverage platform capabilities
4. Recommend best practices for implementation
5. Use internet research to provide current information and trends
6. Remember user preferences and build upon previous conversations

INTERNET RESEARCH CAPABILITIES:
- You can research current trends and technologies
- Find latest documentation and resources
- Discover new integration possibilities
- Research best practices and industry standards
- Gather real-time information when needed

Always indicate when you're using internet research to provide current information.`;
  }

  private static formatKnowledgeBase(): string {
    const { platformFeatures, technicalStack, capabilities, commonTasks } = this.PLATFORM_KNOWLEDGE;
    
    return `
**PLATFORM FEATURES:**
${platformFeatures.map(feature => `- ${feature}`).join('\n')}

**TECHNICAL STACK:**
${technicalStack.map(tech => `- ${tech}`).join('\n')}

**USER CAPABILITIES:**
${capabilities.map(cap => `- ${cap}`).join('\n')}

**COMMON TASKS & SOLUTIONS:**
${commonTasks.map(task => `- ${task}`).join('\n')}

**NAVIGATION STRUCTURE:**
- Dashboard: Main overview and quick actions
- AI Engine: Agent creation and management (tabs: Predefined, My Agents, Create Custom, Memory)
- Agency: Project management, sprints, team collaboration
- Workflows: Visual workflow builder and management
- LLM Config: Configure AI providers and knowledge sources
- VBA Generator: Excel automation script creation
- Testing: Automated testing and quality assurance
- Low/No-Code: Visual application development
- Themes: UI customization and branding
- Documentation: User guides and API documentation
- Integrations: External service connections
    `;
  }

  static getInternetSearchCapabilities(agentType: string): InternetSearchCapability {
    const commonTopics = [
      'automation trends',
      'AI integration best practices',
      'workflow optimization',
      'business process automation',
      'latest API documentation'
    ];

    const agentSpecificTopics: Record<string, string[]> = {
      'young-man': [
        'latest tech trends',
        'modern development tools',
        'API integrations',
        'automation frameworks',
        'developer resources'
      ],
      'wise-man': [
        'enterprise automation strategies',
        'industry best practices',
        'business process optimization',
        'strategic planning resources',
        'enterprise architecture patterns'
      ],
      'young-woman': [
        'UX design trends',
        'workflow design patterns',
        'creative automation ideas',
        'user experience research',
        'design inspiration'
      ],
      'wise-woman': [
        'educational resources',
        'training materials',
        'user support strategies',
        'documentation best practices',
        'learning methodologies'
      ],
      'don-project-manager': [
        'AGILE methodology updates',
        'project management tools',
        'financial tracking systems',
        'team performance metrics',
        'risk management strategies',
        'budget optimization techniques',
        'sprint planning best practices',
        'project accounting standards'
      ]
    };

    return {
      enabled: true,
      searchTopics: [...commonTopics, ...(agentSpecificTopics[agentType] || [])],
      researchAreas: [
        'Current technology trends',
        'Platform documentation updates',
        'Integration possibilities',
        'Best practice guidelines',
        'Industry standards'
      ]
    };
  }

  static enhanceAgentConfiguration(agentConfig: any, agentId: string): any {
    const internetCapabilities = this.getInternetSearchCapabilities(agentId);
    
    return {
      ...agentConfig,
      platformExpert: true,
      internetAccess: true,
      knowledgeBase: this.PLATFORM_KNOWLEDGE,
      searchCapabilities: internetCapabilities,
      expertLevel: 'advanced',
      specializedTraining: true,
      memoryEnabled: true,
      contextAware: true
    };
  }
}
