import { supabaseAdmin } from "./supabase";

/**
 * Sync a saved note into Notion if user has connected their Notion DB
 * @param {Object} note - The saved note metadata object from Supabase
 * @param {string} userId - The user id (to fetch their notion credentials)
 */
export async function syncNoteToNotion(note, userId) {
  try {
    // 1. Get user's notion connection
    const { data: notionData, error: notionErr } = await supabaseAdmin
      .from("notion_tokens")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle(); // returns null if not found

    if (notionErr || !notionData?.access_token || !notionData?.database_id) {
      console.log("ℹ️ User has not connected Notion, skipping sync.");
      return null; // nothing to do
    }

    // 2. Prepare request
    const notionToken = notionData.access_token;
    const databaseId = notionData.database_id;

    const pageRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Notion-Version": "2025-09-03", // keep consistent
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Title: { title: [{ text: { content: note.title } }] },
          Summary: { rich_text: [{ text: { content: note.summary || "" } }] },
          Transcript: { rich_text: [{ text: { content: note.transcript || "" } }] },
          CreatedAt: { date: { start: note.date_time } },
        },
      }),
    });

    const notionJson = await pageRes.json();

    if (!notionJson?.id) {
      console.error("❌ Failed to save note to Notion:", notionJson);
      return { success: false, error: notionJson };
    }

    console.log("✅ Note also saved to Notion", notionJson.id);
    return { success: true, notionPageId: notionJson.id };
  } catch (err) {
    console.error("Unexpected error syncing with Notion:", err);
    return { success: false, error: err.message };
  }
}