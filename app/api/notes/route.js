import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";


export async function GET(req) {
  const url = new URL(req.url);
  const userId = req.headers.get("x-user-id");
  const noteId = url.searchParams.get("noteId"); // optional query param

  if (!userId) return new Response("Unauthorized", { status: 401 });
  console.log("data fetchinh running.")

  try {
    if (noteId) {
      // Fetch a single note
      const { data, error } = await supabaseAdmin
        .from("notes_metadata")
        .select("*")
        .eq("user_id", userId)
        .eq("id", noteId)
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Fetch all notes
      const { data, error } = await supabaseAdmin
        .from("notes_metadata")
        .select("*")
        .eq("user_id", userId)
        .order("date_time", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

export async function PATCH(req) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { noteId, field } = body;

    if (!noteId || !field) {
      return new Response("noteId and fields are required", { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("notes_metadata")
      .update(field)
      .eq("user_id", userId)
      .eq("id", noteId)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const userId = req.headers.get("x-user-id");
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");

    if (!userId || !noteId) {
      return NextResponse.json(
        { error: "Missing userId or noteId" },
        { status: 400 }
      );
    }

    // 1️⃣ Get file_path from database
    const { data: note, error: fetchError } = await supabaseAdmin
      .from("notes_metadata")
      .select("file_path")
      .eq("id", noteId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !note) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Delete metadata row
    const { error: deleteDbError } = await supabaseAdmin
      .from("notes_metadata")
      .delete()
      .eq("id", noteId)
      .eq("user_id", userId);

    if (deleteDbError) throw deleteDbError;

    // 3️⃣ Delete file from storage
    const { error: deleteFileError } = await supabaseAdmin.storage
      .from("quick_audio_note") // your bucket name
      .remove([note.file_path]);

    if (deleteFileError) {
      console.error("File delete error:", deleteFileError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting note:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
