import { supabaseAdmin } from "@/app/lib/supabase";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req) {
  const body = await req.json();
  const { code } = body;

  const { data, error } = await supabaseAdmin
    .from("zapier_auth_codes")
    .select("user_id")
    .eq("code", code)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: "Invalid or expired code" }), { status: 400 });
  }

  const userId = data.user_id;

  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

  return new Response(
    JSON.stringify({
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 604800,
    }),
    { status: 200 }
  );
}
