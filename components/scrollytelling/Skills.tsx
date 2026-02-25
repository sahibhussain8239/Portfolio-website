"use client";

import { motion } from "framer-motion";
import {
    SiHtml5, SiCss3, SiJavascript, SiNodedotjs,
    SiNextdotjs, SiReact, SiGit, SiGithub,
    SiPostman, SiDocker, SiTailwindcss, SiPython,
    SiMongodb, SiMysql, SiExpress, SiInsomnia
} from "react-icons/si";
import { useRef } from "react";

const skills = [
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "APIs", icon: SiInsomnia, color: "#4000BF" }, // Using Insomnia icon as a proxy for APIs/REST
];

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <section ref={containerRef} className="relative min-h-screen py-32 px-4 md:px-12 bg-black z-30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xl md:text-2xl text-zinc-400 mb-4">Mastery</p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-16 tracking-tight">
                        My Tech Stack
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="flex flex-col items-center justify-center p-6 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl group transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/5"
                        >
                            <skill.icon
                                className="text-4xl md:text-5xl mb-4 transition-colors duration-300 filter grayscale group-hover:grayscale-0"
                                style={{ color: skill.name === "GitHub" || skill.name === "Next.js" || skill.name === "Express.js" ? undefined : skill.color }}
                            />
                            <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-300 text-center">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
