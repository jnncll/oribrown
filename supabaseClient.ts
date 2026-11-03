import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://dcwbbohocapgtbjuzxtd.supabase.co';

export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjd2Jib2hvY2FwZ3RianV6eHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MTUxMzksImV4cCI6MjEwNTk5MTEzOX0.PNdvoYImPelW1WyNPaQvH-4gcfRnY6UPykoW5NyzY8g';

export const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;