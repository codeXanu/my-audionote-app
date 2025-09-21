import React from 'react';
import { IoCloseOutline } from 'react-icons/io5'; // Make sure you have react-icons installed

const NotAvailableDialog = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-90 flex items-stretch lg:items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="
          relative flex flex-col
          w-screen h-screen
          max-w-none max-h-none
          bg-white rounded-none
          p-6 sm:p-8
          lg:w-[600px] lg:h-auto lg:max-w-[600px] lg:max-h-[80vh]
          lg:rounded-2xl
          shadow-2xl
          pt-[max(env(safe-area-inset-top),12px)]
          pb-[max(env(safe-area-inset-bottom),12px)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-1"
          aria-label="Close dialog"
        >
          <IoCloseOutline size={24} />
        </button>

        {/* Dialog Content */}
        <div className="flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.28 17.58l9.16-15.9a1 1 0 011.72 0l9.16 15.9a1 1 0 01-.86 1.5H3.14a1 1 0 01-.86-1.5zM12 17.5a.5.5 0 00-.5.5v1a.5.5 0 001 0v-1a.5.5 0 00-.5-.5zM12 9a.5.5 0 00-.5.5v5a.5.5 0 001 0v-5a.5.5 0 00-.5-.5z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Service not available
          </h2>
          <p className="text-gray-600 mb-6">
            This service is currently unavailable. Please check back later.
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotAvailableDialog;