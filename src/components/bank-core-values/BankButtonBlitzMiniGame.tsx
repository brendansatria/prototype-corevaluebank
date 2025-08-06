import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const GAME_DURATION = 30;
const BANKING_ICONS = ['💳', '💰', '🏧', '📊', '💵', '🔒', '📋', '💎'];

interface BankButtonBlitzMiniGameProps {
  onGameEnd: (score: number) => void;
}

const BankButtonBlitzMiniGame = ({ onGameEnd }: BankButtonBlitzMiniGameProps) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeButtons, setActiveButtons] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<Record<number, 'correct' | 'wrong'>>({});

  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const iconTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreRef = useRef(score);
  scoreRef.current = score;

  const clearTimers = useCallback(() => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (iconTimerRef.current) clearTimeout(iconTimerRef.current);
  }, []);

  const spawnIcons = useCallback(() => {
    setTimeLeft(currentTimeLeft => {
        let spawnDelay = 1500;
        let numIcons = 1;

        if (currentTimeLeft <= 20 && currentTimeLeft > 10) {
            spawnDelay = 1200;
            if (Math.random() < 0.3) numIcons = 2;
        } else if (currentTimeLeft <= 10 && currentTimeLeft > 0) {
            spawnDelay = 900;
            if (Math.random() < 0.1) numIcons = 3;
            else if (Math.random() < 0.5) numIcons = 2;
        }

        const available = Array.from({ length: 8 }, (_, i) => i);
        const newActive: number[] = [];
        for (let i = 0; i < numIcons && available.length > 0; i++) {
            const randIndex = Math.floor(Math.random() * available.length);
            const buttonIndex = available.splice(randIndex, 1)[0];
            newActive.push(buttonIndex);
        }
        
        setActiveButtons(newActive);

        if (currentTimeLeft > 1) {
            iconTimerRef.current = setTimeout(spawnIcons, spawnDelay);
        }
        return currentTimeLeft;
    });
  }, []);

  useEffect(() => {
    spawnIcons();
    gameTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimers();
          onGameEnd(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = (index: number) => {
    if (timeLeft <= 0) return;

    if (activeButtons.includes(index)) {
      setScore(s => s + 1);
      setFeedback(f => ({ ...f, [index]: 'correct' }));
      setActiveButtons(btns => btns.filter(b => b !== index));
    } else {
      setScore(s => s - 1);
      setFeedback(f => ({ ...f, [index]: 'wrong' }));
    }
    setTimeout(() => setFeedback(f => ({ ...f, [index]: undefined })), 300);
  };

  const getButtonClass = (index: number) => {
    let classes = 'game-button transition-all duration-150 text-4xl ';
    if (feedback[index]) {
      classes += feedback[index] === 'correct' ? 'bg-green-400 animate-bounce-sm' : 'bg-red-400 animate-shake';
    } else if (activeButtons.includes(index)) {
      classes += 'bg-yellow-300 animate-pulse';
    } else {
      classes += 'bg-slate-200';
    }
    return classes;
  };

  return (
    <div className="p-4 bg-slate-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4 p-4 bg-blue-600 text-white rounded-lg">
        <h2 className="text-xl font-bold">Bank Button Blitz</h2>
        <div className="text-lg font-mono">⏰ {timeLeft}s</div>
        <div className="text-lg font-mono">💰 {score}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {[0, 1, 2, 3].map(i => (
            <Button key={i} className={getButtonClass(i)} style={{height: '80px'}} onClick={() => handleButtonClick(i)}>
              {activeButtons.includes(i) ? BANKING_ICONS[i] : ''}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {[4, 5, 6, 7].map(i => (
            <Button key={i} className={getButtonClass(i)} style={{height: '80px'}} onClick={() => handleButtonClick(i)}>
              {activeButtons.includes(i) ? BANKING_ICONS[i] : ''}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankButtonBlitzMiniGame;