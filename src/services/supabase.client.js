import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../supabase.config';


export const supabase = createClient(
    SUPABASE_CONFIG.SUPABASE_URL,
    SUPABASE_CONFIG.SUPABASE_ANON_KEY
);


if (!SUPABASE_CONFIG.SUPABASE_URL || !SUPABASE_CONFIG.SUPABASE_ANON_KEY) {
    throw new Error('Supabase client: Missing configuration');
}