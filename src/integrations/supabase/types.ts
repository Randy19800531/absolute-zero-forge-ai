export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_agents: {
        Row: {
          configuration: Json | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          specialization:
            | Database["public"]["Enums"]["agent_specialization"]
            | null
          status: string | null
          tasks_completed: number | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          configuration?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          specialization?:
            | Database["public"]["Enums"]["agent_specialization"]
            | null
          status?: string | null
          tasks_completed?: number | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          configuration?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          specialization?:
            | Database["public"]["Enums"]["agent_specialization"]
            | null
          status?: string | null
          tasks_completed?: number | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      app_templates: {
        Row: {
          category: string
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          preview_image_url: string | null
          template_data: Json
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          preview_image_url?: string | null
          template_data: Json
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          preview_image_url?: string | null
          template_data?: Json
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          agent_id: string | null
          created_at: string | null
          id: string
          messages: Json | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          messages?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          messages?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          actual_hours: number | null
          budget: number | null
          created_at: string
          created_by: string
          description: string | null
          end_date: string | null
          estimated_hours: number | null
          id: string
          name: string
          start_date: string | null
          status: string | null
          team_id: string
          updated_at: string
        }
        Insert: {
          actual_hours?: number | null
          budget?: number | null
          created_at?: string
          created_by: string
          description?: string | null
          end_date?: string | null
          estimated_hours?: number | null
          id?: string
          name: string
          start_date?: string | null
          status?: string | null
          team_id: string
          updated_at?: string
        }
        Update: {
          actual_hours?: number | null
          budget?: number | null
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          estimated_hours?: number | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          assigned_to: string | null
          budget_range: string | null
          client_email: string
          client_name: string
          client_phone: string | null
          company: string
          created_at: string
          current_software: string | null
          daily_tasks: string | null
          deadline: string | null
          description: string
          devices: Json | null
          estimated_cost: number | null
          estimated_hours: number | null
          files: Json | null
          id: string
          inspiration: string | null
          integrations: string | null
          main_features: string
          problem_statement: string | null
          project_id: string | null
          project_name: string
          reports_needed: string | null
          request_number: string
          start_date: string | null
          status: string | null
          target_users: string | null
          updated_at: string
          urgency: string | null
        }
        Insert: {
          assigned_to?: string | null
          budget_range?: string | null
          client_email: string
          client_name: string
          client_phone?: string | null
          company: string
          created_at?: string
          current_software?: string | null
          daily_tasks?: string | null
          deadline?: string | null
          description: string
          devices?: Json | null
          estimated_cost?: number | null
          estimated_hours?: number | null
          files?: Json | null
          id?: string
          inspiration?: string | null
          integrations?: string | null
          main_features: string
          problem_statement?: string | null
          project_id?: string | null
          project_name: string
          reports_needed?: string | null
          request_number: string
          start_date?: string | null
          status?: string | null
          target_users?: string | null
          updated_at?: string
          urgency?: string | null
        }
        Update: {
          assigned_to?: string | null
          budget_range?: string | null
          client_email?: string
          client_name?: string
          client_phone?: string | null
          company?: string
          created_at?: string
          current_software?: string | null
          daily_tasks?: string | null
          deadline?: string | null
          description?: string
          devices?: Json | null
          estimated_cost?: number | null
          estimated_hours?: number | null
          files?: Json | null
          id?: string
          inspiration?: string | null
          integrations?: string | null
          main_features?: string
          problem_statement?: string | null
          project_id?: string | null
          project_name?: string
          reports_needed?: string | null
          request_number?: string
          start_date?: string | null
          status?: string | null
          target_users?: string | null
          updated_at?: string
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      sprints: {
        Row: {
          actual_hours: number | null
          capacity_hours: number | null
          created_at: string
          end_date: string
          goal: string | null
          id: string
          name: string
          project_id: string
          start_date: string
          status: string | null
          updated_at: string
        }
        Insert: {
          actual_hours?: number | null
          capacity_hours?: number | null
          created_at?: string
          end_date: string
          goal?: string | null
          id?: string
          name: string
          project_id: string
          start_date: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          actual_hours?: number | null
          capacity_hours?: number | null
          created_at?: string
          end_date?: string
          goal?: string | null
          id?: string
          name?: string
          project_id?: string
          start_date?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sprints_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      step_library: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_custom: boolean | null
          name: string
          parameters: Json | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_custom?: boolean | null
          name: string
          parameters?: Json | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_custom?: boolean | null
          name?: string
          parameters?: Json | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          actual_hours: number | null
          assignee_id: string | null
          created_at: string
          created_by: string
          description: string | null
          estimated_hours: number | null
          id: string
          priority: string | null
          project_id: string
          sprint_id: string | null
          status: string | null
          story_points: number | null
          title: string
          updated_at: string
        }
        Insert: {
          actual_hours?: number | null
          assignee_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          project_id: string
          sprint_id?: string | null
          status?: string | null
          story_points?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          actual_hours?: number | null
          assignee_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          project_id?: string
          sprint_id?: string | null
          status?: string | null
          story_points?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          capacity_hours_per_sprint: number | null
          hourly_rate: number | null
          id: string
          joined_at: string
          role: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          capacity_hours_per_sprint?: number | null
          hourly_rate?: number | null
          id?: string
          joined_at?: string
          role?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          capacity_hours_per_sprint?: number | null
          hourly_rate?: number | null
          id?: string
          joined_at?: string
          role?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_memberships: {
        Row: {
          id: string
          invited_by: string | null
          joined_at: string | null
          role: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          role?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          role?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      test_case_versions: {
        Row: {
          assertions: Json | null
          author_id: string
          changes: Json | null
          commit_message: string | null
          conditions: Json | null
          created_at: string
          data_sources: Json | null
          id: string
          steps: Json | null
          test_case_id: string
          version_number: number
        }
        Insert: {
          assertions?: Json | null
          author_id: string
          changes?: Json | null
          commit_message?: string | null
          conditions?: Json | null
          created_at?: string
          data_sources?: Json | null
          id?: string
          steps?: Json | null
          test_case_id: string
          version_number: number
        }
        Update: {
          assertions?: Json | null
          author_id?: string
          changes?: Json | null
          commit_message?: string | null
          conditions?: Json | null
          created_at?: string
          data_sources?: Json | null
          id?: string
          steps?: Json | null
          test_case_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "test_case_versions_test_case_id_fkey"
            columns: ["test_case_id"]
            isOneToOne: false
            referencedRelation: "test_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      test_cases: {
        Row: {
          assertions: Json | null
          category: string
          conditions: Json | null
          created_at: string
          created_by: string | null
          data_sources: Json | null
          description: string | null
          id: string
          name: string
          status: string | null
          steps: Json | null
          updated_at: string
          user_id: string
          version: number | null
        }
        Insert: {
          assertions?: Json | null
          category?: string
          conditions?: Json | null
          created_at?: string
          created_by?: string | null
          data_sources?: Json | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          steps?: Json | null
          updated_at?: string
          user_id: string
          version?: number | null
        }
        Update: {
          assertions?: Json | null
          category?: string
          conditions?: Json | null
          created_at?: string
          created_by?: string | null
          data_sources?: Json | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          steps?: Json | null
          updated_at?: string
          user_id?: string
          version?: number | null
        }
        Relationships: []
      }
      test_runs: {
        Row: {
          actual_output: string | null
          completed_at: string | null
          created_at: string
          environment: string
          error_message: string | null
          evidence_links: Json | null
          expected_output: string | null
          id: string
          retry_count: number | null
          started_at: string | null
          status: string | null
          test_case_id: string
          triggered_by: string | null
          user_id: string
        }
        Insert: {
          actual_output?: string | null
          completed_at?: string | null
          created_at?: string
          environment?: string
          error_message?: string | null
          evidence_links?: Json | null
          expected_output?: string | null
          id?: string
          retry_count?: number | null
          started_at?: string | null
          status?: string | null
          test_case_id: string
          triggered_by?: string | null
          user_id: string
        }
        Update: {
          actual_output?: string | null
          completed_at?: string | null
          created_at?: string
          environment?: string
          error_message?: string | null
          evidence_links?: Json | null
          expected_output?: string | null
          id?: string
          retry_count?: number | null
          started_at?: string | null
          status?: string | null
          test_case_id?: string
          triggered_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_runs_test_case_id_fkey"
            columns: ["test_case_id"]
            isOneToOne: false
            referencedRelation: "test_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      test_schedules: {
        Row: {
          created_at: string
          cron_expression: string | null
          environment: string
          id: string
          is_active: boolean | null
          name: string
          notification_settings: Json | null
          retry_policy: Json | null
          test_case_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cron_expression?: string | null
          environment?: string
          id?: string
          is_active?: boolean | null
          name: string
          notification_settings?: Json | null
          retry_policy?: Json | null
          test_case_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          cron_expression?: string | null
          environment?: string
          id?: string
          is_active?: boolean | null
          name?: string
          notification_settings?: Json | null
          retry_policy?: Json | null
          test_case_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_schedules_test_case_id_fkey"
            columns: ["test_case_id"]
            isOneToOne: false
            referencedRelation: "test_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      test_sign_offs: {
        Row: {
          comments: string | null
          created_at: string
          id: string
          reviewer_id: string
          role: string
          signed_at: string | null
          signed_off: boolean | null
          test_run_id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          id?: string
          reviewer_id: string
          role: string
          signed_at?: string | null
          signed_off?: boolean | null
          test_run_id: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          id?: string
          reviewer_id?: string
          role?: string
          signed_at?: string | null
          signed_off?: boolean | null
          test_run_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_sign_offs_test_run_id_fkey"
            columns: ["test_run_id"]
            isOneToOne: false
            referencedRelation: "test_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      two_factor_auth: {
        Row: {
          backup_codes: string[] | null
          created_at: string | null
          id: string
          is_enabled: boolean | null
          secret: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          secret: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          secret?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      workflow_steps: {
        Row: {
          agent_specialization: Database["public"]["Enums"]["agent_specialization"]
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          execution_time_ms: number | null
          id: string
          input_data: Json | null
          output_data: Json | null
          status: string | null
          step_order: number
          workflow_id: string
        }
        Insert: {
          agent_specialization: Database["public"]["Enums"]["agent_specialization"]
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          status?: string | null
          step_order: number
          workflow_id: string
        }
        Update: {
          agent_specialization?: Database["public"]["Enums"]["agent_specialization"]
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          status?: string | null
          step_order?: number
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_steps_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string | null
          description: string | null
          generated_code: string | null
          id: string
          name: string
          requirements: Json | null
          status: string | null
          team_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          generated_code?: string | null
          id?: string
          name: string
          requirements?: Json | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          generated_code?: string | null
          id?: string
          name?: string
          requirements?: Json | null
          status?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_superuser_role: {
        Args: { _email: string }
        Returns: undefined
      }
      generate_sr_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_admin_or_superuser: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      agent_specialization: "design" | "development" | "testing" | "deployment"
      user_role: "user" | "admin" | "superuser"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_specialization: ["design", "development", "testing", "deployment"],
      user_role: ["user", "admin", "superuser"],
    },
  },
} as const
