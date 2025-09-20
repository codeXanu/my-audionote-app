// app/api/notion/save-note/route.js
// import { NextResponse } from "next/server";
// import { supabaseAdmin } from "@/app/lib/supabase";
// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// export async function POST(req) {
//   try {
//     const { userId, title, content } = await req.json();
//     if (!userId || !title) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

//     // Fetch user's notion token + database_id
//     const { data, error } = await supabaseAdmin.from("notion_tokens").select("*").eq("user_id", userId).single();
//     if (error || !data) return NextResponse.json({ error: "Notion not connected" }, { status: 404 });

//     const notionToken = data.access_token;
//     const databaseId = data.database_id;
//     if (!databaseId) return NextResponse.json({ error: "No database selected" }, { status: 400 });

//     const pageRes = await fetch("https://api.notion.com/v1/pages", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${notionToken}`,
//         "Notion-Version": "2025-09-03",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         parent: { database_id: databaseId },
//         properties: {
//           Title: { title: [{ text: { content: title } }] },
//           Content: { rich_text: [{ text: { content: content || "" } }] },
//         //   CreatedAt: { date: { start: new Date().toISOString() } },
//         },
//       }),
//     });

//     const pageJson = await pageRes.json();
//     if (pageJson?.id) return NextResponse.json({ ok: true, pageId: pageJson.id });
//     console.error("notion create error", pageJson);
//     return NextResponse.json({ error: "Failed to create page", details: pageJson }, { status: 500 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
