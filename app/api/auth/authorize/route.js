import { supabaseAdmin } from "@/app/lib/supabase";
import { adminAuth } from "@/app/lib/firebaseAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const redirect_uri = searchParams.get("redirect_uri");
  const state = searchParams.get("state");
  const client_id = searchParams.get("client_id");
  console.log('clientis', client_id);
  const sessionKey = searchParams.get("session_key");
  console.log('session key', sessionKey)
  console.log('state', state)

  // 1️⃣ Validate Zapier client_id
  if (client_id !== process.env.ZAPIER_CLIENT_ID) {
    return new Response(JSON.stringify({ error: "Invalid client_id" }), { status: 401 });
  }

  if (!redirect_uri || !state || !sessionKey) {
    return new Response(JSON.stringify({ error: "Missing redirect_uri or state" }), { status: 400 });
  }

  // // 2️⃣ Get Firebase ID token from cookie or header
  // const cookieHeader = req.headers.get("cookie") || "";
  // const match = cookieHeader.match(/__session=([^;]+)/);
  // const idToken = match ? match[1] : null;

  // Validate session key in DB
  const { data: session } = await supabaseAdmin
    .from("user_sessions")
    .select("user_id")
    .eq("session_key", sessionKey)
    .single();

  if (!session) {
    return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
  }

  //  if (!idToken) {
  //   // User not logged in → redirect to login page
  //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  //   const loginRedirect = `${baseUrl}/login?redirect=/api/auth/authorize`;
  //   return Response.redirect(loginRedirect, 302);
  // }

  // let userId;
  // try {
  //   const decodedToken = await adminAuth.verifyIdToken(idToken);
  //   userId = decodedToken.uid;
  // } catch (err) {
  //   return new Response(JSON.stringify({ error: "Invalid Firebase session" }), { status: 401 });
  // }

  // 3️⃣ Generate temporary code
  const code = Math.random().toString(36).substring(2, 15);

  await supabaseAdmin.from("zapier_auth_codes").insert({
    code,
    user_id: session.user_id,
    created_at: new Date(),
  });

  // 4️⃣ Redirect back to Zapier
  const redirectUrl = `${redirect_uri}?code=${code}&state=${state}`;
  return Response.redirect(redirectUrl, 302);
}
