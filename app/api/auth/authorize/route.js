import { supabaseAdmin } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const redirect_uri = searchParams.get("redirect_uri");
  const state = searchParams.get("state");
  const client_id = searchParams.get("client_id");
  const sessionKey = searchParams.get("session_key");

  // Validate client_id
  if (client_id !== process.env.ZAPIER_CLIENT_ID) {
    return NextResponse.json({ error: "Invalid client_id" }, { status: 401 });
  }
  if (!redirect_uri || !state || !sessionKey) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // verify sessionKey
  const { data: session } = await supabaseAdmin
    .from("user_sessions")
    .select("user_id")
    .eq("session_key", sessionKey)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  // Create auth code
  const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  await supabaseAdmin.from("zapier_auth_codes").insert({
    code,
    user_id: session.user_id,
    created_at: new Date(),
  });

  // Redirect back to Zapier
  const url = new URL(redirect_uri);
  url.searchParams.append("code", code);
  url.searchParams.append("state", state);
  return NextResponse.redirect(url.toString(), 302);
}
