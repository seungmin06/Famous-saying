import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.supabaseURL
const supabaseKey = process.env.supabaseKEY

export const supabase = createClient(supabaseUrl, supabaseKey);
