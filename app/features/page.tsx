"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Shield,
  Fingerprint,
  Activity,
  Clock,
  LineChart,
  Wifi,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: "Always-Available Therapy Support",
    description:
      "Continuous access to personalized mental health support guided by a range of therapeutic approaches.",
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: "Intelligent Emotional Insight",
    description:
      "Carefully designed analysis helps recognize emotional cues and respond with support that fits your needs.",
  },
  {
    icon: <Activity className="w-10 h-10 text-primary" />,
    title: "Support in Critical Moments",
    description:
      "Designed to recognize signs of distress and respond with care when immediate support matters most.",
  },
  {
    icon: <LineChart className="w-10 h-10 text-primary" />,
    title: "Your Progress, Over Time",
    description:
      "See how your well-being evolves with thoughtful insights and securely recorded sessions you can trust.",
  },
  {
    icon: <Fingerprint className="w-10 h-10 text-primary" />,
    title: "Privacy First",
    description:
      "End-to-end encryption and privacy-preserving protections keep your data confidential at every step.",
  },
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: "Care That Sees the Whole You",
    description:
      "Bring together signals from your daily life and health tools to support your overall mental well-being.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          What the Platform Offers
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the features that power a more thoughtful approach to mental health support, built with strong privacy protections at its core.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8">
            You deserve support that feels thoughtful, caring, and truly supportive.
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Start Your Journey
          <Heart className="ml-2 w-5 h-5" />
        </a>
      </motion.div>
    </div>
  );
}