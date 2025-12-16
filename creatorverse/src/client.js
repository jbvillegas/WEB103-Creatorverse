import { createClient } from '@supabase/supabase-js';

const supabaseURL = 'https://hsaymlthevtsgsgvxckq.supabase.co'; 

const API_KEY = 'sb_publishable_v-GI3Cp_9aNszj7oc1bDCA_ued7Nayn'; 

export const supabase = createClient (supabaseURL, API_KEY);