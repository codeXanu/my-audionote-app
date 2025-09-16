import { supabaseAdmin, supabaseClient } from "./supabase";


export default async function uploadFileToSupabase(userId, noteId, file) {
  
  const filePath = `users/${userId}/quick_audio_note/${noteId}/${file.name}`;

  const { data, error } = await supabaseAdmin.storage
    .from("quick_audio_note")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) throw error;
    console.log("file uploaded to supabasse storage.")

  // Get public or signed URL
  const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
    .from("quick_audio_note")
    .createSignedUrl(filePath, 60 * 60 * 2);

    if (signedUrlError) throw signedUrlError;

  return {fileUrl: signedUrlData.signedUrl, filePath };
}
