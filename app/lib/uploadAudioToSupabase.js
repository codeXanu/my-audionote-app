// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// async function uploadAudio(userId, fileBuffer, fileName, mimeType) {
//   const { data, error } = await supabase.storage
//     .from("audios") // your storage bucket
//     .upload(`${userId}/${fileName}`, fileBuffer, {
//       contentType: mimeType,
//       upsert: true,
//     });

//   if (error) throw error;

//   // Get a public URL for playback
//   const { data: publicUrl } = supabase.storage.from("audios").getPublicUrl(`${userId}/${fileName}`);

//   return publicUrl.publicUrl;
// }

// export default uploadAudio ;