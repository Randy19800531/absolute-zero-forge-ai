
import { supabase } from '@/integrations/supabase/client';

export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  template_data: {
    components: string[];
    features: string[];
    layout: string;
    integrations: string[];
    complexity: 'simple' | 'medium' | 'complex';
  };
  preview_image_url?: string;
  is_public: boolean;
  created_by: string;
  usage_count: number;
}

// Built-in template library for SME use cases
export const BUILT_IN_TEMPLATES: Omit<AppTemplate, 'id' | 'created_by' | 'usage_count'>[] = [
  {
    name: 'Customer CRM Dashboard',
    description: 'Complete customer relationship management dashboard with contacts, deals, and activity tracking',
    category: 'CRM',
    template_data: {
      components: ['ContactList', 'DealPipeline', 'ActivityFeed', 'CustomerDetails', 'ReportsChart'],
      features: ['contact_management', 'deal_tracking', 'activity_logging', 'search_filter', 'export_data'],
      layout: 'sidebar-main',
      integrations: ['email', 'calendar', 'stripe'],
      complexity: 'medium'
    },
    is_public: true
  },
  {
    name: 'E-commerce Store',
    description: 'Modern e-commerce platform with product catalog, shopping cart, and payment processing',
    category: 'E-commerce',
    template_data: {
      components: ['ProductGrid', 'ShoppingCart', 'CheckoutForm', 'OrderHistory', 'PaymentProcessor'],
      features: ['product_catalog', 'shopping_cart', 'payment_processing', 'order_management', 'inventory'],
      layout: 'header-main-footer',
      integrations: ['stripe', 'paypal', 'shipping_apis'],
      complexity: 'complex'
    },
    is_public: true
  },
  {
    name: 'Project Management Tool',
    description: 'Team collaboration tool with task management, file sharing, and progress tracking',
    category: 'Productivity',
    template_data: {
      components: ['TaskBoard', 'ProjectTimeline', 'TeamMembers', 'FileUpload', 'ProgressChart'],
      features: ['task_management', 'team_collaboration', 'file_sharing', 'time_tracking', 'notifications'],
      layout: 'sidebar-main',
      integrations: ['slack', 'google_drive', 'calendar'],
      complexity: 'medium'
    },
    is_public: true
  },
  {
    name: 'Inventory Management System',
    description: 'Track inventory levels, manage suppliers, and generate reports for small businesses',
    category: 'Business',
    template_data: {
      components: ['InventoryTable', 'SupplierList', 'StockAlerts', 'ReorderForm', 'ReportsGenerator'],
      features: ['inventory_tracking', 'supplier_management', 'low_stock_alerts', 'reorder_automation', 'reporting'],
      layout: 'header-sidebar-main',
      integrations: ['barcode_scanner', 'email_notifications'],
      complexity: 'medium'
    },
    is_public: true
  },
  {
    name: 'Employee Portal',
    description: 'Internal employee portal with time tracking, leave requests, and company announcements',
    category: 'HR',
    template_data: {
      components: ['TimeTracker', 'LeaveRequestForm', 'AnnouncementsFeed', 'EmployeeDirectory', 'PayrollView'],
      features: ['time_tracking', 'leave_management', 'announcements', 'employee_directory', 'payroll_access'],
      layout: 'header-sidebar-main',
      integrations: ['calendar', 'email', 'payroll_system'],
      complexity: 'medium'
    },
    is_public: true
  },
  {
    name: 'Simple Landing Page',
    description: 'Professional landing page with hero section, features, testimonials, and contact form',
    category: 'Marketing',
    template_data: {
      components: ['HeroSection', 'FeatureCards', 'TestimonialSlider', 'ContactForm', 'FooterLinks'],
      features: ['responsive_design', 'contact_form', 'testimonials', 'call_to_action', 'seo_optimized'],
      layout: 'single-page',
      integrations: ['email_marketing', 'analytics'],
      complexity: 'simple'
    },
    is_public: true
  }
];

export class TemplateLibrary {
  async getTemplates(category?: string): Promise<AppTemplate[]> {
    try {
      let query = supabase
        .from('app_templates')
        .select('*')
        .eq('is_public', true);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('usage_count', { ascending: false });

      if (error) throw error;
      
      // Type assertion for template_data
      return (data || []).map(template => ({
        ...template,
        template_data: template.template_data as AppTemplate['template_data']
      }));
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
    }
  }

  async createTemplate(template: Omit<AppTemplate, 'id' | 'usage_count'>, userId: string): Promise<AppTemplate> {
    try {
      const { data, error } = await supabase
        .from('app_templates')
        .insert({
          ...template,
          created_by: userId
        })
        .select()
        .single();

      if (error) throw error;
      
      return {
        ...data,
        template_data: data.template_data as AppTemplate['template_data']
      };
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  }

  async useTemplate(templateId: string): Promise<void> {
    try {
      // Simple update without using custom function
      const { error } = await supabase
        .from('app_templates')
        .update({ 
          usage_count: supabase.sql`usage_count + 1`
        })
        .eq('id', templateId);

      if (error) console.error('Error incrementing usage count:', error);
    } catch (error) {
      console.error('Error updating template usage:', error);
    }
  }

  async seedBuiltInTemplates(userId: string): Promise<void> {
    try {
      for (const template of BUILT_IN_TEMPLATES) {
        await this.createTemplate({ ...template, created_by: userId }, userId);
      }
    } catch (error) {
      console.error('Error seeding built-in templates:', error);
    }
  }

  getTemplateCategories(): string[] {
    return [...new Set(BUILT_IN_TEMPLATES.map(t => t.category))];
  }
}

export const templateLibrary = new TemplateLibrary();
