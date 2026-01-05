"use client";

import { useState } from "react";
import { motion } from "framer-motion"
import { Gamepad, Rose, Wind, TreeDeciduous, Waves, Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BreathingGame } from "./breathing-game";
import { ZenGarden } from "./zen-garden";
import { ForestGame } from "./forest-game";
import { OceanWaves } from "./ocean-waves";

const games = [
    {
        id: "breathing",
        title: "Guided Breathing",
        description: "Follow a soothing rhythm to slow your breath",
        icon: Wind,
        color: "text-blue-500",
        bgcolor: "bg-blue-500/10",
        duration: "5 mins",
    },
    {
        id: "garden",
        title: "Garden of Eden",
        description: "Create a peaceful space that’s just for you",
        icon: Rose,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
        duration: "No Limit",
      },
      {
        id: "forest",
        title: "Conscious Canopy",
        description: "A quiet walk through a peaceful forest",
        icon: TreeDeciduous,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        duration: "15 mins",
      },
      {
        id: "waves",
        title: "Gentle Tide",
        description: "Let your breath follow the ocean’s calm rhythm",
        icon: Waves,
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10",
        duration: "8 mins",
      },
];

interface AnxietyGamesProps {
    onComplete?: () => void;
}

export const AnxietyGames = ({ onComplete }: AnxietyGamesProps) => {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [showGame, setShowGame] = useState(false);

    const handleGameStart = async (gameId: string) => {
        setSelectedGame(gameId);
        setShowGame(true);
    };

    const renderGame = () => {
        switch (selectedGame) {
            case "breathing":
                return <BreathingGame />;
            case "garden":
                return <ZenGarden />;
            case "forest":
                return <ForestGame />;
            case "waves":
                return <OceanWaves />;
            default:
                return null;
        }
    };

    return (
        <>
            <Card className="border-primary/10">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Gamepad className="h-5 w-5 text-primary" />
                        Anxiety Relief Activities
                    </CardTitle>
                    <CardDescription>
                        Guided moments designed to help you unwind
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {games.map((game) => (
                            <motion.div
                                key={game.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98}}
                            >
                                <Card
                                    className={`border-primary/10 hover:bg-primary/5 transition-colors cursor-pointer ${
                                        selectedGame === game.id ? "ring-2 ring-primary" : ""
                                    }`}
                                    onClick={() => handleGameStart(game.id)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`p-3 rounded-xl ${game.bgColor} ${game.color}`}
                                            >
                                                <game.icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold"> 
                                                    {game.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {game.description}
                                                </p>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <Music className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">
                                                        {game.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>    
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog
                open={showGame}
                onOpenChange={(open) => {
                    if (!open && showGame) {
                        onComplete?.(); 
                    }
                    setShowGame(open);
                }}
            >
                <DialogContent className="sm:max-w-[600px] bg-white dark:bg-background">
                    <DialogHeader>
                        <DialogTitle>
                            {games.find((g) => g.id === selectedGame)?.title}
                        </DialogTitle>
                    </DialogHeader>
                    {renderGame()}
                </DialogContent>
            </Dialog>
        </>
    )
};