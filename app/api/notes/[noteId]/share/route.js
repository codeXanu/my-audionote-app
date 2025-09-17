import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
import crypto from "crypto";

/**
 * POST /api/notes/{noteId}/share
 * Generates a unique share token for a note and saves it.
 * Body can optionally include expiration datetime.
 */
export async function POST(req, { params }) {
  const { noteId } = params;

  // (Optional) Extract expiration date from request body
//   const { expiresAt } = await req.json().catch(() => ({}));

  try {
    // Generate secure random UUID as share token
    const shareToken = crypto.randomUUID();
    // Set expiration 24 hours
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    // Prepare update payload
    const updateData = {
      share_token: shareToken,
      share_token_expires_at: expiresAt ,
    };

    // Update note record with share token
    const { error } = await supabaseAdmin
      .from("notes_metadata")
      .update(updateData)
      .eq("id", noteId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ shareToken, expiresAt });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE /api/notes/{noteId}/share
 * Clears share token to unpublish the note
 */
export async function DELETE(req, { params }) {
  const { noteId } = params;

  try {
    const { error } = await supabaseAdmin
      .from("notes_metadata")
      .update({ share_token: null, share_token_expires_at: null })
      .eq("id", noteId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}