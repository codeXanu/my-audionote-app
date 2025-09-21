import React from 'react';
import { MdOutlineWebhook } from "react-icons/md";

const ConnectSection = () => {
  return (
    <section className='flex flex-col min-h-screen gap-16' >
    <div className="flex flex-col text-center w-full p-2 mt-20">
          
          <h1 className="sm:text-3xl text-2xl font-bold text-gray-900 leading-loose">
                The <span className="text-red-500">Connected Notes</span> Experience
            </h1>
            <p className="mt-4 text-gray-500 text-lg font-medium text-pretty max-w-xl mx-auto">
                Enhance your workflow by seamlessly integrating QuickAudioNote with Notion for structured knowledge management, and with Zapier to unlock limitless automation possibilities.
            </p>
    </div>
    <div className="flex justify-center items-center p-2 mb-20">

        
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
            {/* Notion Card */}
            <div className="w-full sm:w-102 bg-white border-2 border-gray-200 rounded-xl p-6 flex flex-col items-center text-center">
                <h3 className="text-2xl font-medium text-gray-800 mb-4">Notion</h3>
                <p className="text-gray-500 font-medium mb-8">
                    Seamlessly sync your notes with Notion to keep everything in one place.
                </p>
                <div className="w-full h-50 flex items-center justify-center bg-gray-100 rounded-lg">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
                    alt="Notion Logo"
                    className="h-24 w-24"
                    />
                </div>
            </div>

            {/* Webhook Card */}
            <div className="w-full sm:w-102 bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-medium text-gray-900 mb-4">Webhook</h3>
            <p className="text-gray-500 font-medium mb-8">
                Transfer your notes from QuickAudioNote to the server/website using webhook
            </p>
            <div className="w-full h-50 flex items-center justify-center bg-gray-100 rounded-lg">
            <MdOutlineWebhook className='w-23 h-23 p-3 border-blue-600 bg-blue-600 rounded-lg text-white ' />
            </div>
            </div>
        </div>
    </div>
    </section>
  );
};

export default ConnectSection;