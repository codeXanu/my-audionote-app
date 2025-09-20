import { supabaseAdmin } from "@/app/lib/supabase";


export async function POST(req) {
  try {
    const { userId } = await req.json();

    const { data, error } = await supabaseAdmin
      .from('notion_tokens')
      .select('access_token, database_id')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    const connected = data?.access_token && data?.database_id ? true : false;

    return new Response(JSON.stringify({ connected }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ connected: false, error: err.message }),
      { status: 500 }
    );
  }
}