import { supabaseAdmin } from "@/app/lib/supabase";
import { adminAuth } from "@/app/lib/firebaseAdmin";

export async function POST(req) {
  const { idToken } = await req.json();

  if (!idToken) return new Response(JSON.stringify({ error: "No token" }), { status: 400 });

  let userId;
  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    userId = decoded.uid;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }

  // Generate random session key
  const sessionKey = Math.random().toString(36).substring(2, 15);

  await supabaseAdmin.from("user_sessions").insert({
    user_id: userId,
    session_key: sessionKey,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires in 1 day
  });

  return new Response(JSON.stringify({ sessionKey }), { status: 200 });
}