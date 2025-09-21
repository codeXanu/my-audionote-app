import React from 'react';

const DisconnectDialog = ({ userName, onClose, onDisconnect }) => {
    
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
        <div className="flex flex-col items-center justify-center h-full px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hello {userName}!
          </h2>
          <p className="text-gray-600 font-medium mb-6">
            Do you want to Disconnect the Notion with QuickAudioNote?
          </p>
          <div className="flex gap-4 mt-auto">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onDisconnect}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisconnectDialog;