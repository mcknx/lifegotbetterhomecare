import { createClient } from '@supabase/supabase-js';

// These environment variables will need to be set in your .env.local file
// You'll get these values from your Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 