'use client'
import React, { useState, useEffect } from 'react';
import { fetchAudioBlob } from '../lib/fetchAudioBlob';
import processAudio from '../lib/processAudio';

// Custom hook to handle temporary messages, avoiding the use of alert().
const useMessage = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return [message, setMessage];
};

export default function YtHandleDialog({ isUploadingYt, setIsUploadingYt, userId, setCardsData, setIsDrawerOpen }) {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useMessage();

  

  const handleSummarizeYt = async () => {
    setIsProcessing(true);
    setMessage('');

    if (!youtubeLink) {
      setMessage("Please paste a YouTube link.");
      setIsProcessing(false);
      return;
    }
    console.log('link', youtubeLink);

    try {
      const loaderCard = { id: 'pending', pending: true };
      setCardsData(prev => [loaderCard, ...prev]);

      
      
      const audioBlob = await fetchAudioBlob(youtubeLink);
      console.log('bloooob', audioBlob);
    
      const newCard = await processAudio(audioBlob, userId);

      if (newCard) {
        setCardsData(prev => {
          const withoutPending = prev.filter(c => c.id !== 'pending');
          return [newCard, ...withoutPending];
        });
        setIsUploadingYt(false);
        setIsDrawerOpen(false);
      } else {
        console.error('Error: newCard is invalid');
        setMessage('Failed to process video.');
      }

    } catch (err) {
      console.error('YouTube processing error:', err);
      setMessage(`An error occurred: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setYoutubeLink('');
    }
  };

  const handleCancel = () => {
    setIsUploadingYt(false);
    setYoutubeLink('');
    setIsProcessing(false);
    setMessage('');
  };

  if (!isUploadingYt) return null;

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
        <div className="flex justify-end">
          <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
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

        <div className="flex flex-col items-center flex-grow font-medium justify-center">
          {/* Top Section: Title */}
          <h1 className="text-3xl lg:text-3xl font-semibold text-gray-800 text-center mb-8 underline">
            Paste your YouTube Link
          </h1>
          {/* Middle Section: Instructions */}
          <div className="text-sm lg:text-base text-gray-600 max-w-lg mb-6 text-center">
            <p className="mb-4">Please follow these instructions to get started:</p>
            <ol className="list-decimal list-inside text-left">
              <li className="mb-2">Choose a video link that is within the 10-minute limit.</li>
              <li className="mb-2">You have a total of 50 minutes of YouTube content you can process with this free plan.</li>
              <li className="mb-2">The video transcript will be trimmed to 1000 words before being summarized.</li>
            </ol>
          </div>

          {/* Input & Message Section */}
          <div className="flex flex-col items-center w-full max-w-lg mb-4">
            <input
              type="url"
              placeholder="Paste your YouTube link here..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />
            {isProcessing && (
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                <div className="bg-red-500 h-4 w-full animate-pulse" />
              </div>
            )}
            {message && (
              <div className="mt-2 text-sm text-center text-red-500 font-semibold">{message}</div>
            )}
          </div>
        </div>
        
        {/* Bottom Section: Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 lg:gap-12 mt-auto">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSummarizeYt}
            disabled={isProcessing || !youtubeLink}
            className={`px-6 py-2 rounded-full text-white transition-colors shadow-sm ${isProcessing || !youtubeLink ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900 cursor-pointer'}`}
          >
            {isProcessing ? (
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block mr-2"></div>
            ) : null}
            <span>Summarize</span>
          </button>
        </div>
      </div>
    </div>
  );
}