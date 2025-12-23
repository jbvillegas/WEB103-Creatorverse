import { createClient } from '@supabase/supabase-js';

const supabaseURL = import.meta.env.VITE_SUPABASE_URL; 
const API_KEY = import.meta.env.VITE_API_KEY; 

export const supabase = createClient (supabaseURL, API_KEY);