export async function fetchAudioBlob(youtubeUrl) {
  // Step 1: get audio URL from backend
  const res = await fetch(`/api/get-audio?url=${encodeURIComponent(youtubeUrl)}`);
  console.log("this is res for yt rt", res)
  if (!res.ok) throw new Error("Failed to fetch audio URL");

  const { audioUrl } = await res.json();

  // Step 2: fetch the audio as Blob
  const audioRes = await fetch(audioUrl);
  if (!audioRes.ok) throw new Error("Failed to fetch audio stream");

  const blob = await audioRes.blob();
  return blob; // ready to use
}