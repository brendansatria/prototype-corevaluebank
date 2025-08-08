import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import '../styles/BankButtonBlitz.css';
import frontlinerImg from '../assets/frontliner2.png';

const GAME_DURATION = 30;
const BANKING_ICONS = ['💳', '💰', '🏧', '📊', '💵', '🔒', '📋', '💎'];

const BankButtonBlitz = () => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'ended'>('start');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [activeButtons, setActiveButtons] = useState<Set<number>>(new Set());
    const [feedback, setFeedback] = useState<Record<number, 'correct' | 'wrong'>>({});

    const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
    const arrowTimerRef = useRef<NodeJS.Timeout | null>(null);

    const clearTimers = useCallback(() => {
        if (gameTimerRef.current) clearInterval(gameTimerRef.current);
        if (arrowTimerRef.current) clearTimeout(arrowTimerRef.current);
    }, []);

    const spawnArrows = useCallback(() => {
        let spawnDelay = 1500;
        let maxArrows = 1;

        setTimeLeft(prevTime => {
            if (prevTime <= 20 && prevTime > 10) {
                spawnDelay = 1200;
                maxArrows = Math.random() < 0.3 ? 2 : 1;
            } else if (prevTime <= 10 && prevTime > 0) {
                spawnDelay = 900;
                if (Math.random() < 0.1) maxArrows = 3;
                else if (Math.random() < 0.5) maxArrows = 2;
            }

            setActiveButtons(prevActive => {
                const newActive = new Set<number>();
                const available = Array.from({ length: 8 }, (_, i) => i);
                for (let i = 0; i < maxArrows && available.length > 0; i++) {
                    const randIndex = Math.floor(Math.random() * available.length);
                    const buttonIndex = available.splice(randIndex, 1)[0];
                    newActive.add(buttonIndex);
                }
                return newActive;
            });
            
            if (prevTime > 1) {
                arrowTimerRef.current = setTimeout(spawnArrows, spawnDelay);
            }
            return prevTime;
        });
    }, []);

    const endGame = useCallback(() => {
        setGameState('ended');
        clearTimers();
        setActiveButtons(new Set());
    }, [clearTimers]);

    const startGame = useCallback(() => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setGameState('playing');
        spawnArrows();

        gameTimerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [spawnArrows, endGame]);

    const restartGame = () => {
        setGameState('start');
        setScore(0);
        setTimeLeft(GAME_DURATION);
    };

    const handleButtonClick = (index: number) => {
        if (gameState !== 'playing') return;

        if (activeButtons.has(index)) {
            setScore(s => s + 1);
            setActiveButtons(prev => {
                const newActive = new Set(prev);
                newActive.delete(index);
                return newActive;
            });
            setFeedback(f => ({ ...f, [index]: 'correct' }));
        } else {
            setScore(s => s - 1);
            setFeedback(f => ({ ...f, [index]: 'wrong' }));
        }
        setTimeout(() => setFeedback(f => ({ ...f, [index]: undefined })), 300);
    };

    useEffect(() => {
        return () => clearTimers();
    }, [clearTimers]);

    const characterStates = useMemo(() => {
        let finalMessage = '';
        if (gameState === 'ended') {
            if (score >= 21) finalMessage = '🎉 Excellent Service!';
            else if (score >= 11) finalMessage = '😴 Not Bad, But Tired';
            else finalMessage = '😰 Overwhelmed!';
        }

        if (score >= 21) {
            return { animation: 'bbb-customer-cheer', emoji1: '😊', emoji2: '😊', finalMessage };
        }
        if (score >= 11) {
            return { animation: '', emoji1: '😐', emoji2: '😐', finalMessage };
        }
        return { animation: 'bbb-customer-angry', emoji1: '😡', emoji2: '😰', finalMessage };
    }, [score, gameState]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-800 bank-button-blitz-page">
            <div className="game-container">
                {gameState === 'start' && (
                    <div className="start-screen">
                        <h2>🏦 Welcome to Bank Button Blitz!</h2>
                        <div className="instructions">
                            Help the bank frontliner serve customers efficiently! Tap buttons with icons to score points. Avoid tapping empty buttons or you'll lose points. You have 30 seconds!
                        </div>
                        <button className="start-button" onClick={startGame}>Start Game</button>
                    </div>
                )}
                {gameState === 'ended' && (
                    <div className="end-screen">
                        <div className="final-message">{characterStates.finalMessage}</div>
                        <div>Final Score: {score} points</div>
                        <button className="restart-button" onClick={restartGame}>Play Again</button>
                    </div>
                )}

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
                            <button key={i} className={`game-button ${feedback[i] || ''} ${activeButtons.has(i) ? 'has-arrow' : ''}`} onClick={() => handleButtonClick(i)}>
                                {activeButtons.has(i) ? BANKING_ICONS[i] : ''}
                            </button>
                        ))}
                    </div>
                    <div className="center-area">
                        <div className="sprite-container">
                            <div className="sprite-image" style={{ backgroundImage: `url(${frontlinerImg})` }} />
                            <div className={`speech-bubble bubble-1 ${characterStates.animation}`}>{characterStates.emoji1}</div>
                            <div className={`speech-bubble bubble-2 ${characterStates.animation}`}>{characterStates.emoji2}</div>
                        </div>
                    </div>
                    <div className="button-column">
                        {[4, 5, 6, 7].map(i => (
                            <button key={i} className={`game-button ${feedback[i] || ''} ${activeButtons.has(i) ? 'has-arrow' : ''}`} onClick={() => handleButtonClick(i)}>
                                {activeButtons.has(i) ? BANKING_ICONS[i] : ''}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankButtonBlitz;