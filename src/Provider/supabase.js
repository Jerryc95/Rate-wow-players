import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zhpbtjmahamuyfwmckuo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGJ0am1haGFtdXlmd21ja3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4NzUzMzgsImV4cCI6MTk4NjQ1MTMzOH0.8vnN79BJ_RgBISaXJO4306fRKr0geTprGIsRsGTH4aE";
const options = {
    db: {
        schema: 'public',
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
}

const supabase = createClient(supabaseUrl, supabaseKey, options);

export default supabase;