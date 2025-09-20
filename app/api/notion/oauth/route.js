// app/api/notion/oauth/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // get current user id from cookie/session - replace with your auth logic
    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state");  // Read state param here (userId)

    // const userId = req.headers.get("x-user-id");
    const clientId = process.env.NOTION_CLIENT_ID;
    const redirectUri = process.env.NOTION_REDIRECT_URI;
    // const state = encodeURIComponent(userId); // include user id to map token later

    const url = new URL("https://api.notion.com/v1/oauth/authorize");
    url.searchParams.set("owner", "user");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("state", state);

    return NextResponse.redirect(url.toString());
  } catch (err) {
    console.error("oauth redirect error", err);
    return NextResponse.json({ error: "OAuth redirect failed" }, { status: 500 });
  }
}
