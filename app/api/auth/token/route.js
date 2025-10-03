import { supabaseAdmin } from "@/app/lib/supabase";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req) {
  const formData = await req.formData();
  const code = formData.get("code");
  const client_id = formData.get("client_id");
  const client_secret = formData.get("client_secret");
  const grant_type = formData.get("grant_type");

  // 1. Validate Zapier credentials
  if (
    client_id !== process.env.ZAPIER_CLIENT_ID ||
    client_secret !== process.env.ZAPIER_CLIENT_SECRET
  ) {
    return new Response(
      JSON.stringify({ error: "Invalid client credentials" }),
      { status: 401 }
    );
  }

  if (grant_type !== "authorization_code") {
    return new Response(
      JSON.stringify({ error: "Unsupported grant_type" }),
      { status: 400 }
    );
  }

  // 2. Lookup auth code in Supabase
  const { data, error } = await supabaseAdmin
    .from("zapier_auth_codes")
    .select("user_id")
    .eq("code", code)
    .single();

  if (error || !data) {
    return new Response(
      JSON.stringify({ error: "Invalid or expired code" }),
      { status: 400 }
    );
  }

  const userId = data.user_id;

  // 3. Issue JWT token
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

  return new Response(
    JSON.stringify({
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 604800, // 7 days
    }),
    { status: 200 }
  );
}
