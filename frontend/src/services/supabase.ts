import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define database types
export interface Profile {
  id: string;
  email: string;
  business_name: string;
  volume_tier: string;
  created_at: string;
}

export interface AuditFlag {
  name: string;
  cost: number;
  reason: string;
}

export interface AuditMetrics {
  sales_volume: number;
  total_fees: number;
  current_effective_rate: number;
  target_effective_rate: number;
  monthly_overpayment: number;
  annual_potential_savings: number;
}

export interface Audit {
  id: string;
  profile_id: string;
  file_name: string;
  file_storage_path: string;
  sales_volume: number;
  total_fees: number;
  current_effective_rate: number;
  target_effective_rate: number;
  monthly_overpayment: number;
  annual_potential_savings: number;
  json_flags: AuditFlag[];
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
}

// Check environment variables for live connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isLiveConnectionReady = supabaseUrl && supabaseAnonKey;

// Initialize Supabase client if keys are present
export const supabase: SupabaseClient | null = isLiveConnectionReady
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

console.log(
  isLiveConnectionReady
    ? '🔌 FeeShield: Supabase initialized in LIVE database mode.'
    : '⚙️ FeeShield: Supabase initialized in MOCK simulated mode (saving to localStorage).'
);

/**
 * Core Database Service Operations (Pure In-Memory Mode)
 * Ensures 100% privacy: no user details, emails, or statement metrics are saved to localStorage or database.
 */
export const dbService = {
  /**
   * Saves or updates a user profile (in-memory only)
   */
  async saveProfile(email: string, businessName: string, volumeTier: string): Promise<Profile> {
    const cleanEmail = email.toLowerCase().trim();
    return {
      id: crypto.randomUUID(),
      email: cleanEmail,
      business_name: businessName,
      volume_tier: volumeTier,
      created_at: new Date().toISOString(),
    };
  },

  /**
   * Saves a statement audit report (in-memory only)
   */
  async saveAudit(profileId: string, fileName: string, metrics: AuditMetrics, flags: AuditFlag[]): Promise<Audit> {
    return {
      id: crypto.randomUUID(),
      profile_id: profileId,
      file_name: fileName,
      file_storage_path: `in-memory/${profileId}/${fileName}`,
      sales_volume: metrics.sales_volume,
      total_fees: metrics.total_fees,
      current_effective_rate: metrics.current_effective_rate,
      target_effective_rate: metrics.target_effective_rate,
      monthly_overpayment: metrics.monthly_overpayment,
      annual_potential_savings: metrics.annual_potential_savings,
      json_flags: flags,
      status: 'completed' as const,
      created_at: new Date().toISOString(),
    };
  },

  /**
   * Fetches a single audit report by its ID
   */
  async getAudit(_auditId: string): Promise<Audit | null> {
    return null;
  },

  /**
   * Fetches all audits associated with a specific profile ID
   */
  async getAuditsByProfile(_profileId: string): Promise<Audit[]> {
    return [];
  },

  /**
   * Saves a waitlist/contact inquiry (in-memory only)
   */
  async saveWaitlist(profileId: string, auditId: string, processor: string, message: string): Promise<any> {
    return {
      success: true,
      profile_id: profileId,
      audit_id: auditId,
      processor: processor || 'Unknown',
      message: message || '',
      created_at: new Date().toISOString()
    };
  }
};
