export async function fetchAudioBlob(youtubeUrl) {
  // Step 1: Call backend to get direct audio URL
  const res = await fetch(`/api/get-audio?url=${encodeURIComponent(youtubeUrl)}`);
  if (!res.ok) throw new Error("Failed to fetch audio URL");

  const blob = await res.blob();
  
//   const { audioUrl } = await res.json();

  // Step 2: Fetch the audio stream from YouTube
//   const audioRes = await fetch(audioUrl);
//   if (!audioRes.ok) throw new Error("Failed to fetch audio stream");

  // Step 3: Convert to Blob
//   const blob = await audioRes.blob();

  return blob; // <-- ready to use in your frontend
}
