import { supabaseAdmin } from "./supabase";

const getWebhookUrl = async (userId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("webhook_url")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data?.webhook_url || null;
  } catch (error) {
    console.error("Error fetching webhook URL:", error);
    return null;
  }
};

export default getWebhookUrl;