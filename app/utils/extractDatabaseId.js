// utils/extractDatabaseId.js
// export function extractDatabaseId(url) {
//   if (!url) throw new Error("Missing URL");
//   // Remove dashes and match 32 hex chars. Notion IDs sometimes include hyphens.
//   const match = url.match(/([0-9a-fA-F]{32})/);
//   if (match) return match[1];
//   const match2 = url.match(/([0-9a-fA-F\-]{32,36})/);
//   if (match2) return match2[1].replace(/-/g, "");
//   throw new Error("Invalid Notion Database URL");
// }


export function extractDatabaseId(url) {
  if (!url) throw new Error("Missing URL");

  try {
    const cleanUrl = new URL(url); // use URL API
    const path = cleanUrl.pathname; // e.g. "/272a020ca2a1800ca9fad0ac575bbba3"
    const id = path.split("/").pop(); // take last part
    if (id && /^[0-9a-f]{32}$/i.test(id)) {
      return id;
    }
    throw new Error("No valid Notion database ID found");
  } catch (e) {
    throw new Error("Invalid Notion Database URL");
  }
}
