'use client'

import { truncateContent } from "../utils/truncateContent";
import { FaMicrophone, FaRegFileAlt, FaRegImage, FaYoutube } from "react-icons/fa";

export default function Card({ card, onClick }) {
  

  return (
    <div onClick={onClick} className="bg-white p-4 rounded-xl shadow-md overflow-hidden border border-gray-300 w-full sm:w-[calc(50%-12px)] lg:w-[30%] flex flex-col min-h-[180px] md:min-h-[400px] hover:shadow-lg transition-shadow">
      {/* Date + Duration */}
      <div className="flex justify-between items-center text-xs font-medium text-gray-500">
        <span>{card.date}</span>
        {card.type && (
          <span className="flex items-center ml-2 text-gray-600 bg-gray-100 p-2 rounded-full">
            {card.type && card.type.startsWith("audio/") && <FaMicrophone className="w-4 h-4 mr-1" />}
            {card.type && card.type.startsWith("text/") && <FaRegFileAlt className="w-4 h-4 mr-1" />}
            {card.type === "Image" && <FaRegImage className="w-4 h-4 mr-1" />}
            {card.type === "Youtube" && <FaYoutube className="w-4 h-4 mr-1 text-red-500" />}

            {card.type && card.type.startsWith("audio/")
              ? card.duration
              : card.type && card.type.startsWith("text/")
              ? "Text"
              : card.type === "image"
              ? "Image"
              : card.type === "youtube"
              ? "YouTube Link"
              : ""}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-semibold text-lg mt-2">{card.title}</h2>

      {/* Content */}
      <p className="text-gray-600 mt-2 text-sm flex-grow overflow-hidden leading-relaxed">
        {truncateContent(card.content, 35)}
        <button className="text-orange-600 font-medium ml-1">Read more</button>
      </p>

      {/* Actions */}
      <div className="mt-4 flex justify-end items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" 
          onClick={(e) => {
            e.stopPropagation();
            // Your button-specific logic here
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          onClick={(e) => {
            e.stopPropagation();
            // Your button-specific logic here
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button >
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          onClick={(e) => {
            e.stopPropagation();
            // Your button-specific logic here
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
