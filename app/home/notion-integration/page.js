"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { extractDatabaseId } from "@/app/utils/extractDatabaseId";
import useStore from "../../store/useStore";
import { auth } from "@/app/lib/firebase";

import { FaMicrophoneAlt } from "react-icons/fa";

export default function SettingsPage() {
    const { user }= useStore.getState();

  const [dbUrl, setDbUrl] = useState("");
  const [saved, setSaved] = useState(false);
   const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();
    const [ usera, setUsera ] = useState(null)
    
    console.log( 'this is settings page user' ,  user)
    useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) {
        setUsera(u);  
        
      } else {
        router.replace("/login"); // redirect if not logged in
      }
    });
    return () => unsub();
  }, [router]);
    

  const saveDatabase = async () => {

      setMessage("");
      try {
        const id = extractDatabaseId(dbUrl);
        setSaving(true);
        const res = await fetch("/api/notion/save-database", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: usera.uid, databaseId: id }),
        });
        const json = await res.json();
        if (json.ok) {
          setMessage("✅ Database saved! Your notes will sync to this Notion DB.");
          setSaved(true)
          setTimeout(() => {
            router.push("/home"); // redirect after success
          }, 1000); // small delay so user sees message
        } else {
          setMessage("❌ Failed to save DB: " + (json.error || "unknown"));
        }
      } catch (err) {
        console.error("error in saving", err);
        setMessage("⚠️ Invalid Notion DB URL. Please check and paste again.");
        throw err; 
      } finally {
        setSaving(false);
      }
    };

  return (
    <>
    <header>
      <div className="mx-auto flex max-full items-center justify-center p-6 lg:px-8" >
        <div className="flex items-center gap-3">
                {/* Mic inside red circle */}
                <div className="p-2 bg-[#FF3500] rounded-2xl flex items-center justify-center">
                    <FaMicrophoneAlt className="h-5 w-5 text-white" />
                </div>

                {/* Text */}
                <span className="text-lg font-semibold text-gray-900">
                    MyAudionotes
                </span>
          </div>
      </div>
    </header>
     <div className="min-h-screen  px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Connect Your Notion Databse</h1>

        {/* Notion Connection Card */}
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">

            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                Open your <span className="font-medium">Notion</span> workspace.
              </li>
              <li>
                Select the <span className="font-semibold">database you created earlier</span> 
                for saving notes.  
                (Make sure it has the columns:{" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">Title</span>,{" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">Summary</span>,{" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">Transcript</span>,{" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">CreatedAt</span>)
              </li>
              <li>
                On the <span className="font-semibold">top-right corner</span> of the database,
                click the <span className="font-semibold">Share</span> button.
              </li>
              <li>
                Copy the <span className="font-medium">sharing link</span> provided there.
              </li>
              <li>
                Paste the copied URL in the {" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                 input box 
                </span>{" "}
                below and click{" "}
                <span className="font-semibold text-red-500">Save Database</span>.
              </li>
              <li>
                Need more help? 👉{" "}
                <a
                  href="https://your-hint-page-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  See full detailed hint
                </a>
              </li>
            </ol>

            <p className="mt-5 text-sm text-red-400">
              Once submitted, Quick Audio Note will be connected Notion database 🎉
            </p>

          {/* Input */}
          <label className="block text-xl font-medium text-gray-700 mb-1">
            Paste your Notion Database URL here --
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-4 focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={dbUrl}
            onChange={(e) => setDbUrl(e.target.value)}
            placeholder="https://www.notion.so/....."
            required
          />

          {/* Save Button */}
          <button
            onClick={() => {
              if (!dbUrl.trim()) {
                alert("⚠️ Please paste your Notion Database URL before saving.");
                return;
              }
              saveDatabase();
            }}
            disabled={saving }
            className="mt-4 w-full sm:w-auto px-5 py-2.5 bg-gray-600 text-white rounded-lg font-medium shadow hover:bg-red-400 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Database"}
          </button>

          {/* Status Message */}
          {message && (
            <p
              className={`mt-3 text-sm ${
                saved ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
    </>
    // <div className="p-6 max-w-xl mx-auto">
    //   <h1 className="text-2xl font-bold mb-4">Settings</h1>

    //   <p className="mb-2">✅ Notion connected successfully!</p>

    //   <label className="block mb-2 font-medium">Paste your Notion Database URL:</label>
    //   <input
    //     type="text"
    //     className="border p-2 rounded w-full"
    //     value={dbUrl}
    //     onChange={(e) => setDbUrl(e.target.value)}
    //     placeholder="https://www.notion.so/..."
    //   />
    //   <button
    //     onClick={saveDatabase}
    //     className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
    //   >
    //     Save Database
    //   </button>

    //   {saved && <p className="mt-3 text-green-600">✅ Database saved!</p>}
    //   {message && <p className="mt-3 text-sm">{message}</p>}

    // </div>
  );
}

