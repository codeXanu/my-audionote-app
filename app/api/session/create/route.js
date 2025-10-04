import { supabaseAdmin } from "@/app/lib/supabase";
import { adminAuth } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    let userId;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      userId = decoded.uid;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const sessionKey = Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
    await supabaseAdmin.from("user_sessions").insert({
      user_id: userId,
      session_key: sessionKey,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return NextResponse.json({ sessionKey }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
