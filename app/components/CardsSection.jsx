'use client'

import Card from "./Card";
import CardLoaderMockup from "./CardLoaderMockup";


export default function CardsSection({ cards, setSelectedCard, setIsDailougeOpen }) {
  
  return (
    <div className="flex flex-wrap gap-6 overflow-y-auto mb-20">
      {cards.map((card, index) => 
        card.id === "pending" || card.pending ? (
          <CardLoaderMockup key="pending" />
        ) :
      (
        <Card key={index} card={card} onClick={() => {setSelectedCard(card); setIsDailougeOpen(true);} } />
      ))}
    </div>
  );
}
