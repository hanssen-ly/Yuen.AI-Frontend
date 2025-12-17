"use client";
import { Ripple } from "@/components/ui/ripple";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { ArrowRight, Book, BookHeart, RefreshCw, Brain, Lock, Apple } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  const emotions = [
    { value: 0, label: "😔 Down", color: "from-blue-500/50" },
    { value: 25, label: "🫤 Fine", color: "from-green-500/50" },
    { value: 50, label: "🙂 Peaceful", color: "from-purple-500/50" },
    { value: 75, label: "😊 Happy", color: "from-yellow-500/50" },
    { value: 100, label: "🤩 Elated", color: "from-pink-500/50" },
  ];

  const features = [
    {icon: RefreshCw, title: "24/7 Support", description: "There for you—morning, night, and everything in between", color: "from-rose-500/20", delay: 0.2,},
    {icon: Brain, title: "Guidance That Understands You", description: "Personalized support shaped around how you feel.", color: "from-amber-500/20", delay: 0.4,},
    {icon: Lock, title: "A Space You Can Trust", description: "Your conversations remain private, secure, and just between you and this space.", color: "from-emerald-500/20", delay: 0.6,},
    {icon: Apple, title: "You’re Free to Be Yourself Here", description: "Share openly in a space where your thoughts and feelings are met with care, not criticism.", color: "from-blue-500/20", delay: 0.8,},
  ]

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion = 
  emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  return ( 
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className={`absolute w-[500px] h-[500px] rounded-full blur-3xl top-0 -left-20 transition-all duration-700 ease-in-out bg-gradient-to-r ${currentEmotion.color} to-transparent opacity-60`}
          />

          <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl bottom-0 right-0 animate-pulse delay-700" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
        </div>

        <Ripple className="opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 20}}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative space-y-8 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full px-6 py-2.25 text-base border border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
            <BookHeart className="w-6 h-6 animate-wave text-primary" />
            <span className="relative text-foreground/90 dark:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              A Thoughtful Companion for Your Inner World
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-plus-jakarta tracking-tight">
            <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:to-primary transition-all duration-300">
              Ease Your Mind
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              One Conversation at a Time
            </span>
          </h1>

          <p className="max-w-[600px] mx-auto text-base md:text-lg leading-relaxed tracking-wide text-primary">
              A space for emotional support, where you’re heard, understood, and gently guided through life’s journey.
          </p>

          {/* emotion slider */}
          <motion.div
            className="w-full max-w-[600px] mx-auto space-y-6 py-8"
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="space-y-2 text-cente">
              <p className="text-sm text-primary/80 font-medium">
                You’re not too much. You’re heard here.
              </p>
              <div className = "flex justify-between items-center px-2">
                {emotions.map((em) => (
              <div 
                key={em.value}
                className={`transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${
                  Math.abs(emotion - em.value) < 15
                    ? "opacity-100 scale-110 transform-gpu"
                    : "opacity-50 scale-100"
                }`}
                onClick={() => setEmotion(em.value)}
                >
                  <div className="text-2xl transform-gpu">
                    {em.label.split(" ")[0]}
                   </div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">
                    {em.label.split(" ")[1]}
                  </div>
                </div>
                ))}
              </div>
            </div>

            {/* slider */}
              <div className="relative px-2">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${currentEmotion.color} to-transparent blur-2xl -z-10 transition-all duration-500`}
                />
                <Slider
                  value={[emotion]}
                  onValueChange={(value) => setEmotion(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="text-center">
                <p className="text-sm text-primary/100 animate-pulse">
                    Take a moment to notice how you feel.
                  </p>
              </div>
          </motion.div>

          {/* CTA action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="relative group h-12 px-8 rounded-full bg-gradient-to-r from primary via-primary/90 to-secondary hover:to-primary shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30"
              >
            <span className="relative z-10 font-medium flex items-center gap-2">
              Let's Take This Step Together
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* features section */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4 text-white ">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent dark:text-primary/90">
                What You Can Expect from Yuen
            </h2>
            <p className="text-foreground dark:text-foreground/95 max-w-2xl mx-auto font-medium text-lg">
              A new kind of emotional support—thoughtful, caring, and always here.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {features.map((feature, index) => (
                  <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0}}
                  transition={{ delay: feature.delay, duration: 0.5}}
                  viewport={{ once: true }}
                  >
                    <Card className="group relative overflow-hidden border border-primary/10 hover:border-primary/20 transition-all duration-300 h- full min-h-[220px] bg-card/30 dark:bg-card/80 backdrop-blur-sm">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 dark:group-hover:opacity-30`}
                      />
                    <CardHeader className="pb-0 min-h-[56px] flex items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                          <feature.icon className="w-5 h-5 text-primary dark:text-primary/90" />
                        </div>
                        <h3 className="font-semibold tracking-tight text-foreground/90 dark:text-foreground">
                          {feature.title}
                        </h3>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pt-0">
                        <p className="text-sm text-muted-foreground/90 dark:text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 dark:via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
