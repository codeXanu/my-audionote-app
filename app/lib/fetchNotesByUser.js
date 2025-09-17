export default async function fetchNotesByUser(userId) {
    try {
        const res = await fetch("/api/notes", {
            headers: { "x-user-id": userId },
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Failed to fetch notes");
        }

        const data = await res.json();
        return data; // returns array of notes
    } catch (err) {
        console.error("error in fetch all note from database", err);
        throw err ;
    }
}