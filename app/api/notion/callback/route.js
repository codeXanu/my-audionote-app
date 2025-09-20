// app/api/notion/callback/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // userId passed earlier
    console.log('this is anujjjjjj', state)
    const error = searchParams.get("error");

    if (error) {
      console.error("Notion auth error", error);
      return NextResponse.json({ error: "Authorization denied" }, { status: 400 });
    }
    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    // Exchange code for token
    const tokenRes = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NOTION_REDIRECT_URI,
      }),
    });

    const tokenJson = await tokenRes.json();
    if (tokenJson.error) {
      console.error("token exchange error", tokenJson);
      return NextResponse.json({ error: "Token exchange failed", details: tokenJson }, { status: 500 });
    }

    const access_token = tokenJson.access_token;
    const workspace = tokenJson.workspace || null;

    // Map to user id (from state). If you use server session, prefer to map from session.
    const userId = state || "unknown_user";

    // Upsert into Supabase
    const { error: supErr } = await supabaseAdmin
      .from("notion_tokens")
      .upsert(
        {
          user_id: userId,
          access_token,
          workspace_id: workspace?.id || null,
          workspace_name: workspace?.name || null,
        },
        { onConflict: "user_id" }
      );

    if (supErr) {
      console.error("Supabase save error", supErr);
      return NextResponse.json({ error: "Failed to save token" }, { status: 500 });
    }

    // Redirect user back to your app UI (settings page), include query param for UI feedback
    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/home/notion-integration?notion=connected`;
    return NextResponse.redirect(redirectTo);
  } catch (err) {
    console.error("callback handler error", err);
    return NextResponse.json({ error: "Callback failed" }, { status: 500 });
  }
}
