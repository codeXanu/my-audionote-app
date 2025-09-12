'use client'

import Card from "./Card";


export default function CardsSection({ cards, setSelectedCard, setIsDailougeOpen }) {
  
  return (
    <div className="flex flex-wrap gap-6 ">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={() => {setSelectedCard(card); setIsDailougeOpen(true);} } />
      ))}
    </div>
  );
}
