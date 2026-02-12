"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";

const projects = [
    {
        title: "Netflix Clone",
        description: "A replica of the Netflix user interface.",
        image: "/placeholder",
        link: "/Projects/Project-1-Netfilx-Clone/index.html"
    },
    {
        title: "Spotify Clone",
        description: "A music streaming service clone inspired by Spotify.",
        image: "/placeholder",
        link: "/Projects/Project-2-Spotify-Clone/index.html"
    },
    {
        title: "X.com Clone",
        description: "A social media platform clone resembling X (formerly Twitter).",
        image: "/placeholder",
        link: "/Projects/Project-3-X.com-Clone/index.html"
    },
    {
        title: "Todo List App",
        description: "A React-based application for managing daily tasks.",
        image: "/placeholder",
        link: "/Projects/Project-4-TodoListApp-React/dist/index.html"
    },
    {
        title: "Password Manager",
        description: "A secure application for storing and managing passwords.",
        image: "/placeholder",
        link: "/Projects/Project-5-Password-manager/dist/index.html"
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transform scroll progress to horizontal scroll position
    const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);

    return (
        <div ref={containerRef} className="relative h-[350vh] bg-black z-20">
            <section className="sticky top-0 h-screen py-32 px-4 md:px-12 bg-black overflow-hidden flex items-center">
                <div className="max-w-7xl mx-auto w-full">
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-24 text-center tracking-tighter">
                        Projects
                    </h2>
                    <div className="overflow-hidden">
                        <motion.div
                            ref={scrollRef}
                            className="flex gap-8 pb-8"
                            style={{ x }}
                        >
                            {projects.map((p, i) => (
                                <div key={i} className="min-w-[350px] max-w-[400px] md:min-w-[400px] flex-shrink-0">
                                    <ProjectCard index={i} {...p} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
