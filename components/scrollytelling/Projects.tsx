"use client";

import ProjectCard from "@/components/ui/ProjectCard";

const projects = [
    {
        title: "Neon Horizon",
        description: "A cyberpunk inspired landing page featuring complex WebGL shaders and interactive 3D elements.",
        image: "/placeholder",
        link: "#"
    },
    {
        title: "Glass OS",
        description: "An experimental operating system interface built entirely with CSS glassmorphism and React.",
        image: "/placeholder",
        link: "#"
    },
    {
        title: "Void Commerce",
        description: "Minimalist e-commerce platform focusing on typography and negative space.",
        image: "/placeholder",
        link: "#"
    },
];

export default function Projects() {
    return (
        <section className="min-h-screen py-32 px-4 md:px-12 bg-black relative">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-24 text-center tracking-tighter">
                    Selected Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} index={i} {...p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
