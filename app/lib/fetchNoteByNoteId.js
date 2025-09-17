export default async function fetchNoteById(userId, noteId) {
  try {
    const res = await fetch(`/api/notes?noteId=${noteId}`, {
      headers: { "x-user-id": userId },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to fetch note");
    }

    const data = await res.json();
    return data; // returns single note object
  } catch (err) {
    console.error("Error fetching note by ID:", err);
    throw err;
  }
}