import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPERBASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
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