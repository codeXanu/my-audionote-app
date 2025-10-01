import jwt from "jsonwebtoken";
import { supabaseAdmin } from "@/app/lib/supabase";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return new Response(JSON.stringify({ error: "No token" }), { status: 401 });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id, user_id, email")
      .eq("user_id", decoded.userId)
      .single();

    return new Response(JSON.stringify(user || { id: decoded.userId }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
