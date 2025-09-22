'use client'
import React, { useState, useEffect } from 'react';
import { SiNotion } from "react-icons/si";
import { MdOutlineWebhook } from "react-icons/md";
import ConnectNotionModal from './ConnectNotionModal';
import useStore from '../store/useStore';
import DisconnectDialog from './DisconnectDialog';
import WebhookDialog from './WebhookDialog';


const IntegrationSection = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { user, notionConnected } = useStore();
  const { setNotionConnected } = useStore.getState();
  const [isDisconnectOpen, setIsDisconnectOpen] = useState(false);
  const [isWebhookDialogOpen, setIsWebhookDialogOpen] = useState(false);
  const [isWebhookConnected, setIsWebhookConnected] = useState(false);



  const userId = user.uid;


  const handleDisconnect = async () => {
    const confirmDisconnect = window.confirm(
      "Are you sure you want to disconnect Notion?"
    );
    if (!confirmDisconnect) return setIsDisconnectOpen(false); // ❌ user cancelled → stop here

    try {
      const res = await fetch("/api/notion/save-database", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid }), // 👈 send userId
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Disconnected:", data);
        setNotionConnected(false);
        setIsDisconnectOpen(false)
      } else {
        alert(data.error || "Failed to disconnect Notion");
      }
    } catch (err) {
      console.error("Disconnect error", err);
      alert("Something went wrong while disconnecting");
    }
  };


  // Function to check the webhook status on component load
  useEffect(() => {
    const checkWebhookStatus = async () => {
      try {
        const response = await fetch(`/api/webhook?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.webhook_url) {
          setIsWebhookConnected(true);
        } else {
          setIsWebhookConnected(false);
        }
      } catch (error) {
        console.error("Failed to check webhook status:", error);
      }
    };

    if (userId) {
      checkWebhookStatus();
    }
  }, [userId]);
  

  return (
    <>
      <div className="flex flex-wrap gap-6 overflow-y-auto mb-20 px-4 ">
       
        {/* notion Card */}
        <div className="flex flex-col items-center p-8 bg-white border border-gray-200  rounded-xl transition-shadow duration-300 hover:shadow-lg w-full max-w-xl sm:w-[48%] lg:w-[25%]">
          <div className="flex items-center justify-center p-2 rounded-full mb-4">
            <SiNotion className='w-14 h-14' />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Notion</h3>
          <p className="text-sm font-semibold text-center text-gray-500 mb-8">Connect your notes to a Notion Database and get all your notes data on Notion</p>
          <button
            onClick={() => {
            if (notionConnected) {
              setIsDisconnectOpen(true);
            } else {
              setIsOpen(true);
            }
          }}
          
          className={`mt-auto w-full py-2 px-4 ${notionConnected ? 'bg-green-600 text-white cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-black'} text-white font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50`}>
            {notionConnected ? "Connected":  "+ Connect" }
          </button>
        </div>

        {/* Webhook Card */}
        <div className="flex flex-col items-center p-8 bg-white border border-gray-200  rounded-xl transition-shadow duration-300 hover:shadow-lg w-full max-w-xl sm:w-[48%] lg:w-[25%]">
          <div className="flex items-center justify-center p-2 rounded-full mb-4">
            <MdOutlineWebhook className='w-14 h-14 p-2 border-blue-600 bg-blue-600 rounded-lg text-white ' />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Webhook</h3>
          <p className="text-sm font-semibold text-center text-gray-500 mb-8">Send your notes to your App or Server using Webhooks</p>
          <button
          className={`mt-auto w-full py-2 px-4 ${isWebhookConnected ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-800 text-gray-500 hover:bg-gray-900'} text-white font-medium rounded-full  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50  `}
            onClick={() => setIsWebhookDialogOpen(true)}
          >
           {isWebhookConnected ? 'Connected' : '+ Connect'}  
          </button>
        </div>


      </div>

      {isOpen && (
          <div>
            {/* Modal or panel to show Notion settings */}
            <ConnectNotionModal userId={user?.uid} onClose={() => setIsOpen(false)} />
            {/* <p>Notion integration is open</p> */}
          </div>
      )}
      {isDisconnectOpen && 
        <DisconnectDialog  userName={user.displayName} onClose={() => setIsDisconnectOpen(false)} onDisconnect={handleDisconnect} />
      }
      
      <WebhookDialog
        isOpen={isWebhookDialogOpen}
        onClose={() => setIsWebhookDialogOpen(false)}
        userId={user.uid} // Pass your user ID here
        onSaveSuccess={() => { /* Handle UI update after save/delete */ }}
        setIsWebhookConnected={setIsWebhookConnected}
        isWebhookConnected ={isWebhookConnected}
      />

    </>
  );
};

export default IntegrationSection;