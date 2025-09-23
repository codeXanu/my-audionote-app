'use client'

import { useState } from "react";
import { truncateContent } from "../utils/truncateContent";
import { FaMicrophone, FaRegFileAlt, FaRegImage, FaYoutube } from "react-icons/fa";
import OptionsMenu from "./OptionsMenu";
import { FaStar } from "react-icons/fa6";


export default function Card({ card, onClick, onToggleFavourite }) {
  
  
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
        <button className={`p-2 rounded-full transition-colors ${ card.is_favourite ? "text-red-500" : "text-gray-400 hover:text-gray-600"} `} 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(card.id, !card.is_favourite);
          }}
        >
          {<FaStar className="w-6 h-6" /> }
        </button>
        
        <OptionsMenu noteId= {card.id} />
      </div>
    </div>
  );
}
