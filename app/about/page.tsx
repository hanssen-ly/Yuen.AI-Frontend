"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      {/* WHAT THE PLATFORM OFFERS */}
      <section className="container mx-auto px-6 pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            About Yuen.AI
          </h2>
          <p className="text-lg text-muted-foreground">
            Built with care, this app blends thoughtful design and modern technology to create a safe, supportive space for mental well-being.
          </p>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="container mx-auto px-6 pt-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {/* Left Content Bubble */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-lg hover:shadow-primary/20 transition-shadow">
              <h1 className="text-4xl font-bold mb-6 text-primary">
                Why I Built Yuen.AI
              </h1>

              <div className="text-lg text-muted-foreground leading-relaxed space-y-6 max-w-2xl">
                <p>
                  Hey there! I’m Hanssen, a sophomore at Binghamton University
                  studying Computer Science and Math. Over winter break, I went
                  all in on a passion project called Yuen.AI.
                </p>

                <p>
                  This past summer, I lost my mom. It hit my family and me really
                  hard, and honestly, I struggled to cope. But out of that tough
                  time, I found myself drawn back to my interest in both
                  programming and psychology. That’s what inspired me to build
                  Yuen.AI—an AI therapist that’s always there when you need it,
                  totally free and easy to access.
                </p>

                <p>
                  I understand how isolating it can feel to be alone, and how
                  difficult it is to afford quality therapy. Yuen.AI was created
                  to help address this gap. While it is not a substitute for
                  professional therapy, it offers a free and accessible way to
                  express your thoughts and find immediate support or solutions.
                </p>

                <p className="italic text-muted-foreground/80">
                  If Yuen.AI helps even one person feel a little less alone, then
                  it has already done what I set out to do.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <div className="flex md:justify-end h-full">
            <div className="relative h-full w-full max-w-md rounded-2xl overflow-hidden">
              <Image
                src="/images/image.jpg"
                alt="Yuen team or environment"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
