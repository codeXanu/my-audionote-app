import { supabaseAdmin } from "@/app/lib/supabase";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const redirect_uri = searchParams.get("redirect_uri");
  const state = searchParams.get("state");
  const userId = searchParams.get("user_id"); // You pass Firebase UID from frontend

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing user_id" }), { status: 400 });
  }

  // Generate temporary code
  const code = Math.random().toString(36).substring(2, 15);

  await supabaseAdmin.from("zapier_auth_codes").insert({
    code,
    user_id: userId,
    created_at: new Date(),
  });

  const redirectUrl = `${redirect_uri}?code=${code}&state=${state}`;
  return Response.redirect(redirectUrl, 302);
}
