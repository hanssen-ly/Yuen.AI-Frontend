"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
      >
        {/* Left Content (2/3 width) */}
        <div className="md:col-span-2">
        <h1 className="text-4xl font-bold mb-6 text-primary">
            About Yuen.AI
        </h1>

        <div className="text-lg text-muted-foreground leading-relaxed space-y-6 max-w-2xl">
            <p>
            Hey there! I’m Hanssen, a sophomore at Binghamton University studying Computer Science and Math. Over winter break, I went all in on a passion project called Yuen.AI.
            </p>

            <p>
            This past summer, I lost my mom. It hit my family and me really hard, and honestly, I struggled to cope. But out of that tough time, I found myself drawn back to my interest of both programming and psychology. That’s what inspired me to build Yuen.AI—an AI therapist that’s always there when you need it, totally free and easy to access.
            </p>

            <p>
            I developed this project over the course of a month, dedicating myself to consistent, focused effort. The primary technologies used were TypeScript, and Node.js.s
            </p>

            <p>
            I understand how isolating it can feel to be alone, and how difficult it is to afford quality therapy. Yuen.AI was created to help address this gap. While it is not a substitute for professional therapy, it offers a free and accessible way to express your thoughts and find immediate support or solutions.
            </p>

            <p className="italic">
            If Yuen.AI helps even one person feel a little less alone, then it has already done what I set out to do.
            </p>
        </div>
        </div>


        {/* Right Image (1/3 width) */}
        <div className="flex justify-center md:justify-end">
            <div className="rounded-xl overflow-hidden">
                <Image
                src="/images/image.jpg"
                alt="Yuen team or environment"
                width={2725}  
                height={2725} 
                className="rounded-xl"
                priority
                />
            </div>
        </div>
      </motion.div>
    </div>
  );
}
