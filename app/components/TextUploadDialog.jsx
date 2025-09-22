import React from "react";
import useStore from "../store/useStore";

import { Editor } from 'primereact/editor';
import processText from "../lib/processText";

        
const getPlainText = html =>
  html ? (new DOMParser().parseFromString(html, 'text/html')).body.textContent || "" : "";


export default function TextUploadDialog () {
    const { isTextEditerOpen, setIsTextEditerOpen } = useStore();
    const { text, setText, setCardsData, userId } = useStore();
    
    

    const plainText = getPlainText(text || "");
    console.log(plainText)
    const textLength = plainText.length;
    const maxLimit = 3000;
    const minLimit = 15;

    const isTextValid = textLength >= minLimit && textLength <= maxLimit;
    const editorHeight = window.innerWidth < 1024 ? '280px' : '420px'; // reduce on mobile


    const handleSummariseText = async () => {
        setIsTextEditerOpen(false);
        const loaderCard = { id: "pending", pending: true };
        setCardsData((prev) =>{
        console.log('prev cardsData before update:', prev);
        return [loaderCard, ...prev]});

        const newCard = await processText(plainText, userId)
        console.log('this is new card' , newCard)
        
        if (newCard) {
        // setCardsData((prev) => [newCard, ...prev]);
        setCardsData((prev) => {
            // Remove the pending card if it exists
            const withoutPending = prev.filter(card => card.id !== "pending");
            // Insert the new card at the top if fetch succeeded
            return newCard ? [newCard, ...withoutPending] : withoutPending;
        });
        }else {
        console.error("Error: newCard is undefined or invalid");
        // or show it in UI:
        // setError("Failed to add new card. Please try again.");
        }

    }

    


    if( !isTextEditerOpen ) return null ;

    return (

        <div className="fixed inset-0 z-90 flex items-stretch lg:items-center justify-center bg-black/50"
            role="dialog"
            aria-modal="true" >
            <div className="
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
            ">

                {/* Top Header: left "Create Text", right count */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
                    <span className="font-semibold text-lg">Create Text</span>
                    <span className={`text-sm font-medium text-gray-600`}>
                        <span className={`text-sm font-medium ${!isTextValid ? "text-red-600" : "text-gray-600"}`} >{textLength} </span> / {maxLimit}
                    </span>
                </div>

                {/* Editor */}
                <div className="flex-1 overflow-auto p-4 pt-2" >
                    <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: editorHeight }} />
                </div>

                {/* Bottom row: left close, right summarise */}
                <div className="flex items-center justify-between px-6 py-2 gap-10 ">
                    <button
                        type="button"
                        onClick={() => setIsTextEditerOpen(false)}
                        className="w-1/2 px-4 py-2 rounded-full font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                        Close
                    </button>

                    <button
                        type="button"
                        className={`w-1/2 px-4 py-2 rounded-full font-medium text-white bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400`}
                        disabled={!isTextValid}
                        title={!isTextValid ? "Text must be 15-3000 chars" : "Summarise"}
                        onClick={() => {
                            handleSummariseText();
                            setText("");
                        }}
                    >
                        Summarise
                    </button>
                </div>

                

            </div>
        </div>
    )
}