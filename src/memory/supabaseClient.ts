/**
 * Supabase client configuration and initialization
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      agent_sessions: {
        Row: {
          id: string;
          agent_id: string;
          start_time: string;
          end_time: string;
          experience_count: number;
          average_quality: number;
          insights_count: number;
          created_at?: string;
        };
        Insert: {
          id: string;
          agent_id: string;
          start_time: string;
          end_time: string;
          experience_count: number;
          average_quality: number;
          insights_count: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          start_time?: string;
          end_time?: string;
          experience_count?: number;
          average_quality?: number;
          insights_count?: number;
          created_at?: string;
        };
      };
      agent_experiences: {
        Row: {
          id: string;
          session_id: string;
          timestamp: string;
          primitive: string;
          input_data: any;
          output_data: any;
          quality_metrics: any;
          insights: string[];
          duration_ms: number;
          created_at?: string;
        };
        Insert: {
          id: string;
          session_id: string;
          timestamp: string;
          primitive: string;
          input_data: any;
          output_data: any;
          quality_metrics: any;
          insights: string[];
          duration_ms: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          timestamp?: string;
          primitive?: string;
          input_data?: any;
          output_data?: any;
          quality_metrics?: any;
          insights?: string[];
          duration_ms?: number;
          created_at?: string;
        };
      };
      discovered_patterns: {
        Row: {
          id: string;
          session_id: string;
          description: string;
          confidence: number;
          occurrences: number;
          contexts: string[];
          created_at?: string;
        };
        Insert: {
          id: string;
          session_id: string;
          description: string;
          confidence: number;
          occurrences: number;
          contexts: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          description?: string;
          confidence?: number;
          occurrences?: number;
          contexts?: string[];
          created_at?: string;
        };
      };
      agent_insights: {
        Row: {
          id: string;
          session_id: string;
          experience_id?: string;
          insight_text: string;
          insight_type?: string;
          metadata?: any;
          created_at?: string;
        };
        Insert: {
          id: string;
          session_id: string;
          experience_id?: string;
          insight_text: string;
          insight_type?: string;
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          experience_id?: string;
          insight_text?: string;
          insight_type?: string;
          metadata?: any;
          created_at?: string;
        };
      };
    };
  };
}

let supabaseClient: SupabaseClient<Database> | null = null;

/**
 * Get or create Supabase client instance
 */
export function getSupabaseClient(url?: string, key?: string): SupabaseClient<Database> {
  if (!supabaseClient) {
    const supabaseUrl = url || process.env.SUPABASE_URL;
    const supabaseKey = key || process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and key are required. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }
    
    supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
  }
  
  return supabaseClient;
}

/**
 * Test Supabase connection
 */
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const client = getSupabaseClient();
    const { error } = await client.from('agent_sessions').select('id').limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Supabase connection test failed:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
}