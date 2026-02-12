"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Create a scroll container that is taller than the viewport to allow for "pinning" time
    // Increased height to 350vh to ensure text reveal finishes before scrolling away
    // and provide a longer, smoother read duration.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} className="relative h-[350vh] bg-zinc-950 z-10">
            <div className="sticky top-0 h-screen flex items-center justify-center px-4 overflow-hidden bg-zinc-950">
                <div className="max-w-6xl mx-auto relative z-10">
                    <p className="text-xl md:text-2xl text-zinc-400 mb-4">About Me</p>
                    <TextReveal
                        text="I don’t just create websites, I engineer complete digital systems. From frontend to backend, I build applications that are built to perform, scale, and last."
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                        progress={scrollYProgress}
                        highlightedWords={["From", "frontend", "to", "backend,", "perform,", "scale,", "and", "last."]}
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
    highlightedWords?: string[];
}

function TextReveal({ text, className, progress, highlightedWords = [] }: TextRevealProps) {
    const words = text.split(" ");

    // Map the scroll progress [0.05, 0.8] -> [0, 1]
    const revealProgress = useTransform(progress, [0.05, 0.8], [0, 1]);

    return (
        <div className={cn("flex flex-wrap", className)}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                const isHighlighted = highlightedWords.some(hw => word.includes(hw));

                return (
                    <Word key={i} progress={revealProgress} range={[start, end]} isHighlighted={isHighlighted}>
                        {word}
                    </Word>
                );
            })}
        </div>
    );
}

const Word = ({ children, progress, range, isHighlighted }: { children: string; progress: MotionValue<number>; range: [number, number]; isHighlighted?: boolean }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <span className="relative mr-[0.25em] inline-block">
            <motion.span
                style={{ opacity }}
                className={cn("transition-colors duration-200", isHighlighted && "text-orange-500")}
            >
                {children}
            </motion.span>
        </span>
    );
};
