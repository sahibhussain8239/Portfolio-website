"use client";

import { useRef } from "react";
import CanvasSequence from "./CanvasSequence";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Blur effect: starts at 0, blurs slightly as we scroll deep
    const blurValue = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(0px)", "blur(0px)", "blur(10px)"]);

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{ filter: blurValue }}
                >
                    <CanvasSequence
                        folderPath="/sequence"
                        frameCount={120}
                        progress={scrollYProgress}
                    />
                </motion.div>

                {/* First Text: Visible initially, fades out quickly */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]) }}
                        className="text-center w-full max-w-4xl mx-auto"
                    >
                        <p className="text-xl md:text-2xl text-zinc-400 mb-4">Sahib Hussain</p>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter w-[80%] mx-auto leading-tight">
                            Full Stack Developer who ships real apps, not excuses.
                        </h1>
                    </motion.div>
                </div>

                {/* Second Text: Appears later, ensuring no overlap */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]) }}
                        className="text-center w-full max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Immersive Experiences
                        </h2>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
