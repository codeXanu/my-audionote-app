'use client'
import React, { useState, useEffect } from 'react';
import processText from '../lib/processText';

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

/**
 * A placeholder function to simulate the PDF processing.
 * It reads the PDF file, extracts and trims the text to 1000 words,
 * and then simulates an API call to process the data.
 * @param {File} pdfFile The PDF file to process.
 * @param {string} userId The current user's ID.
 * @returns {Promise<object>} A promise that resolves with a new card object.
 */
const extractPdfText = async (pdfFile) => {
  if (!(pdfFile instanceof File)) {
    console.error("Invalid file type provided to extractPdfText:", pdfFile);
    return null;
  }

  // Ensure pdf.js library is available globally after script load.
  if (typeof window.pdfjsLib === 'undefined') {
    console.error("pdf.js library not loaded.");
    return null;
  }

  try {
    // Read the file as an array buffer.
    const arrayBuffer = await pdfFile.arrayBuffer();

    // Load the PDF document from the array buffer.
    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';
    // Iterate over each page to extract text.
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + ' ';
    }
    
    return fullText;

  } catch (error) {
    console.error("Error processing PDF:", error);
    return null;
  }
};

export default function PdfHandleDialog({ isUploadingPdf, setIsUploadingPdf, userId, setCardsData, setIsDrawerOpen }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useMessage();
  const [isPdfJsLoaded, setIsPdfJsLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the pdf.js library from a reliable CDN.
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs';
    script.type = 'module';
    script.onload = () => {
      // Set the worker URL after the library is loaded.
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs';
      setIsPdfJsLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load pdf.js library.');
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts.
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  // Handle PDF file selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMessage('Please upload a PDF file!');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setMessage('PDF file must be less than 20MB');
      return;
    }

    setPdfFile(file);
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
    setIsUploadingPdf(false);
    setPdfFile(null);
    setUploadProgress(0);
    setMessage('');
  };

  const handleSummarizePdf = async (file) => {
    setIsDrawerOpen(false);
    setIsUploadingPdf(false);

    if (!isPdfJsLoaded) {
      setMessage('Library is still loading. Please wait a moment.');
      return;
    }
    
    if (!(file instanceof File)) {
      console.error("Invalid file type:", file);
      return;
    }

    try {
      const loaderCard = { id: 'pending', pending: true };
      setCardsData((prev) => [loaderCard, ...prev]);

      const extractedText = await extractPdfText(file);

      // Trim to 1000 words max
      const trimmedWords = extractedText.split(/\s+/).slice(0, 1000).join(' ');
      console.log("this is  trimmed text", trimmedWords);

      const newCard = await processText(trimmedWords, userId, "pdf");

      if (newCard) {
        setCardsData((prev) => {
          const withoutPending = prev.filter((c) => c.id !== 'pending');
          return [newCard, ...withoutPending];
        });
      } else {
        console.error('Error: newCard is invalid');
      }
    } catch (err) {
      console.error('PDF processing error:', err);
      setMessage('Failed to process PDF');
    }
    setPdfFile(null);
  };

  if (!isUploadingPdf) return null;

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
            Upload your PDF
          </h1>
          {/* Middle Section: Instructions */}
          <div className="text-sm lg:text-base text-gray-600 max-w-lg mb-6 text-center">
            <p className="mb-4">Please follow these instructions to upload your file successfully:</p>
            <ol className="list-decimal list-inside text-left">
              <li className="mb-2">Choose a PDF file that is less than 20 MB.</li>
              <li className="mb-2">The text extracted from the PDF should be less than 1000 words. More than 1000 words will be trimmed. </li>
              <li className="mb-2">The total word limit that you can use is 5000 words.</li>
            </ol>
          </div>

          {/* Progress Bar & Message Section */}
          <div className="flex flex-col items-center w-full max-w-lg mb-4">
            <div className="flex-grow w-full">
              <div className="font-semibold text-sm mb-2 text-gray-700 text-center">
                {pdfFile ? `Uploaded: ${pdfFile.name}` : 'Awaiting File'}
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
          <label className="flex items-center justify-center space-x-2 px-6 py-2 rounded-full border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm cursor-pointer">
            <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span>Upload PDF</span>
          </label>
          <button
            onClick={() => handleSummarizePdf(pdfFile)}
            disabled={uploadProgress < 100 || !pdfFile || !isPdfJsLoaded}
            className={`px-6 py-2 rounded-full text-white transition-colors shadow-sm ${uploadProgress < 100 || !pdfFile || !isPdfJsLoaded ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900 cursor-pointer'}`}
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block mr-2"></div>
            <span>Summarize</span>
          </button>
        </div>
      </div>
    </div>
  );
}
