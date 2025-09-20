"use client";
import { useState } from "react";
import { extractDatabaseId } from "../utils/extractDatabaseId";

export default function ConnectNotionModal({ userId, onClose }) {
    console.log('this is user from anuj', userId )
  const [dbUrl, setDbUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const startOAuth = () => {
    // Call backend to redirect to Notion OAuth.
    // We include userId as header for mapping (replace with your auth method)
    // Simpler: open /api/notion/oauth which uses state from header/query if you set it.
    // For fetch redirect, we can just navigate:
    // Append state param with userId as fallback:
    const url = `/api/notion/oauth?state=${encodeURIComponent(userId)}`;
    window.location.href = url;
  };

  const saveDatabase = async () => {
    setMessage("");
    try {
      const id = extractDatabaseId(dbUrl);
      setSaving(true);
      const res = await fetch("/api/notion/save-database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, databaseId: id }),
      });
      const json = await res.json();
      if (json.ok) {
        setMessage("✅ Database saved! Your notes will sync to this Notion DB.");
      } else {
        setMessage("❌ Failed to save DB: " + (json.error || "unknown"));
      }
    } catch (err) {
      setMessage("Invalid Notion DB URL. Please check and paste again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
  className="
    fixed inset-0 z-90 flex items-stretch lg:items-center justify-center
    bg-black/50
  "
  role="dialog"
>
  <div
    className="
      relative flex flex-col
      w-screen h-screen
      max-w-none max-h-none
      bg-white rounded-none
      lg:w-[1000px] lg:h-[630px]
      lg:max-w-[1000px] lg:max-h-[630px]
      lg:rounded-2xl
      shadow-2xl
      overscroll-contain
      p-6
      lg:p-8
    "
  >
    <div className="flex justify-end">
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div className="flex flex-col items-center flex-grow justify-center mb-2">
      <h1 className="text-3xl lg:text-3xl font-semibold text-gray-800 text-center mb-8 underline">
        Connect Notion to "Quick Audio Note"
        
      </h1>
      <div className="text-sm lg:text-base text-gray-600 max-w-lg mb-6">
        <ol className="list-decimal list-inside" >
          <li className="mb-2" >Create a Database in your Notion workspace (not in private space).</li>
          <li className="mb-2" >Add columns: Title, Summary, Transcript, CreatedAt.</li>
          <li className="mb-2 " > <a href="" className="text-blue-600 hover:text-blue-800 underline decoration-dotted decoration-2">See complete detailed hints🔗</a> </li>
          <li className="mb-2" >Click "Connect" → you’ll be redirected to the Notion Authorization page, allow access to your created databse.</li>
          <li className="mb-2" >you will be redirected to Quick Audio Note's "notion-integration" page.</li>
          <li>Go In Notion, select your database → Share → copy link → paste into the input box on the integration page → Submit.</li>
        </ol>
        
      </div>
    </div>
    
    <div className="flex justify-center gap-12 mb-25">
      <button onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
        Cancel
      </button>
      <button onClick={startOAuth} className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900">
        Connect with Notion
      </button>
    </div>

    {/* {message && <p className="mt-4 text-sm text-center">{message}</p>} */}
  </div>
</div>
  );
}
