import Card from "./Card";

export default function CardsSection({ cards }) {
  return (
    <div className="flex flex-wrap gap-6">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
