import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

// Initialize a Supabase client with the service key
// This bypasses RLS and should only be used in secure backend routes


// Helper function to validate URLs
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * GET request to retrieve a webhook URL for a user.
 * It now accepts userId in the request body.
 * @param {import("next/server").NextRequest} req
 */
export async function GET(req) {
  try {
    // Correctly get the userId from the URL search parameters
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Now correctly targeting the 'users' table
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("webhook_url")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 means no row found
      console.error("Supabase GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ webhook_url: data?.webhook_url || null });
  } catch (err) {
    console.error("Error in GET /api/webhook:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST request to save/update a webhook URL for a user.
 * It uses 'upsert' to either insert a new record or update an existing one.
 * @param {import("next/server").NextRequest} req
 */
export async function POST(req) {
  try {
    const { userId, webhook_url } = await req.json();
      console.log("user", userId)
      console.log("url", webhook_url)
    if (!userId || !webhook_url) {
      return NextResponse.json(
        { error: "User ID and webhook URL are required" },
        { status: 400 }
      );
    }

    if (!isValidUrl(webhook_url)) {
      return NextResponse.json(
        { error: "Invalid webhook URL format" },
        { status: 400 }
      );
    }

    // Now correctly targeting the 'users' table
    // It will update the webhook_url for the given user id.
    const { data, error } = await supabaseAdmin.from("users").upsert(
      {
        user_id: userId,
        webhook_url,
      },
      { onConflict: "user_id" }
    ).select();

    if (error) {
      console.error("Supabase POST error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Webhook URL saved successfully",
      data: data[0],
    });
  } catch (err) {
    console.error("Error in POST /api/webhook:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE request to remove a webhook URL for a user.
 * @param {import("next/server").NextRequest} req
 */
export async function DELETE(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Now correctly targeting the 'users' table
    const { error } = await supabaseAdmin
      .from("users")
      .update({ webhook_url: null })
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase DELETE error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Webhook URL deleted successfully" });
  } catch (err) {
    console.error("Error in DELETE /api/webhook:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
