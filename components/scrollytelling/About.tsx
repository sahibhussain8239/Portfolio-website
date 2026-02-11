"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Create a scroll container that is taller than the viewport to allow for "pinning" time
    // Increased height to ensure text reveal finishes before scrolling away
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-zinc-950 my-50">
            <div className="sticky top-0 h-screen flex items-center justify-center px-4 overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <p className="text-xl md:text-2xl text-zinc-400 mb-4">About Me</p>
                    <TextReveal
                        text="I don’t just create websites, I engineer complete digital systems. From frontend to backend, I build applications that are built to perform, scale, and last. I care about speed, structure, and execution, because good software isn’t about ideas, it’s about delivering working products."
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                        progress={scrollYProgress}
                    />
                </div>
            </div>
        </div>
    );
}

interface TextRevealProps {
    text: string;
    className?: string;
    progress: MotionValue<number>;
}

function TextReveal({ text, className, progress }: TextRevealProps) {
    const words = text.split(" ");
    return (
        <div className={cn("flex flex-wrap", className)}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <Word key={i} progress={progress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </div>
    );
}

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <span className="relative mr-[0.25em] inline-block">
            <motion.span style={{ opacity }} className="transition-colors duration-200">
                {children}
            </motion.span>
        </span>
    );
};
