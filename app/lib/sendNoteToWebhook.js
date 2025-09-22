export async function sendNoteToWebhook(webhookUrl, noteData) {
  if (!webhookUrl) {
    console.log("No webhook URL provided. Skipping webhook sync.");
    return { success: false, message: "No webhook URL." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
      // Optional: Add a timeout to prevent long-running requests
      // This requires abort-controller, a standard browser API
      // signal: AbortSignal.timeout(5000), 
    });

    if (response.ok) {
      console.log(`✅ Webhook sent successfully to ${webhookUrl}`);
      return { success: true, message: "Webhook sent successfully." };
    } else {
      const errorText = await response.text();
      console.error(
        `❌ Webhook failed with status ${response.status}: ${errorText}`
      );
      return {
        success: false,
        message: `Webhook failed: ${response.status} - ${errorText}`,
      };
    }
  } catch (err) {
    console.error(`❌ Error sending webhook: ${err.message}`);
    return {
      success: false,
      message: `Error sending webhook: ${err.message}`,
    };
  }
}