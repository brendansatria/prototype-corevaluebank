import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameStatsProps {
  score: number;
  flippedCount: number;
  turnCount: number;
}

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <Card className="text-center min-w-[120px] bg-white/90">
    <CardHeader className="p-2">
      <CardTitle className="text-sm font-medium text-gray-600">{label}</CardTitle>
    </CardHeader>
    <CardContent className="p-2">
      <p className="text-2xl font-bold text-green-800">{value}</p>
    </CardContent>
  </Card>
);

export const GameStats = ({ score, flippedCount, turnCount }: GameStatsProps) => {
  return (
    <div className="flex gap-4 md:gap-8 mb-8 flex-wrap justify-center">
      <StatCard label="Score" value={score} />
      <StatCard label="Goal" value={10} />
      <StatCard label="Cards Flipped" value={flippedCount} />
      <StatCard label="Turn" value={turnCount} />
    </div>
  );
};