"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function WhatIDo() {
    const containerRef = useRef<HTMLDivElement>(null);

    const skills = [
        {
            title: "Build responsive user interfaces",
            description: "Creating clean, modern, and mobile-friendly web interfaces"
        },
        {
            title: "Create web applications with React",
            description: "Developing interactive applications using modern React patterns"
        },
        {
            title: "Learn backend and databases step by step",
            description: "Expanding knowledge in server-side development and data management"
        },
        {
            title: "Improve skills through consistent practice",
            description: "Continuously learning and building to become a better developer"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -60,
            y: 30
        },
        visible: (index: number) => ({
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as const
            }
        })
    };

    return (
        <section ref={containerRef} className="relative min-h-screen py-32 px-4 md:px-12 bg-zinc-950 z-30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xl md:text-2xl text-zinc-400 mb-4">What I Do</p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-16 tracking-tight">
                        Growing as a Developer
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={itemVariants}
                            className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/0 rounded-2xl transition-all duration-300" />
                            <div className="relative">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                                    {skill.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {skill.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
