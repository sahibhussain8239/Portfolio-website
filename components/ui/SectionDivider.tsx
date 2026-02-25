"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
    return (
        <div className="relative w-full h-[2px] bg-zinc-800 overflow-hidden">
            <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                viewport={{ once: false }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
            />
        </div>
    );
}
