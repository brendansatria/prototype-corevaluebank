import { Card } from "./types";
import { GameCard } from "./GameCard";

interface GameBoardProps {
  cards: Card[];
  onCardClick: (index: number) => void;
}

export const GameBoard = ({ cards, onCardClick }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-black bg-opacity-5 rounded-lg">
      {cards.map((card, index) => (
        <GameCard key={card.id} card={card} onClick={() => onCardClick(index)} />
      ))}
    </div>
  );
};