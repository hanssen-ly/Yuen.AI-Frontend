"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const activityTypes = [
    { id: "meditation", name: "Meditation" },
    { id: "exercise", name: "Exercise" },
    { id: "walking", name: "Walking" },
    { id: "reading", name: "Reading" },
    { id: "journaling", name: "Journaling" },
    { id: "therapy", name: "Therapy Session" },
];

type ActivityLoggerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onComplete?: () => void;
};

export function ActivityLogger({ open, onOpenChange, onComplete}: ActivityLoggerProps) {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!type || !name) {
        return;
        }

        setIsLoading(true);

        setTimeout(() => {
            console.log({
                type,
                name,
                duration,
                description,
            });

            setType("");
            setName("");
            setDuration("");
            setDescription("");
            setIsLoading(false);

            alert("Activity logged!");
            onComplete?.();  
            onOpenChange(false);
        }, 1000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Log Activity</DialogTitle>
                    <DialogDescription>Save Your Wellness Activity</DialogDescription>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Activity Type</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select activity type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {activityTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>
                                            {type.name}
                                        </SelectItem>
                                    ))}                               
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Morning Meditation, Eveniing Walk, etc."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Duration (minutes)</Label>
                            <Input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="15"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Description (optional)</Label>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="How did it go?"
                            />

                            <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !type || !name}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </span>
                                    ) : (
                                        "Capture This Moment"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}