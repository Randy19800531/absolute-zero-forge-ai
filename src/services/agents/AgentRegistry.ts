
export interface AgentCapability {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export interface SpecialistAgent {
  id: string;
  name: string;
  specialization: 'design' | 'development' | 'testing' | 'deployment';
  description: string;
  capabilities: AgentCapability[];
  prompts: {
    system: string;
    task: string;
  };
}

export const SPECIALIST_AGENTS: SpecialistAgent[] = [
  {
    id: 'design-agent',
    name: 'UI/UX Design Specialist',
    specialization: 'design',
    description: 'Creates user-centered designs and component specifications',
    capabilities: [
      {
        name: 'Component Design',
        description: 'Design reusable UI components following best practices',
        parameters: { complexity: 'medium', accessibility: true }
      },
      {
        name: 'Layout Planning',
        description: 'Create responsive layouts and information architecture',
        parameters: { responsive: true, mobile_first: true }
      },
      {
        name: 'Design System',
        description: 'Establish consistent design tokens and guidelines',
        parameters: { tokens: ['colors', 'typography', 'spacing', 'shadows'] }
      }
    ],
    prompts: {
      system: 'You are a senior UI/UX designer specializing in modern web applications. You create user-centered designs that are both beautiful and functional.',
      task: 'Based on the requirements, create a comprehensive design specification including component library, layout structure, and visual design system.'
    }
  },
  {
    id: 'development-agent',
    name: 'Full-Stack Development Specialist',
    specialization: 'development',
    description: 'Generates clean, scalable code following best practices',
    capabilities: [
      {
        name: 'React Development',
        description: 'Create modern React components with TypeScript',
        parameters: { typescript: true, hooks: true, patterns: ['compound', 'render_props'] }
      },
      {
        name: 'API Integration',
        description: 'Implement RESTful APIs and data fetching',
        parameters: { async: true, error_handling: true, caching: true }
      },
      {
        name: 'State Management',
        description: 'Implement efficient state management solutions',
        parameters: { patterns: ['context', 'reducer', 'custom_hooks'] }
      }
    ],
    prompts: {
      system: 'You are an expert full-stack developer specializing in React, TypeScript, and modern web development. You write clean, maintainable, and performant code.',
      task: 'Generate the complete application code structure based on the design specifications and requirements. Focus on modularity, reusability, and best practices.'
    }
  },
  {
    id: 'testing-agent',
    name: 'Quality Assurance Specialist',
    specialization: 'testing',
    description: 'Creates comprehensive test suites and quality assurance plans',
    capabilities: [
      {
        name: 'Unit Testing',
        description: 'Create unit tests for components and utilities',
        parameters: { framework: 'jest', coverage: 80, mocking: true }
      },
      {
        name: 'Integration Testing',
        description: 'Test component interactions and API integrations',
        parameters: { api_testing: true, component_testing: true }
      },
      {
        name: 'E2E Testing',
        description: 'Create end-to-end user flow tests',
        parameters: { framework: 'playwright', scenarios: ['happy_path', 'error_cases'] }
      }
    ],
    prompts: {
      system: 'You are a senior QA engineer specializing in automated testing and quality assurance. You create comprehensive test strategies that ensure application reliability.',
      task: 'Create a complete testing strategy including unit tests, integration tests, and e2e scenarios based on the application code and requirements.'
    }
  },
  {
    id: 'deployment-agent',
    name: 'DevOps Deployment Specialist',
    specialization: 'deployment',
    description: 'Configures deployment pipelines and infrastructure',
    capabilities: [
      {
        name: 'Platform Deployment',
        description: 'Deploy to modern hosting platforms',
        parameters: { platforms: ['vercel', 'netlify', 'aws'], ssl: true, cdn: true }
      },
      {
        name: 'CI/CD Pipeline',
        description: 'Set up continuous integration and deployment',
        parameters: { automated_testing: true, build_optimization: true }
      },
      {
        name: 'Performance Optimization',
        description: 'Optimize application performance and loading',
        parameters: { bundling: true, compression: true, caching: true }
      }
    ],
    prompts: {
      system: 'You are a DevOps specialist focused on modern web application deployment and performance optimization. You ensure applications are fast, secure, and scalable.',
      task: 'Create deployment configuration and optimization strategies for the application. Include platform-specific settings and performance optimizations.'
    }
  }
];

export function getAgentBySpecialization(specialization: 'design' | 'development' | 'testing' | 'deployment'): SpecialistAgent | undefined {
  return SPECIALIST_AGENTS.find(agent => agent.specialization === specialization);
}

export function getAllAgents(): SpecialistAgent[] {
  return SPECIALIST_AGENTS;
}
