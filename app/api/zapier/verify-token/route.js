import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { apiKey } = await req.json(); // or get from headers depending on your auth design
    if (!apiKey) {
      return NextResponse.json({ error: "Missing apiKey" }, { status: 400 });
    }
    const decoded = jwt.verify(apiKey, JWT_SECRET);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid apiKey" }, { status: 401 });
    }
    return NextResponse.json({ status: "success", userId: decoded.userId });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
