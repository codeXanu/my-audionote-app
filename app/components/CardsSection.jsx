'use client'

import Card from "./Card";
import CardLoaderMockup from "./CardLoaderMockup";
import useStore from "../store/useStore";
import { FaMicrophoneLines } from "react-icons/fa6";


export default function CardsSection({ cardsData, setSelectedCard, setIsDailougeOpen, onToggleFavourite }) {

  const { isLoadingDatabase } = useStore();

  console.log('isLoadingDatabase', isLoadingDatabase )

  

  return (
    <div className="flex flex-wrap gap-6 overflow-y-auto mb-20">
      {/* Show loader ONLY when fetching */}
      { isLoadingDatabase ? (
        <CardLoaderMockup />
      ) : (
        // Check if there are no cards after loading
        cardsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full mt-24 text-center text-gray-400">
            <FaMicrophoneLines size={80} className="mb-4 text-gray-300"/>
            <h2 className="text-3xl font-bold mb-4 text-gray-600">Welcome to Quick Audio Note!</h2>
            <p className="text-lg text-gray-400">Hit the <span className="text-red-500 font-semibold">start recording</span> button to record your first audio note</p>
          </div>
        ) :
      
      
      
      (
          cardsData.map((card, index) => 
          card.id === "pending" || card.pending || isLoadingDatabase ? (
            <CardLoaderMockup key="pending" />
          ) :
        (
          <Card key={index} card={card} onClick={() => {setSelectedCard(card); setIsDailougeOpen(true);} } onToggleFavourite={onToggleFavourite} />
        )

        )
      ) ) }
      
      
    </div>
  );
}
