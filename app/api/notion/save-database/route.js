// app/api/notion/save-database/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";


export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, databaseId } = body;
    if (!userId || !databaseId) {
      return NextResponse.json({ error: "Missing userId or databaseId" }, { status: 400 });
    }

    const { error, data } = await supabaseAdmin
      .from("notion_tokens")
      .upsert({ user_id: userId, database_id: databaseId }, { onConflict: "user_id" });

    if (error) {
      console.error("save-database supabase err", error);
      return NextResponse.json({ error: "Failed to save database id" }, { status: 500 });
    }
    console.log("Upsert result:", data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



export async function DELETE(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("notion_tokens")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("disconnect supabase err", error);
      return NextResponse.json({ error: "Failed to disconnect Notion" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Notion disconnected successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
