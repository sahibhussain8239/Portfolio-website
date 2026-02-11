"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    text: string;
    className?: string;
}

export default function TextReveal({ text, className }: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const words = text.split(" ");

    return (
        <div ref={containerRef} className={cn("flex flex-wrap leading-tight", className)}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                // Adjust range to ensure it finishes before the very end of scroll
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
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
        <span className="relative mr-[0.2em] inline-block">
            <motion.span style={{ opacity }} className="transition-colors duration-200">
                {children}
            </motion.span>
        </span>
    );
};
