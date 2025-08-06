import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GAME_ROUNDS, TARGET_SCORE, MetricImpacts, DilemmaOption } from '@/data/bankCoreValuesData';
import BankButtonBlitzMiniGame from '@/components/bank-core-values/BankButtonBlitzMiniGame';

type GamePhase = 'start' | 'mini-game' | 'event' | 'update' | 'end';
type Difficulty = 'easy' | 'medium' | 'hard';

const BankCoreValuesGame = () => {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [currentRound, setCurrentRound] = useState(0);
  const [metrics, setMetrics] = useState<MetricImpacts>({ revenue: 0, risk: 0, customerSatisfaction: 0 });
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [lastChoice, setLastChoice] = useState<{ choice: DilemmaOption, feedback: string } | null>(null);

  const startGame = () => {
    setCurrentRound(0);
    setMetrics({ revenue: 0, risk: 0, customerSatisfaction: 0 });
    setPhase('mini-game');
  };

  const handleMiniGameEnd = (score: number) => {
    if (score >= 21) setDifficulty('easy');
    else if (score >= 11) setDifficulty('medium');
    else setDifficulty('hard');
    setPhase('event');
  };

  const handleDilemmaChoice = (choice: DilemmaOption) => {
    setMetrics(prev => ({
      revenue: prev.revenue + choice.impacts.revenue,
      risk: prev.risk + choice.impacts.risk,
      customerSatisfaction: prev.customerSatisfaction + choice.impacts.customerSatisfaction,
    }));
    setLastChoice({ choice, feedback: choice.feedback });
    setPhase('update');
  };

  const nextRound = () => {
    if (currentRound < GAME_ROUNDS.length - 1) {
      setCurrentRound(r => r + 1);
      setPhase('mini-game');
    } else {
      setPhase('end');
    }
  };

  const renderPhase = () => {
    const roundData = GAME_ROUNDS[currentRound];

    switch (phase) {
      case 'start':
        return (
          <Card className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Bank Core Values Challenge</h1>
            <p className="mb-8 text-lg text-muted-foreground">A team-based game to reinforce our core values. Best played by a group of 5.</p>
            <Button size="lg" onClick={startGame}>Start Game</Button>
          </Card>
        );
      case 'mini-game':
        return (
          <div>
            <h2 className="text-3xl font-bold text-center mb-2">Round {roundData.round}: {roundData.coreValue}</h2>
            <p className="text-center text-muted-foreground mb-4">Phase 1: Bank Button Blitz! Work together!</p>
            <BankButtonBlitzMiniGame onGameEnd={handleMiniGameEnd} />
          </div>
        );
      case 'event':
        const dilemma = roundData.dilemma;
        const options = dilemma[difficulty];
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Round {roundData.round} Dilemma: {roundData.coreValue}</CardTitle>
              <p className="text-sm text-muted-foreground">{roundData.department}</p>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-lg">{dilemma.scenario}</p>
              <div className="flex flex-col gap-4">
                {options.map((option, i) => (
                  <Button key={i} variant="outline" className="h-auto py-3 text-wrap text-base" onClick={() => handleDilemmaChoice(option)}>
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'update':
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Round {roundData.round} Update</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 italic text-muted-foreground">Your choice: "{lastChoice?.choice.text}"</p>
              <p className="mb-6 p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-lg">{lastChoice?.feedback}</p>
              <Button size="lg" onClick={nextRound}>
                {currentRound < GAME_ROUNDS.length - 1 ? 'Next Round' : 'Finish Game'}
              </Button>
            </CardContent>
          </Card>
        );
      case 'end':
        const win = metrics.revenue >= TARGET_SCORE && metrics.risk >= TARGET_SCORE && metrics.customerSatisfaction >= TARGET_SCORE;
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-3xl">{win ? "🎉 Congratulations! 🎉" : "Better Luck Next Time!"}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl mb-6">{win ? "Your team thrives due to your strong core values!" : "Some metrics fell short. Reflect on your choices and try again!"}</p>
              <div className="space-y-4 text-left">
                <MetricDisplay label={`Revenue: ${metrics.revenue} / ${TARGET_SCORE}`} value={metrics.revenue} />
                <MetricDisplay label={`Risk Management: ${metrics.risk} / ${TARGET_SCORE}`} value={metrics.risk} />
                <MetricDisplay label={`Customer Satisfaction: ${metrics.customerSatisfaction} / ${TARGET_SCORE}`} value={metrics.customerSatisfaction} />
              </div>
              <Button size="lg" onClick={startGame} className="mt-8">Play Again</Button>
            </CardContent>
          </Card>
        );
    }
  };

  const MetricDisplay = ({ label, value }: { label: string, value: number }) => (
    <div>
      <p className="text-sm font-medium mb-1">{label}</p>
      <Progress value={Math.min(100, (value / TARGET_SCORE) * 100)} className="w-full h-4" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      {phase !== 'start' && phase !== 'end' && (
        <header className="w-full max-w-4xl mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex justify-around items-center text-center gap-4">
            <div className="flex-1"><p className="font-bold">Revenue</p><p className="text-2xl">{metrics.revenue}</p></div>
            <div className="flex-1"><p className="font-bold">Risk</p><p className="text-2xl">{metrics.risk}</p></div>
            <div className="flex-1"><p className="font-bold">Satisfaction</p><p className="text-2xl">{metrics.customerSatisfaction}</p></div>
          </div>
        </header>
      )}
      <main className="w-full max-w-4xl">
        {renderPhase()}
      </main>
    </div>
  );
};

export default BankCoreValuesGame;