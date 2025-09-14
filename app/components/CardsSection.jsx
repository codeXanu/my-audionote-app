'use client'

import Card from "./Card";
import CardLoaderMockup from "./CardLoaderMockup";
// import useStore from "../store/useStore";


export default function CardsSection({ cardsData, setSelectedCard, setIsDailougeOpen }) {

  // const { cardsData } = useStore.getState([]);
  // console.log('this is cardsData' ,cardsData)

  
  return (
    <div className="flex flex-wrap gap-6 overflow-y-auto mb-20">
      {cardsData.map((card, index) => 
        card.id === "pending" || card.pending ? (
          <CardLoaderMockup key="pending" />
        ) :
      (
        <Card key={index} card={card} onClick={() => {setSelectedCard(card); setIsDailougeOpen(true);} } />
      ))}
    </div>
  );
}
