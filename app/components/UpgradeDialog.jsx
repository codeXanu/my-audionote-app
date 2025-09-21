import React from 'react';
import { IoCloseOutline } from 'react-icons/io5'; // You'll need to install react-icons
import { FaMicrophoneAlt } from "react-icons/fa";
import NotAvailableDialog from './NotAvailableDialog';

const UpgradeDialog = ({ onClose }) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
  return (

    <div
      className="fixed inset-0 z-80 flex items-stretch lg:items-center justify-center bg-black/50"
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
          lg:w-[600px] lg:h-auto
          lg:max-w-[600px] lg:max-h-[80vh]
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

        {/* Dialog Header */}
        <div className="flex flex-col items-center justify-center font-medium text-center pt-4 pb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-3xl mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center">
              <FaMicrophoneAlt className="h-5 w-5 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Image upload is a premium feature
          </h2>
          <p className="text-gray-600 text-sm">
            To upload an image, upgrade plan to Pro
          </p>
        </div>

        {/* Features List */}
        <ul className="flex flex-col bg-gray-100 text-gray-600 rounded-xl font-medium space-y-3 py-6 px-4">
          <li className="flex items-center ">
            <svg
              className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Best for Meetings & Lectures
          </li>
          <li className="flex items-center ">
            <svg
              className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Unlimited Notes (Voice, Text, Uploads, Images)
          </li>
          <li className="flex items-center ">
            <svg
              className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            YouTube Notes
          </li>
          <li className="flex items-center ">
            <svg
              className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Mindmap
          </li>
          
          <li className="flex items-center ">
            <svg
              className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Chat with a Note
          </li>
          
        </ul>

        {/* Upgrade Button */}
        <div className="p-4 sm:p-6 mt-auto">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-full px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>

       {isDialogOpen && <NotAvailableDialog onClose={handleCloseDialog} />}
    </div>
  );
};

export default UpgradeDialog;