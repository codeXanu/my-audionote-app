import React, { useState, useEffect } from 'react';

const WebhookDialog = ({ isOpen, onClose, userId, onSaveSuccess,isWebhookConnected, setIsWebhookConnected }) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle fetching the existing URL when the dialog opens
  

  const handleSave = async () => {
    if (!webhookUrl.trim()) {
      setMessage('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, webhook_url: webhookUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Webhook URL saved successfully!');
        onSaveSuccess(data);
        setIsWebhookConnected(true);
        setTimeout(()=> {  onClose(); setMessage('');  }, 1000); // Close dialog after a short delay
      } else {
        setMessage(`Error: ${data.error || 'Failed to save URL.'}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/webhook', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Webhook URL deleted successfully!');
        setIsWebhookConnected(false);
        setWebhookUrl('');
        onSaveSuccess(null); // Signal to the parent that the URL is deleted
        setTimeout(()=> {  onClose(); setMessage('');  }, 1000);
        
      } else {
        setMessage(`Error: ${data.error || 'Failed to delete URL.'}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
      console.error('Delete error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-90 flex items-stretch lg:items-center justify-center
        bg-black/50
      "
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
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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

        <div className="flex flex-col items-center flex-grow justify-center mb-2">
          <h1 className="text-3xl lg:text-3xl font-semibold text-gray-800 text-center mb-8 underline">
            Connect Webhook to "Quick Audio Note"
          </h1>
          <div className="text-sm lg:text-base text-gray-600 max-w-lg mb-6">
            { isWebhookConnected ? 
              <div className='bg-red-100 rounded-xl p-8 '>
                  <h1 className='text-xl font-bold'> Your notes are synced with Webhook, Whenever you will create a note, the Quick Audio Note will send your notes to your URL.</h1>
              </div> 
            :
              <ol className="list-decimal list-inside">
                <li className="mb-2">Create a webhook endpoint on your server.</li>
                <li className="mb-2">Ensure your endpoint is configured to accept POST requests with a JSON body.</li>
                <li className="mb-2">
                  The JSON payload will contain your note's data, including `noteId`, `title`, `summary`, and `transcript`.
                </li>
                <li className="mb-2">
                  Paste the URL of your webhook endpoint into the input box below.
                </li>
                <li className="mb-2">
                  Click "Save" to link your notes to your server.
                </li>
                <li>
                  You can manage or delete your URL at any time from this dialog.
                </li>
              </ol>
            }
          </div>
           { !isWebhookConnected &&
            <div className="w-full max-w-lg mt-4">
              <input
                type="text"
                placeholder="Paste your webhook URL here..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>}
            {message && (
              <p className={`mt-2 text-sm text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
                {message}
              </p>
            )}
        </div>

          <div className="flex justify-center gap-6 lg:gap-12 mb-25">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
            >
              Cancel
            </button>
            {isWebhookConnected && (
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete URL'}
              </button>
            )}
            { !isWebhookConnected &&
              <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save URL'}
            </button>}
          </div>
      </div>
    </div>
  );
};

export default WebhookDialog;
