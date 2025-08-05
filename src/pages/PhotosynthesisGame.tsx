import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { GameBoard } from "@/components/photosynthesis/GameBoard";
import { GameStats } from "@/components/photosynthesis/GameStats";
import { Instructions } from "@/components/photosynthesis/Instructions";
import { EducationalPopup } from "@/components/photosynthesis/EducationalPopup";
import { Card, CardType, CARD_TYPES } from "@/components/photosynthesis/types";
import { cn } from "@/lib/utils";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const PhotosynthesisGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [turnCount, setTurnCount] = useState(1);
  const [message, setMessage] = useState({ text: "Click up to 3 cards to start!", type: "default" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const initializeGame = useCallback(() => {
    const initialCards: Card[] = [];
    (Object.keys(CARD_TYPES) as CardType[]).forEach(type => {
      for (let i = 0; i < 4; i++) {
        initialCards.push({ type, id: `${type}-${i}`, flipped: false, removed: false });
      }
    });

    setCards(shuffleArray(initialCards));
    setFlippedIndices([]);
    setScore(0);
    setTurnCount(1);
    setMessage({ text: "New game started! Click up to 3 cards.", type: "default" });
    setIsPopupOpen(false);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (index: number) => {
    if (isProcessing || flippedIndices.length >= 3 || cards[index].flipped || cards[index].removed) {
      return;
    }

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlippedIndices([...flippedIndices, index]);
  };

  const processTurn = useCallback(() => {
    if (flippedIndices.length === 0) return;

    setIsProcessing(true);

    const flippedCards = flippedIndices.map(index => cards[index]);
    const flippedTypes = flippedCards.map(card => card.type);

    // Grasshopper check
    if (flippedTypes.includes('grasshopper')) {
      setMessage({ text: "🦗 Grasshopper disruption! Turn ended.", type: "lose" });
      
      setTimeout(() => {
        let newCards = [...cards];
        flippedIndices.forEach(index => {
          if (newCards[index].type === 'grasshopper') {
            const adjacent = getAdjacentIndices(index).filter(i => !newCards[i].removed && !flippedIndices.includes(i));
            if (adjacent.length > 0) {
              const swapWith = adjacent[Math.floor(Math.random() * adjacent.length)];
              [newCards[index], newCards[swapWith]] = [newCards[swapWith], newCards[index]];
            }
          }
        });
        
        newCards.forEach(card => card.flipped = false);
        setCards(newCards);
        setFlippedIndices([]);
        setTurnCount(t => t + 1);
        setIsProcessing(false);
        setMessage({ text: "Click up to 3 cards.", type: "default" });
      }, 2000);
      return;
    }

    if (flippedIndices.length < 3) {
        setIsProcessing(false);
        return;
    }

    // Scoring logic
    const uniqueTypes = new Set(flippedTypes);
    let turnScore = 0;
    let messageText = "No matches this turn. Keep trying!";
    let messageType = "default";
    let shouldRemove = false;

    if (uniqueTypes.has('sun') && uniqueTypes.has('plant') && uniqueTypes.has('water')) {
      turnScore = 5;
      messageText = "🌟 Perfect Photosynthesis! +5 points!";
      messageType = "win";
      shouldRemove = true;
    } else if (
      (flippedTypes.filter(t => t === 'sun').length >= 1 && flippedTypes.filter(t => t === 'plant').length >= 1) ||
      (flippedTypes.filter(t => t === 'sun').length >= 1 && flippedTypes.filter(t => t === 'water').length >= 1) ||
      (flippedTypes.filter(t => t === 'plant').length >= 1 && flippedTypes.filter(t => t === 'water').length >= 1)
    ) {
      turnScore = 2;
      messageText = "✨ Great pair! +2 points!";
      messageType = "win";
    }

    setScore(s => s + turnScore);
    setMessage({ text: messageText, type: messageType });

    setTimeout(() => {
      let newCards = [...cards];
      if (shouldRemove) {
        flippedIndices.forEach(index => { newCards[index].removed = true; });
      }
      newCards.forEach(card => card.flipped = false);
      
      setCards(newCards);
      setFlippedIndices([]);
      setTurnCount(t => t + 1);
      setIsProcessing(false);
      
      const remainingCards = newCards.filter(c => !c.removed).length;
      if (score + turnScore >= 10) {
        setMessage({ text: "🎉 Congratulations! You created a thriving meadow!", type: "win" });
        setIsPopupOpen(true);
      } else if (remainingCards === 0) {
        setMessage({ text: "🏆 Perfect Ecosystem! All cards removed!", type: "win" });
        setScore(s => s + 3); // Bonus points
        setIsPopupOpen(true);
      } else {
        setMessage({ text: "Click up to 3 cards.", type: "default" });
      }
    }, 2000);

  }, [cards, flippedIndices, score]);

  useEffect(() => {
    if (isProcessing) return;

    const hasGrasshopper = flippedIndices.map(i => cards[i].type).includes('grasshopper');
    if (hasGrasshopper || flippedIndices.length === 3) {
      const timer = setTimeout(() => processTurn(), 1000);
      return () => clearTimeout(timer);
    }
  }, [flippedIndices, cards, processTurn, isProcessing]);

  const getAdjacentIndices = (index: number) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const adjacent = [];
    if (row > 0) adjacent.push(index - 4); // Up
    if (row < 3) adjacent.push(index + 4); // Down
    if (col > 0) adjacent.push(index - 1); // Left
    if (col < 3) adjacent.push(index + 1); // Right
    return adjacent;
  };

  const messageClasses = cn("text-center p-4 rounded-lg mb-6 font-semibold", {
    "bg-green-100 text-green-800": message.type === "win",
    "bg-red-100 text-red-800": message.type === "lose",
    "bg-blue-100 text-blue-800": message.type === "default",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-green-200 to-lime-200 flex flex-col items-center p-4 sm:p-8">
      <header className="text-center mb-8 text-green-800">
        <h1 className="text-4xl md:text-5xl font-bold">🌱 Photosynthesis: Sunlit Fields</h1>
        <p className="text-lg mt-2">Nurture your meadow by gathering sunlight, plants, and water!</p>
      </header>

      <GameStats score={score} flippedCount={flippedIndices.length} turnCount={turnCount} />

      <div className={messageClasses}>
        {message.text}
      </div>

      <GameBoard cards={cards} onCardClick={handleCardClick} />

      <div className="mt-8">
        <Button onClick={initializeGame} size="lg" className="bg-red-500 hover:bg-red-600 text-white">
          New Game
        </Button>
      </div>

      <Instructions />
      
      <EducationalPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default PhotosynthesisGame;