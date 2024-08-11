
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
const supabaseUrl = import.meta.env.VITE_URL;
const supabaseKey = import.meta.env.VITE_SERVICE_ROL;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
