// "use client";
// import { useState } from "react";

// export default function SaveNoteToNotion({ userId }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [status, setStatus] = useState("");

//   const save = async () => {
//     setStatus("Saving...");
//     const res = await fetch("/api/notion/save-note", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, title, content }),
//     });
//     const data = await res.json();
//     if (data.ok) setStatus("Saved to Notion ✅");
//     else setStatus("Failed: " + (data.error || "unknown"));
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow max-w-md">
//       <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full mb-2 border p-2 rounded" />
//       <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="w-full mb-2 border p-2 rounded" />
//       <div className="flex gap-2">
//         <button onClick={save} className="px-3 py-2 bg-green-600 text-white rounded">Save to Notion</button>
//       </div>
//       {status && <p className="mt-2 text-sm">{status}</p>}
//     </div>
//   );
// }
