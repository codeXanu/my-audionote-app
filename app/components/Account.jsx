import React, { useState } from 'react';
import { User } from "lucide-react";
import useStore from '../store/useStore';

const Account = () => {
  const [activeTab, setActiveTab] = useState('Account Details'); // State for active tab

  const {user} = useStore();

  return (
    <div className="min-h-screen bg-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Account</h1>
        <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition-colors text-sm sm:text-base">
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* <button
          className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
            activeTab === 'Plan & Billing'
              ? 'bg-gray-200 text-gray-900'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('Plan & Billing')}
        >
          Plan & Billing
        </button> */}
        <button
          className={`px-4 py-2 rounded-full text-sm sm:text-base ${
            activeTab === 'Account Details'
              ? 'bg-gray-200 text-gray-900'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('Account Details')}
        >
          Account Details
        </button>
       
      </div>

      {/* Account Details Content (conditionally rendered based on activeTab) */}
      {activeTab === 'Account Details' && (
        <div className="space-y-8">
          {/* Account Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
                <p className="text-gray-600 text-sm">Manage your personal information</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-lg font-medium text-gray-800">
                <User size={16} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={user.displayName}
                  readOnly
                  className="block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm bg-gray-50 focus:outline-none sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  readOnly
                  className="block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm bg-gray-50 focus:outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Profile Mode Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Mode</h2>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">Personal</span>
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Delete Audionotes account</h2>
              <p className="text-red-600 text-sm mt-1">
                Please note that this action is permanent - we will not be able to recover your notes once deleted
              </p>
            </div>
            <button className="mt-4 sm:mt-0 px-4 py-2 text-red-600 border border-red-600 rounded-full hover:bg-red-50 transition-colors text-sm sm:text-base">
              Delete Account
            </button>
          </div>
        </div>
      )}
      {/* You would add content for other tabs here */}
    </div>
  );
};

export default Account;