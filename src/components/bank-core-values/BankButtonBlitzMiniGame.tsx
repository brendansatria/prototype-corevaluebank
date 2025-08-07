import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import '../../styles/BankButtonBlitz.css';
import frontlinerSprite from '@/assets/frontliner.png';

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

  const characterStates = useMemo(() => {
    if (score >= 21) {
        return { emoji1: '😊', emoji2: '😊', animation: 'bbb-customer-cheer' };
    }
    if (score >= 11) {
        return { emoji1: '😐', emoji2: '😐', animation: '' };
    }
    return { emoji1: '😡', emoji2: '😰', animation: 'bbb-customer-angry' };
  }, [score]);

  return (
    <div className="bank-button-blitz-page" style={{ minHeight: 'auto', background: 'transparent' }}>
        <div className="game-container" style={{ height: '600px', maxHeight: '600px', width: '350px', margin: 'auto', position: 'relative', boxShadow: 'none', background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            <div className="header">
                <h1 className="title">HURRY! TAP WHAT CUSTOMER ASK!</h1>
                <div className="stats">
                    <div className="timer">⏰ <span>{timeLeft}</span>s</div>
                    <div className="score">💰 <span>{score}</span></div>
                </div>
            </div>

            <div className="game-area">
                <div className="button-column">
                    {[0, 1, 2, 3].map(i => (
                        <button key={i} className={`game-button ${feedback[i] || ''} ${activeButtons.includes(i) ? 'has-arrow' : ''}`} onClick={() => handleButtonClick(i)}>
                            {activeButtons.includes(i) ? BANKING_ICONS[i] : ''}
                        </button>
                    ))}
                </div>
                <div className="center-area">
                    <div className="sprite-container">
                        <img src={frontlinerSprite} alt="Bank counter scene" className="sprite-image" />
                        <div className={`speech-bubble bubble-1 ${characterStates.animation}`}>{characterStates.emoji1}</div>
                        <div className={`speech-bubble bubble-2 ${characterStates.animation}`}>{characterStates.emoji2}</div>
                    </div>
                </div>
                <div className="button-column">
                    {[4, 5, 6, 7].map(i => (
                        <button key={i} className={`game-button ${feedback[i] || ''} ${activeButtons.has(i) ? 'has-arrow' : ''}`} onClick={() => handleButtonClick(i)}>
                            {activeButtons.includes(i) ? BANKING_ICONS[i] : ''}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default BankButtonBlitzMiniGame;