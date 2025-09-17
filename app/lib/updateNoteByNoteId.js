export async function updateNoteById(userId, noteId, field) {
  try {
    const res = await fetch("/api/notes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      body: JSON.stringify({
        noteId,
        field, // e.g., { title: "New Title", summary: "Updated summary" }
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to update note");
    }

    const data = await res.json();
    return data; // updated note object
  } catch (err) {
    console.error("Error updating note:", err);
    throw err;
  }
}
