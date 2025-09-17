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
        .order("created_at", { ascending: false });

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
