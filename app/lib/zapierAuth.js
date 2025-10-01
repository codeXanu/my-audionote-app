import jwt from "jsonwebtoken";
// import { createClient } from "@supabase/supabase-js";

// Supabase client
// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY // service key required for backend inserts/selects
// );

export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function createToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
