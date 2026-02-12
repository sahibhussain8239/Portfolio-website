"use client";

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
    {
        title: "Productivity App",
        description: "A comprehensive tool to boost personal productivity.",
        image: "/placeholder",
        link: "/projects/productivity-app"
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
