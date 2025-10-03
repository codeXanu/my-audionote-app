"use client";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../lib/firebase";

export default function ZapierDialog({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleZapierConnect = async () => {
    if (!user) return alert("Please log in first");
    setIsLoading(true);

    const idToken = await user.getIdToken();

    // Call your backend to generate a session key
    const res = await fetch("/api/session/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    if (!data.sessionKey) return alert("Failed to create session");

    // Zapier OAuth redirect info
    const redirectUri = "https://zapier.com/dashboard/auth/oauth/return/App231332CLIAPI/";
    const state = "zapier-test-state"; // optional, Zapier usually provides it dynamically
    const clientId = process.env.NEXT_PUBLIC_ZAPIER_CLIENT_ID; // your Zapier Client ID

    // Build authorize URL with required query params
    const url = `/api/auth/authorize?redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${encodeURIComponent(state)}&client_id=${encodeURIComponent(clientId)}&session_key=${encodeURIComponent(data.sessionKey)}`;

    window.location.href = url;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-90 flex items-stretch lg:items-center justify-center bg-black/50"
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
        {/* Close Button */}
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

        {/* Main Content */}
        <div className="flex flex-col items-center flex-grow justify-center mb-2">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8 underline">
            Connect Zapier to "Quick Audio Note"
          </h1>

          <div className="text-sm lg:text-base text-gray-600 max-w-lg mb-6">
            <ol className="list-decimal list-inside">
              <li className="mb-2">Click the "Connect with Zapier" button.</li>
              <li className="mb-2">Authorize Quick Audio Note to work with your Zapier account.</li>
              <li className="mb-2">Once connected, you can automate sending your audio notes to 5000+ apps.</li>
            </ol>
          </div>

          {user ? (
            <p className="text-gray-700 mb-4">Logged in as <b>{user.email}</b></p>
          ) : (
            <p className="text-red-500 mb-4">Please log in to continue</p>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-6 lg:gap-12 mb-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleZapierConnect}
            disabled={isLoading || !user}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Connecting..." : "Connect with Zapier"}
          </button>
        </div>
      </div>
    </div>
  );
}

