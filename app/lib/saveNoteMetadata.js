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
  createdAt,
  title,
  transcript,
  summary,
  duration,
  filePath,
  fileUrl,
  cardType
}) {
  const { data, error } = await supabaseAdmin
    .from("notes_metadata")
    .insert([
      {
        id: noteId,          // store the noteId from storage as the row id
        user_id: userId,
        type,
        created_at: createdAt,
        title,
        transcript,
        summary,
        duration,
        file_path: filePath,
        file_url: fileUrl,
        card_type: cardType
      },
    ])
    .select()
    .single(); // returns only the newly inserted row as an object

  if (error) {
    console.error("Error saving note metadata:", error);
    throw error;
  }

  return data; // returns the inserted row object
}
