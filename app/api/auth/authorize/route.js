import { supabaseAdmin } from "@/app/lib/supabase";
import { adminAuth } from "@/app/lib/firebaseAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const redirect_uri = searchParams.get("redirect_uri");
  const state = searchParams.get("state");
  const client_id = searchParams.get("client_id");
  console.log('clientis', client_id);

  // 1️⃣ Validate Zapier client_id
  if (client_id !== process.env.ZAPIER_CLIENT_ID) {
    return new Response(JSON.stringify({ error: "Invalid client_id" }), { status: 401 });
  }

  if (!redirect_uri || !state) {
    return new Response(JSON.stringify({ error: "Missing redirect_uri or state" }), { status: 400 });
  }

  // 2️⃣ Get Firebase ID token from cookie or header
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/__session=([^;]+)/);
  const idToken = match ? match[1] : null;

  if (!idToken) {
    // User not logged in → redirect to login page
    return Response.redirect("/login?redirect=/api/auth/authorize", 302);
  }

  let userId;
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    userId = decodedToken.uid;
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid Firebase session" }), { status: 401 });
  }

  // 3️⃣ Generate temporary code
  const code = Math.random().toString(36).substring(2, 15);

  await supabaseAdmin.from("zapier_auth_codes").insert({
    code,
    user_id: userId,
    created_at: new Date(),
  });

  // 4️⃣ Redirect back to Zapier
  const redirectUrl = `${redirect_uri}?code=${code}&state=${state}`;
  return Response.redirect(redirectUrl, 302);
}
