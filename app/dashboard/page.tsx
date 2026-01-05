"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Activity, ArrowRight, BookCheck, Brain, Heart, NotebookPen, Sparkles, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AnxietyGames } from "../components/games/anxiety-games";
import { MoodForm } from "../components/mood/mood-form";
import { ActivityLogger } from "../components/activities/activity-logger";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/contexts/session-context";

export default function DashboardPage(){
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showMoodModal, setShowMoodModal] = useState(false);
    const [isSavingMood, setIsSavingMood] = useState(false);
    const [showActivityLogger, setShowActivityLogger] = useState(false);

    const [moodScore, setMoodScore] = useState<number | null>(null);
    const todayKey = new Date().toISOString().slice(0, 10);

    const activitiesStorageKey = `activitiesCount:${todayKey}`;
    const [totalActivities, setTotalActivities] = useState<number>(0);

    const sessionsStorageKey = `mindfulSessions:${todayKey}`;
    const [mindfulSessions, setMindfulSessions] = useState<number>(0);


    const { user } = useSession();

    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime (new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const loadTodayMood = async () => {
            try {
                const token = localStorage.getItem("token");
    
                if (!token) return;
    
                const response = await fetch("/api/mood/today", {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
    
                    if (typeof data.score === "number") {
                        setMoodScore(data.score);
                    }
                }
            } catch (error) {
                console.error("Failed to load today's mood:", error);
            }
        };
    
        loadTodayMood();
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem(activitiesStorageKey);
        setTotalActivities(saved ? Number(saved) : 0);
    }, [activitiesStorageKey]);
    
    useEffect(() => {
        localStorage.setItem(activitiesStorageKey, String(totalActivities));
    }, [activitiesStorageKey, totalActivities]);    

    useEffect(() => {
        const saved = localStorage.getItem(sessionsStorageKey);
        setMindfulSessions(saved ? Number(saved) : 0);
    }, [sessionsStorageKey]);

    useEffect(() => {
        localStorage.setItem(sessionsStorageKey, String(mindfulSessions));
    }, [sessionsStorageKey, mindfulSessions]);
    

    const moodLabels = [
        { value: 0, label: "Struggling" },
        { value: 25, label: "Low" },
        { value: 50, label: "Okay" },
        { value: 75, label: "Better" },
        { value: 100, label: "Really Good" },
    ];

    const getClosestMoodLabel = (score: number) => {
        return (
            moodLabels.find(
                (m) => Math.abs(score - m.value) < 15
            )?.label ?? "Okay"
        );
    };

    const incrementActivities = (amount: number = 1) => {
        setTotalActivities((prev) => prev + amount);
    };    

    const incrementMindfulSessions = () => {
        setMindfulSessions((prev) => prev + 1);
    };
    

    const wellnessStats = [
        {
            title: "Mood Score",
            value: moodScore !== null
                ? getClosestMoodLabel(moodScore)
                : "No data",
            icon: Brain,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            description: "Today's average mood",
        },
        {
            title: "Completion Rate",
            value: "100%",
            icon: Trophy,
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10",
            description: "Perfect completion rate",
        },
        {
            title: "Mindful Sessions",
            value: `${mindfulSessions} sessions`,
            icon: Heart,
            color: "text-rose-500",
            bgColor: "bg-rose-500/10",
            description: "Total sessions completed",
        },
        {
            title: "Total Activities",
            value: totalActivities,
            icon: Activity,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            description: "Completed today",
        },
    ]

    const handleMoodSubmit = async (data: { moodScore: number }) => {
        setIsSavingMood(true);
        try {
            setShowMoodModal(false);
        } catch (error) {
            console.error("Error Saving Mood: ", error);
        } finally {
            setIsSavingMood(false);
        }
    };

    const handleAICheckIn = () => {
        setShowActivityLogger(true);
    };

    const handleStartTherapy = () => {
        incrementMindfulSessions();
        router.push("/therapy/new");
    };    

    return (
        <div className="min-h-screen bg-background p-26">
            <Container className="pt-20 pb-8 space-y-6">
                <div className="flex flex-col gap-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-2"
                    >
                        <h1 className="text-3xl font-bold">
                            Good to see you, {user?.name}!
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {currentTime.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </motion.div>
                </div>

                {/* main grid layout*/}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {/* quick actions card */}
                        <Card className="border-primary/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />

                            <CardContent className="p-6 relative">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">Quick Actions</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Begin, at your own pace.
                                                </p>
                                            </div>
                                        </div>
                                    <div className="grid gap-3">
                                        <Button
                                            variant="default"
                                            className={cn(
                                                "w-full justify-between items-center p-6 h-auto group/button",
                                                "bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90",
                                                "transition-all duration-200 group-hover:translate-y-[-2px]"
                                            )}
                                            onClick={handleStartTherapy}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                    <NotebookPen className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold text-white">
                                                        Begin Your Session
                                                    </div>
                                                    <div className="text-xs text-white/80">
                                                        Start a New Conversation
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                                                <ArrowRight className="w-5 h-5 text-white" />
                                            </div>
                                        </Button>

                                        {/* div */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "flex flex-col h-[120px] px-4 py-3 group/mood hover:border-primary/50",
                                                    "justify-center items-center text-center",
                                                    "transition-all duration-200 group-hover:translate-y-[-2px]"
                                                )}
                                                onClick={() => setShowMoodModal(true)}
                                            >
                                                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                                                    <Heart className="w-5 h-5 text-rose-500" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">Track Mood</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5">
                                                        How are you feeling right now?
                                                    </div>
                                                </div>
                                            </Button>

                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "flex flex-col h-[120px] px-4 py-3 group/ai hover:border-primary/50",
                                                    "justify-center items-center text-center",
                                                    "transition-all duration-200 group-hover:translate-y-[-2px]"
                                                )}
                                                onClick={handleAICheckIn}
                                            >
                                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                                                    <BookCheck className="w-5 h-5 text-blue-500" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">Check In</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5">
                                                        Just a quick check.
                                                    </div>
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* today's overview card */}
                        <Card className="border-primary/10">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Your day, at a Glance</CardTitle>
                                        <CardDescription className="mt-1">
                                            Your Well-Being for {""}
                                            {format(new Date(), "MMMM d, yyyy")}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {wellnessStats.map((stat) => (
                                        <div
                                            key={stat.title}
                                            className={cn(
                                                "p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                                                stat.bgColor
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                                                <p className="text-sm font-medium">{stat.title}</p>
                                            </div>
                                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{stat.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* content grid for games */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-3 space-y-6">
                            {/* anxiety games */}
                            <AnxietyGames onComplete={() => incrementActivities(1)} />
                        </div>
                    </div>
                </div>
            </Container>

            {/* mood tracking modal */}
            <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Take a moment—how do you feel?</DialogTitle>
                        <DialogDescription>Move the slider to track your current mood</DialogDescription>
                    </DialogHeader>

                    {/* moodform */}
                    <MoodForm
                        onSuccess={(score: number) => {
                            setMoodScore(score);
                            setShowMoodModal(false);
                        }}
                    />

                </DialogContent>
            </Dialog>

            {/* activity logger */}
            <ActivityLogger
                open={showActivityLogger}
                onOpenChange={setShowActivityLogger}
                onComplete={() => incrementActivities(1)}
            />
        </div>
    );
}