const saveWebhookUrl = async (userId, webhookUrl) => {
  try {
    const response = await fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        webhook_url: webhookUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save webhook URL");
    }

    const data = await response.json();
    console.log("Webhook saved successfully:", data.message);
    return data;
  } catch (error) {
    console.error("Error saving webhook URL:", error);
  }
};

export default saveWebhookUrl ;