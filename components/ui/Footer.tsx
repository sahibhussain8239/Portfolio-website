"use client";

export default function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Sahib. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
