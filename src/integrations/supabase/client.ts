// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rkbfsvbqepboiiiyalef.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYmZzdmJxZXBib2lpaXlhbGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjYxMTMsImV4cCI6MjA2NjcwMjExM30.JCrmkbaeiGtrPmGaJuRh8m-64tghBYCIUa3WCZnj9wQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);