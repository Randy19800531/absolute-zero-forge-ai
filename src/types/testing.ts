
export interface TestStep {
  id: string;
  type: 'click' | 'type' | 'assert' | 'wait' | 'navigate' | 'select' | 'hover';
  name: string;
  parameters: {
    url?: string;
    selector?: string;
    value?: string;
    expected?: string;
    duration?: number;
    metric?: string;
    threshold?: number;
    [key: string]: any;
  };
  description?: string;
}

export interface TestCase {
  id: string;
  name: string;
  description?: string;
  category: string;
  steps: TestStep[];
  conditions: Record<string, any>;
  data_sources: Record<string, any>;
  assertions: any[];
  status: 'draft' | 'active' | 'archived';
  version: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  created_by?: string;
}

export interface TestRun {
  id: string;
  test_case_id: string;
  environment: 'dev' | 'uat' | 'prod';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'cancelled';
  started_at?: string;
  completed_at?: string;
  expected_output?: string;
  actual_output?: string;
  evidence_links: string[];
  error_message?: string;
  retry_count: number;
  triggered_by: string;
  user_id: string;
  created_at: string;
}

export interface TestSchedule {
  id: string;
  test_case_id: string;
  name: string;
  cron_expression?: string;
  environment: 'dev' | 'uat' | 'prod';
  is_active: boolean;
  notification_settings: Record<string, any>;
  retry_policy: Record<string, any>;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface StepLibraryItem {
  id: string;
  name: string;
  type: 'click' | 'type' | 'assert' | 'wait' | 'navigate' | 'select' | 'hover';
  description?: string;
  parameters: Record<string, any>;
  icon?: string;
  is_custom: boolean;
  user_id?: string;
  created_at: string;
}

export interface TestSignOff {
  id: string;
  test_run_id: string;
  reviewer_id: string;
  role: string;
  signed_off: boolean;
  comments?: string;
  signed_at?: string;
  created_at: string;
}
