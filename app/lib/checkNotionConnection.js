export async function checkNotionConnection(userId) {
  try {
    const res = await fetch('/api/notion/check-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Notion connection status');
    }

    const json = await res.json();
    console.log("notion connection", json)
    return json.connected; // true or false
  } catch (err) {
    console.error('Failed to check Notion connection:', err);
    return false;
  }
}
