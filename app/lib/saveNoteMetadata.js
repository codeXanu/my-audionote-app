import { supabaseAdmin } from "./supabase";



/**
 * Save note metadata into Supabase DB
 * @param {Object} params
 * @param {string} params.noteId - unique ID from storage
 * @param {string} params.userId - Firebase UID of user
 * @param {string} params.type - note type (audio / image / text)
 * @param {string} params.title - AI generated title
 * @param {string} params.transcript - transcript (optional)
 * @param {string} params.summary - summary (optional)
 * @param {number} params.duration - duration in seconds (optional)
 * @param {string} params.fileUrl - Supabase file public/signed URL
 * @param {string} params.filePath - file storage path in bucket
 */
export async function saveNoteMetadata({
  noteId,
  userId,
  type,
  title,
  transcript,
  summary,
  duration,
  filePath,
}) {
  const { error } = await supabaseAdmin
    .from("notes_metadata")
    .insert([
      {
        id: noteId,          // store the noteId from storage as the row id
        user_id: userId,
        type,
        title,
        transcript,
        summary,
        duration,
        file_path: filePath,
      },
    ]);

  if (error) {
    console.error("Error saving note metadata:", error);
    throw error;
  }

  // no return needed, just save
}
