export default async function deleteNoteById(userId, noteId) {
  try {
    const res = await fetch(`/api/notes?noteId=${noteId}`, {
      method: "DELETE",
      headers: { "x-user-id": userId },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to delete note");
    }

    alert('Note deleted successfully!')
    return true;
  } catch (err) {
    console.error("Error deleting note:", err);
    throw err;
  }
}
