import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Instructions = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90">
      <CardHeader>
        <CardTitle className="text-green-800">🎯 How to Play:</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2 text-green-800">
          <li><strong>Click up to three cards</strong> each turn to reveal them.</li>
          <li><strong>☀️ Sun + 💨 CO2 + 💧 Water</strong> = 5 points (Photosynthesis Combo) - Cards are removed!</li>
          <li><strong>Any pair</strong> (Sun+CO2, Sun+Water, CO2+Water) in a turn of 3 cards = 2 points.</li>
          <li><strong>🦗 Grasshoppers</strong> end your turn immediately and shuffle with an adjacent card.</li>
          <li><strong>Goal:</strong> Reach 10 points to win!</li>
        </ul>
      </CardContent>
    </Card>
  );
};