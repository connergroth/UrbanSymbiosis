// TODO: Set up Supabase client and JWT auth middleware

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
//from env file
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

//  anon key is for client-side operations,
//  service key is for backend / admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

export default supabase;