"use client";

import { useRef, useEffect } from "react";
import CanvasSequence from "./CanvasSequence";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animation for headline
            gsap.from(headlineRef.current, {
                opacity: 0,
                y: 30,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.5
            });

            // Staggered reveal for metrics
            if (metricsRef.current) {
                gsap.from(metricsRef.current.children, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power2.out",
                    delay: 1
                });
            }
        });
        return () => ctx.revert();
    }, []);

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
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-4">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.10], [1, 0]) }}
                        className="text-center w-full max-w-5xl mx-auto"
                    >
                        <p className="text-xl md:text-2xl text-zinc-400 mb-6 uppercase tracking-[0.5em]">Sahib Hussain</p>
                        <h1
                            ref={headlineRef}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[0.3em] md:tracking-[0.8em] uppercase mb-12 leading-tight"
                        >
                            W E L C O M E &nbsp; I T Z &nbsp; S A H I B
                        </h1>

                    </motion.div>
                </div>

                {/* Second Text: Appears later, ensuring no overlap */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.10, 0.15, 0.20, 0.40], [0, 1, 1, 0]) }}
                        className="text-center w-full max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Building responsive websites and improving every day
                        </h2>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
