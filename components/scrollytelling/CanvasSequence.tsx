"use client";

import { useScroll, useTransform, useMotionValueEvent, MotionValue, motion } from "framer-motion";
import { useEffect, useRef, useState, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface CanvasSequenceProps {
    folderPath: string; // e.g., "/sequence"
    frameCount: number;
    width?: number;
    height?: number;
    progress?: MotionValue<number>;
    className?: string;
    style?: any; // MotionStyle
}

export default function CanvasSequence({ folderPath, frameCount, width = 1920, height = 1080, progress, className, style }: CanvasSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { scrollYProgress } = useScroll();

    const targetProgress = progress || scrollYProgress;

    // Create a transform that maps scroll 0..1 to image index 0..(n-1)
    const currentIndex = useTransform(targetProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Normalized to 4-digit padding and .png extension
                    const filename = `${String(i).padStart(4, "0")}.png`;
                    img.src = `${folderPath}/${filename}`;
                    img.onload = () => {
                        loadedImages[i - 1] = img; // Ensure correct order
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${filename}`);
                        resolve(); // Still resolve to not break the whole chain, but might have gaps
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, [folderPath, frameCount]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear and draw new frame
        ctx.clearRect(0, 0, width, height);

        // Draw image to cover the canvas (like object-fit: cover)
        const hRatio = canvas.width / images[index].width;
        const vRatio = canvas.height / images[index].height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - images[index].width * ratio) / 2;
        const centerShift_y = (canvas.height - images[index].height * ratio) / 2;

        ctx.drawImage(
            images[index],
            0, 0, images[index].width, images[index].height,
            centerShift_x, centerShift_y, images[index].width * ratio, images[index].height * ratio
        );
    };

    // Initial draw when images are loaded
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoading, images]);

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (isLoading || images.length === 0) return;
        const index = Math.round(latest);
        renderFrame(index);
    });

    return (
        <>
            <motion.canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={style}
                className={cn("absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none", className)}
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-50 text-white">
                    Loading...
                </div>
            )}
        </>
    );
}
