// /app/lib/zapierTrigger.js

import { supabaseAdmin } from "./supabase";

/**
 * Sends the note payload to all Zapier webhook URLs subscribed by the given user.
 * @param {string} userId - The user ID who owns the note.
 * @param {object} notePayload - The note data to send in the webhook.
 */
export async function triggerZapierWebhooks(userId, notePayload) {
  try {
    const { data: hooks, error } = await supabaseAdmin
      .from("zapier_webhooks")
      .select("target_url")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching Zapier webhooks:", error);
      return;
    }

    if (!hooks || hooks.length === 0) {
      console.log("No Zapier webhooks registered for user:", userId);
      return;
    }

    for (const hook of hooks) {
      try {
        await fetch(hook.target_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notePayload),
        });
        console.log(`Zapier webhook POST successful to ${hook.target_url}`);
      } catch (err) {
        console.error("Zapier webhook POST failed to", hook.target_url, err);
      }
    }
  } catch (err) {
    console.error("triggerZapierWebhooks unexpected error:", err);
  }
}
