import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Game Arcade!</h1>
        <p className="text-xl text-gray-600">
          Choose a game to play.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>🌱 Photosynthesis: Sunlit Fields</CardTitle>
          <CardDescription>A memory game of ecological balance.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p>
            Match Sun, Water, and CO2 to create energy. Watch out for grasshoppers!
          </p>
          <Link to="/photosynthesis-game">
            <Button size="lg">Play Game</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="absolute bottom-4">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;