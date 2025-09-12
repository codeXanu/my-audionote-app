/**
 * Send audio formData to backend and get transcription + summary
 * @param {FormData} formData - contains file, userId, createdAt, type
 * @returns {Promise<Object>} backend response JSON
 */
export async function fetchSummary(formData) {
  try {
    const res = await fetch("/api/summaries", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch summary: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching summary:", err);
    throw err;
  }
}
