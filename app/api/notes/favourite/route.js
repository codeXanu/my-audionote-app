import { supabaseAdmin } from "@/app/lib/supabase";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { noteId, isFavourite } = await req.json();

    // Update favourite field in Supabase
    const { data, error } = await supabaseAdmin
      .from("notes_metadata")
      .update({ is_favourite: isFavourite })
      .eq("id", noteId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}