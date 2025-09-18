'use client'
import React from "react";
import AudioBar from "./AudioBar";
import { useState, useMemo } from "react";
import { FiCopy } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { FiShare2 } from "react-icons/fi";
import useStore from "../store/useStore";
import NoteShareDialog from "./NoteShareDialog";



const ACTIONS = [
  { label: "AI Notes" },
  { label: "Transcript" },
  { label: "Create" },
  { label: "Speaker Transcript" },
];

export default function CardDialouge({ isOpen, onClose, selectedCard, setIsDailougeOpen }) {
  if (!isOpen || !selectedCard) return null;
  const [copied, setCopied] = useState(false);

  const {isShareModelOpen, setIsShareModelOpen} = useStore.getState();

  const handleCopy = () => {
    navigator.clipboard.writeText(renderContent() || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  const TABS = useMemo(
    () => [
      { key: "notes", label: "AI Notes" },
      { key: "transcript", label: "Transcript" },
      { key: "create", label: "Create" },
      { key: "speaker", label: "Speaker Transcript" },
    ],
    []
  );
  const [active, setActive] = useState("notes");

  const renderContent = () => {
    switch (active) {
      case "notes":
        return selectedCard?.content || ""; // show selectedCard.Content [10]
      case "transcript":
        return selectedCard?.transcript || "";
      case "create":
        return "Create panel goes here.";
      case "speaker":
        return selectedCard?.speakerTranscript || "No speaker transcript.";
      default:
        return "";
    }
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
      {/* Dialog panel: full-screen on <lg, framed box on lg+ */}
      <div
        className="
          relative flex flex-col
          w-screen h-screen           /* mobile: occupy full screen */
          max-w-none max-h-none
          bg-white rounded-none
          p-0
          lg:w-[1000px] lg:h-[630px] /* desktop size */
          lg:max-w-[1000px] lg:max-h-[630px]
          lg:rounded-2xl
          shadow-2xl
          overscroll-contain
          pt-[max(env(safe-area-inset-top),12px)]
          pb-[max(env(safe-area-inset-bottom),12px)]
        "
      >
        {/* Top Row */}
        <div
          className="
            flex items-center justify-between
            px-4 pt-3 pb-1
            sm:px-6
            lg:px-8 lg:pt-7 lg:pb-2
          "
        >
          <div>
            <div
              className="
                font-medium leading-tight
                text-base sm:text-lg
                lg:text-xl
                mb-0.5 lg:mb-1
                line-clamp-1
              "
              title={selectedCard.title}
            >
              {selectedCard.title}
            </div>
            <div className="text-gray-500 text-xs sm:text-sm font-medium">{selectedCard.date}</div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="
                p-2 rounded-full hover:bg-gray-100
                sm:p-2.5
              "
              title="Share"
              onClick={() => setIsShareModelOpen(true)}
            >
              <FiShare2 className="w-5 h-5 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => { onClose?.(); setIsDailougeOpen?.(false); }}
              className="p-2 rounded-full hover:bg-gray-100 sm:p-2.5"
              title="Close"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Audio Row */}
        {selectedCard.type && selectedCard.type.startsWith("audio/") && selectedCard.audioUrl && (
          <div className="px-3 py-2 sm:px-4 sm:py-3">
            <AudioBar
              src={selectedCard.audioUrl}
              filename="sample.mp3"
              className="w-full"
            />
          </div>
        )}

        {/* Action Row (pills) */}
        <div
          className="
            flex items-center
            px-2 sm:px-3 lg:px-2
            mt-1 sm:mt-2 mb-1 sm:mb-2
            p-1 gap-1.5 sm:gap-2
            bg-gray-100
            w-full sm:w-fit ml-0 sm:ml-4
            rounded-full
            overflow-x-auto no-scrollbar
          "
        >
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={
                  "px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ease-in-out " +
                  (isActive
                    ? "bg-white text-gray-900 shadow-sm"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200")
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1 px-3 sm:px-4 pt-1 pb-3 sm:pb-4 overflow-y-auto">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-700 text-sm sm:text-base font-medium whitespace-pre-line">
                {active === "notes"
                  ? "Notes"
                  : active === "transcript"
                  ? "Transcript"
                  : active === "create"
                  ? "Create"
                  : "Speaker Transcript"}
              </div>

              <button
                onClick={handleCopy}
                className="
                  flex items-center gap-1
                  px-3 py-1.5
                  rounded-full
                  text-xs sm:text-sm font-medium
                  border border-gray-300 text-gray-600
                  hover:bg-gray-100
                  transition-all duration-300
                "
              >
                {copied ? (
                  <span className="flex items-center">
                    <TiTick className="w-4 h-4" />
                    Copied
                  </span>
                ) : (
                  <>
                    <FiCopy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div
              key={active}
              className="text-gray-700 text-sm sm:text-base whitespace-pre-line animate-[fadeIn_.2s_ease-in] will-change-[opacity,transform]"
            >
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            h-12 sm:h-12
            m-2 sm:m-2
            bg-black flex items-center justify-center rounded-full
            sticky bottom-2
          "
        >
          <button className="text-white font-semibold text-base sm:text-lg">Ask AI</button>
        </div>

        {/* fade-in keyframes */}
        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
          .no-scrollbar::-webkit-scrollbar{ display: none; }
          .no-scrollbar{ -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>

          <NoteShareDialog
            noteId={selectedCard.id}
            isOpen={isShareModelOpen}
            onClose={() => setIsShareModelOpen(false)}
          />



    </div>





    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-2 overflow-hidden">
    //   <div className="w-full max-w-5xl lg:w-[1000px] lg:h-[630px] bg-white rounded-2xl shadow-2xl p-0 flex flex-col relative">
    //     {/* Top Row: Title, Date, Close, Share */}
    //     <div className="flex items-center justify-between px-8 pt-7 pb-2">
    //       <div>
    //         <div className="font-medium text-xl mb-1 leading-tight">
    //           {selectedCard.title}
    //           {/* <button> Edit</button> */}
    //         </div>
    //         <div className="text-gray-500 text-sm font-medium">{selectedCard.date}</div>
    //       </div>
    //       <div className="flex items-center space-x-2">
    //         {/* Share button */}
    //         <button
    //           className="p-2.5 rounded-full hover:bg-gray-100"
    //           title="Share"
    //         >
    //           <FiShare2 />
    //         </button>
    //         {/* Close button */}
    //         <button
    //           onClick={() => {
    //             onClose();           // trigger the onClose prop
    //             setIsDailougeOpen(false); // also set your dialog open state
    //           }}
    //           className="p-2.5 rounded-full hover:bg-gray-100"
    //           title="Close"
    //         >
    //           <svg
    //             className="w-5 h-5 text-gray-500"
    //             fill="none"
    //             stroke="currentColor"
    //             strokeWidth={2}
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M6 18L18 6M6 6l12 12"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>

    //     {/* Audio Row */}
    //     {selectedCard.type === "Audio" && selectedCard.audioUrl && (
    //       <div className="flex items-center px-4 py-3">
    //         <div className="w-full">
    //           <AudioBar
    //             src="https://www.kozco.com/tech/piano2-CoolEdit.mp3"
    //             filename="sample.mp3"
    //             className="mx-auto"
    //           />
    //         </div>
    //       </div>
    //     )}

    //     {/* Action Row */}
    //     <div className="flex items-center px-2 mt-2 mb-2 p-1 gap-2 bg-gray-100 w-fit ml-4 rounded-full">
    //       {TABS.map((t) => {
    //       const isActive = active === t.key;
    //       return (
    //         <button
    //           key={t.key}
    //           onClick={() => setActive(t.key)}
    //           className={
    //             "px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out " + // smooth transitions [12][9]
    //             (isActive
    //               ? "bg-white text-gray-900 shadow-sm"
    //               : "bg-gray-100 text-gray-900 hover:bg-gray-200")
    //           }
    //         >
    //           {t.label}
    //         </button>
    //       );
    //     })}
    //     </div>

    //     {/* Main Content */}
    //     <div className="flex-1 px-4 pt-1 pb-4 overflow-y-auto">
    //       <div className="bg-gray-50 rounded-lg p-4 h-full overflow-y-auto">
    //         <div className="flex items-center justify-between mb-2">
    //   <div className="text-gray-700 text-lg font-medium whitespace-pre-line">
    //     {active === "notes"
    //       ? "Notes"
    //       : active === "transcript"
    //       ? "Transcript"
    //       : active === "create"
    //       ? "Create"
    //       : "Speaker Transcript"}
    //   </div>

    //   <button
    //     onClick={handleCopy}
    //     className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-300"
    //   >
    //     {copied ? (
    //       <span className="flex items-center transition-all duration-300">
    //         <TiTick className="w-4 h-4" />
    //         Copied
    //       </span>
    //     ) : (
    //       <>
    //         <FiCopy className="w-4 h-4" />
    //         Copy
    //       </>
    //     )}
    //   </button>
    // </div>
            
    //         <div
    //           key={active}
    //           className="text-gray-700 text-sm whitespace-pre-line animate-[fadeIn_.2s_ease-in] will-change-[opacity,transform]"
    //         >
    //           {renderContent()}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Bottom Black Bar */}
    //     <div className="h-12 m-2 bg-black flex items-center justify-center rounded-full">
    //       <button className="text-white font-semibold text-lg">Ask AI</button>
    //     </div>
    //   </div>
    // </div>
  );
}
