import React, { useState } from "react";
import Image from "next/image"; // Assuming Next.js for Image component
import { FaWhatsapp } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import { TbCopyCheckFilled } from "react-icons/tb";




export default function NoteShareDialog({ noteId, isOpen, onClose }) {
  const [shareLink, setShareLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!isOpen) {
    return null;
  }

  const generateShareLink = async () => {
    setLoading(true);
    try {
        const res = await fetch(`/api/notes/${noteId}/share`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ /* optionally send expiresAt */ }),
        });
        const data = await res.json();
        if (res.ok && data.shareToken) {
            const url = `${frontendUrl}/share/${data.shareToken}`;
            setShareLink(url);
        } else {
            alert("Failed to generate share link: " + (data.error || "Unknown error"));
        }
        } catch (error) {
        alert("Error generating share link: " + error.message);
        }
        setLoading(false);
    };

    const unpublishShareLink = async () => {
    setLoading(true);
    try {
        const res = await fetch(`/api/notes/${noteId}/share`, {
        method: "DELETE",
        });
        const data = await res.json();
        if (res.ok && data.success) {
        setShareLink(null);
        } else {
        alert("Failed to unpublish share link: " + (data.error || "Unknown error"));
        }
        } catch (error) {
            alert("Error unpublishing share link: " + error.message);
        }
        setLoading(false);
    };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied" message after 2s
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-90 flex items-stretch lg:items-center justify-center
        bg-black/50
      "
      role="dialog"
      aria-modal="true"
    >
      <div
        className="
          relative flex flex-col
          w-screen h-screen
          max-w-none max-h-none
          bg-white rounded-none
          p-6 sm:p-8
          lg:w-[600px] lg:h-[450px]
          lg:max-w-[600px] lg:max-h-[450px]
          lg:rounded-2xl
          shadow-2xl
          pt-[max(env(safe-area-inset-top),12px)]
          pb-[max(env(safe-area-inset-bottom),12px)]
        "
      >
        {/* Close Button */}
        <button
            onClick={(e) => {
                e.stopPropagation(); // prevent click bubbling to parent card
                onClose();           // your actual close logic
            }}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Dialog Content */}
         <div className="flex flex-col items-start justify-center lg:justify-between h-full text-start">
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-2">Share & Publish your Note</h2>
      <p className="text-gray-500 mb-6">Share this note with your friends</p>
    </div>

    {/* Conditionally render the link text box */}
    {shareLink && (
      <div className="relative w-full mb-4">
        <input
          type="text"
          readOnly
          value={shareLink}
          className="w-full pl-4 pr-16 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-red-500 transition-colors"
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent click bubbling to parent card
            copyLinkToClipboard();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-white px-3 py-1 rounded-md bg-gray-500 hover:bg-gray-700 transition-colors"
        >
          {isCopied ? <TbCopyCheckFilled className="w-4 h-8" /> : <MdContentCopy className="w-4 h-8" />}
        </button>
      </div>
    )}

    <button
      disabled={loading}
      onClick={(e) => {
        e.stopPropagation(); // prevent click bubbling to parent card
        if (shareLink) {
        unpublishShareLink();
        } else {
        generateShareLink();
        }
      }}
      className={`w-full text-white font-medium py-3 px-6 rounded-full mb-6
         ${shareLink ? "bg-gray-500": "bg-red-500" }
        hover:from-red-500 hover:to-red-500 focus:outline-none transition-all duration-300`}
      
    >
      {loading ? (shareLink ? "Unpublishing..." : "Generating...") : (shareLink ? "Unpublish" : "Publish Note")}
    </button>
    <div className="flex justify-center gap-8">
      <div className="flex flex-col items-center">
        <div className="p-3 bg-green-500 text-white rounded-lg mb-1">
          <FaWhatsapp className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-gray-800 ">Whatsapp</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-3 bg-gray-400 text-white rounded-lg mb-1">
          <FiMessageSquare className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-gray-800">Message</span>
      </div>
    </div>
  </div>
      </div>
    </div>
  );
}