'use client'
import React, { useState, useEffect } from 'react';
import processAudio from '../lib/processAudio';

// Replaced with a custom message state to avoid using alert().
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

export default function AudioUploadDialog({ isUploadingAudio, setIsUploadingAudio, userId, setCardsData, setIsDrawerOpen }) {
  const [audioFile, setAudioFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useMessage();

  // console.log(audioFile)
  // Handle audio file selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setMessage('Please upload an audio file!');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Audio file must be less than 5MB');
      return;
    }

    setAudioFile(file);
    setUploadProgress(0); // Reset upload progress
    setMessage('');

    // Simulate upload progress effect
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress > 100 ? 100 : progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const handleCancel = () => {
    setIsUploadingAudio(false);
    setAudioFile(null);
    setUploadProgress(0);
    setMessage('');
  };

  const handleUploadAudio = async (audioFile) => {
        setIsDrawerOpen(false);
        if (!(audioFile instanceof File)) {
            console.error("Invalid file type:", audioFile);
            return;
        }

        try {
            // Pass the File directly (no slice needed)
            const loaderCard = { id: "pending", pending: true };
            setCardsData((prev) => [loaderCard, ...prev]);

            const newCard = await processAudio(audioFile, userId, "audio" );

            if (newCard) {
            // setCardsData((prev) => [newCard, ...prev]);
            setCardsData((prev) => {
                // Remove the pending card if it exists
                const withoutPending = prev.filter(card => card.id !== "pending");
                // Insert the new card at the top if fetch succeeded
                return newCard ? [newCard, ...withoutPending] : withoutPending;
            });
            } else {
              console.error("Error: newCard is undefined or invalid");
              alert("Something went wrong");
              setCardsData(prev => prev.filter(c => c.id !== "pending"));
            }
        } catch (err) {
          console.error("Upload error:", err);
          alert("Something went wrong");
          setCardsData(prev => prev.filter(c => c.id !== "pending"));
        }
        setAudioFile(null);
    };

  
  const handleSummarize = (audioFile) => {
    // Your summarize logic here
    handleUploadAudio(audioFile)
    setMessage('Summarize button clicked!');
    setIsUploadingAudio(false);
    // Example: call API to summarize the audio file
  }

  if (!isUploadingAudio) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-999 p-4">
      <div className="bg-white rounded-2xl lg:rounded-full shadow-xl p-6 w-full max-w-4xl">
        {/* Main Content Container */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-2">

          {/* Upload Button Section */}
          <div className="flex justify-center lg:w-auto w-full">
            <button
              onClick={handleCancel}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm text-sm lg:text-base"
              title="Cancel Upload"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              <span>Cancel</span>
            </button>
            <label
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm text-sm lg:text-base ml-2 cursor-pointer"
            >
              <input
                type="file"
                accept="audio/*"
                hidden
                onChange={handleFileChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span>Upload Audio</span>
            </label>
          </div>

          {/* Progress Bar and Message Section */}
          <div className="flex flex-col items-center gap-2 lg:flex-row lg:flex-grow lg:mx-6 mx-8">
            <div className="flex-grow w-full">
              <div className="font-semibold text-sm mb-2 text-gray-700 text-center">
                {audioFile ? `Uploaded: ${audioFile.name}` : 'Awaiting File'}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-orange-500 h-4 transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="text-sm text-gray-500 mt-2 text-center">{uploadProgress}%</div>
            </div>
            {message && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm text-red-500 font-semibold">{message}</div>
            )}
          </div>

          {/* Summarize Button Section */}
          <div className="flex justify-center lg:w-auto w-full">
            <button
              onClick={() =>handleSummarize(audioFile)}
              disabled={uploadProgress < 100 || !audioFile}
              className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-full text-white transition-colors shadow-sm text-sm lg:text-base ${uploadProgress < 100 || !audioFile ? 'bg-gray-400 cursor-none' : 'bg-gray-800 hover:bg-gray-900 cursor-pointer'}`}
              title="Summarize Audio"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span>Summarize</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
