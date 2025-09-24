"use client";

import Card from "./Card";

export default function FavouritesSection({
  cardsData,
  setSelectedCard,
  setIsDailougeOpen,
  onToggleFavourite,
}) {
  // filter favourite cards
  const favouriteCards = cardsData.filter((card) => card.is_favourite);

  if (favouriteCards.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-white">
        {/* Container for the content, centered within the parent div */}
        <div className="flex flex-col items-center p-8 text-center rounded-xl">
          {/* Star Icon */}
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.908-7.416 3.908 1.48-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No favourites found yet
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-6">
            Add notes to favourite to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-medium text-gray-700 mb-4">
        {" "}
        Your Favourites{" "}
      </h1>
      <div className="flex flex-wrap gap-6 overflow-y-auto mb-20">
        {favouriteCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => {
              setSelectedCard(card);
              setIsDailougeOpen(true);
            }}
            onToggleFavourite={onToggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}
