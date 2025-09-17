'use client'

import Card from "./Card";
import CardLoaderMockup from "./CardLoaderMockup";
import useStore from "../store/useStore";
// import useStore from "../store/useStore";


export default function CardsSection({ cardsData, setSelectedCard, setIsDailougeOpen }) {

  // const { cardsData } = useStore.getState([]);
  // console.log('this is cardsData' ,cardsData)
  const { isLoadingDatabase } = useStore();

  console.log('isLoadingDatabase', isLoadingDatabase )

  
  return (
    <div className="flex flex-wrap gap-6 overflow-y-auto mb-20">
      {/* Show loader ONLY when fetching */}
      { isLoadingDatabase ? (
        <CardLoaderMockup />
      ) : (
          cardsData.map((card, index) => 
          card.id === "pending" || card.pending || isLoadingDatabase ? (
            <CardLoaderMockup key="pending" />
          ) :
        (
          <Card key={index} card={card} onClick={() => {setSelectedCard(card); setIsDailougeOpen(true);} } />
        )

        )
      )}
      
      
    </div>
  );
}
