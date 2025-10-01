import jwt from "jsonwebtoken";
import { supabaseAdmin } from "@/app/lib/supabase";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return new Response(JSON.stringify({ error: "No token" }), { status: 401 });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const { data: notes } = await supabaseAdmin
      .from("notes_metadata")
      .select("id, title, transcript, summary, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    return new Response(JSON.stringify(notes || []), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
