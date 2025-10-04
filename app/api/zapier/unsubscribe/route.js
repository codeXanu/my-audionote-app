import { supabaseAdmin } from "@/app/lib/supabase";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing auth" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { target_url } = await req.json();
  await supabaseAdmin
    .from("zapier_webhooks")
    .delete()
    .match({ user_id: decoded.userId, target_url });
  return NextResponse.json({ status: "unsubscribed" });
}
