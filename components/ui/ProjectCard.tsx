"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    className?: string;
    index: number;
}

export default function ProjectCard({ title, description, link, className, index }: ProjectCardProps) {
    return (
        <Link href={link || "#"} className={cn("block group relative no-underline", className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="h-full overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5"
            >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-6 bg-zinc-900 border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">{title}</h3>
                <p className="text-zinc-400 font-light leading-relaxed">{description}</p>

                <div className="mt-6 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                    View Project <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </div>
            </motion.div>
        </Link>
    );
}
