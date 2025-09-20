// lib/toggleFavourite.js
export async function toggleFavourite(noteId, isFavourite) {
  try {
    const res = await fetch("/api/notes/favourite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId, isFavourite }),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to toggle favourite");
    }
    return true;
  } catch (err) {
    console.error("toggleFavourite error:", err);
    return false;
  }
}
