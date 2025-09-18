import { createClient } from "@supabase/supabase-js";


// client for frontend/public usage (anon key)
// console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("SUPABASE ANON KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// admin client for backend (service role key)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);