import { createClient } from '@supabase/supabase-js';

// read supabase url and anon key from environment
const supabaseUrl = import.meta.env.REMEMBIT_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.REMEMBIT_SUPABASE_ANON_KEY as string;

// export hydrated supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
