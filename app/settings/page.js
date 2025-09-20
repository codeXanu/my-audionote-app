// "use client";

// import { useState } from "react";
// import { extractDatabaseId } from "../utils/extractDatabaseId";
// import useStore from "../store/useStore";

// export default function SettingsPage() {
//   const [dbUrl, setDbUrl] = useState("");
//   const [saved, setSaved] = useState(false);
//    const [saving, setSaving] = useState(false);
//     const [message, setMessage] = useState("");
//     const user = useStore((state) => state.user);
//     console.log( 'this is' ,  user)
    

//   const saveDatabase = async () => {

//       setMessage("");
//       try {
//         const id = extractDatabaseId(dbUrl);
//         setSaving(true);
//         const res = await fetch("/api/notion/save-database", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId: user.uid, databaseId: id }),
//         });
//         const json = await res.json();
//         if (json.ok) {
//           setMessage("✅ Database saved! Your notes will sync to this Notion DB.");
//           setSaved(true)
//         } else {
//           setMessage("❌ Failed to save DB: " + (json.error || "unknown"));
//         }
//       } catch (err) {
//         console.error("Error fetching note by ID:", err);
//         throw err; 
//         setMessage("Invalid Notion DB URL. Please check and paste again." , err);
//       } finally {
//         setSaving(false);
//       }
//     };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Settings</h1>

//       <p className="mb-2">✅ Notion connected successfully!</p>

//       <label className="block mb-2 font-medium">Paste your Notion Database URL:</label>
//       <input
//         type="text"
//         className="border p-2 rounded w-full"
//         value={dbUrl}
//         onChange={(e) => setDbUrl(e.target.value)}
//         placeholder="https://www.notion.so/..."
//       />
//       <button
//         onClick={saveDatabase}
//         className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Save Database
//       </button>

//       {saved && <p className="mt-3 text-green-600">✅ Database saved!</p>}
//       {message && <p className="mt-3 text-sm">{message}</p>}
//     </div>
//   );
// }

