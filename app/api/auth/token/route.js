import { supabaseAdmin } from "@/app/lib/supabase";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req) {
  const { code, client_id, client_secret, grant_type } = await req.json();

  if (
    client_id !== process.env.ZAPIER_CLIENT_ID ||
    client_secret !== process.env.ZAPIER_CLIENT_SECRET
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  if (grant_type !== "authorization_code") {
    return NextResponse.json({ error: "Invalid grant_type" }, { status: 400 });
  }

  // verify code
  const { data } = await supabaseAdmin
    .from("zapier_auth_codes")
    .select("user_id")
    .eq("code", code)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  const token = jwt.sign({ userId: data.user_id }, JWT_SECRET, { expiresIn: "7d" });
  return NextResponse.json({
    access_token: token,
    token_type: "Bearer",
    expires_in: 604800,
  });
}
