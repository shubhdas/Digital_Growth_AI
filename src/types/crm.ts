export type AppRole = 'admin' | 'staff';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadSource = 'website' | 'referral' | 'manual' | 'social' | 'other';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

export interface Lead {
  id: string;
  customer_id: string;
  source: LeadSource;
  status: LeadStatus;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
}

export type DealStage = 'discovery' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export interface Deal {
  id: string;
  customer_id: string;
  title: string;
  value: number;
  stage: DealStage;
  expected_close_date: string | null;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
}

export type ActivityType = 'call' | 'email' | 'meeting' | 'note' | 'task';

export interface Activity {
  id: string;
  customer_id: string;
  type: ActivityType;
  description: string;
  created_by: string | null;
  created_at: string;
  customer?: Customer;
}
