import { Card, CARD_TYPES } from "./types";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: Card;
  onClick: () => void;
}

export const GameCard = ({ card, onClick }: GameCardProps) => {
  const cardClasses = cn(
    "w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 transform-gpu",
    "border-4 border-green-700 shadow-md",
    {
      "bg-blue-100 hover:shadow-lg hover:-translate-y-1": !card.flipped,
      "bg-white rotate-y-180": card.flipped,
      "opacity-0 scale-0 pointer-events-none": card.removed,
    }
  );

  return (
    <div className="perspective-1000" onClick={onClick}>
      <div className={cardClasses} style={{ transformStyle: "preserve-3d", transform: card.flipped ? "rotateY(180deg)" : "" }}>
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-green-600 text-2xl text-white rounded-md">
          🌿
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-white text-4xl rounded-md">
          {card.flipped ? CARD_TYPES[card.type].emoji : ''}
        </div>
      </div>
    </div>
  );
};