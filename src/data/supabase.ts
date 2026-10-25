import { createClient } from "@supabase/supabase-js";
import {
  supabaseAnonKey,
  supabaseConfigured,
  supabaseUrl,
} from "@/data/supabase-config";

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
