// import { supabaseClient } from "../lib/supabase";


// export default function getAudioURL(audioFile) {
//   if (!audioFile || !audioFile.base64) return null;

//   const { base64, mimeType } = audioFile;

//   // Decode base64 → byte array
//   const byteChars = atob(base64);
//   const byteNumbers = new Array(byteChars.length)
//     .fill()
//     .map((_, i) => byteChars.charCodeAt(i));
//   const byteArray = new Uint8Array(byteNumbers);

//   // Create a Blob and Object URL
//   const blob = new Blob([byteArray], { type: mimeType });
//   const url = URL.createObjectURL(blob);

//   return url;
// }





// ✅ Get signed URL from Supabase storage

// export async function getAudioFileUrl(filePath) {
//   if (!filePath) return null;

//   const { data, error } = await supabaseClient.storage
//     .from("your-bucket-name") // 🔹 replace with your bucket name
//     .createSignedUrl(filePath, 60 * 60); // 1 hour expiry

//   if (error) {
//     console.error("Error generating signed URL:", error);
//     return null;
//   }

//   return data?.signedUrl || null;
// }
