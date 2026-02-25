import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const songsDir = path.join(process.cwd(), "public", "Projects", "Project-2-Spotify-Clone", "songs");

        // Check if directory exists
        if (!fs.existsSync(songsDir)) {
            return NextResponse.json({ error: "Songs directory not found" }, { status: 404 });
        }

        const folders = fs.readdirSync(songsDir).filter(f =>
            fs.statSync(path.join(songsDir, f)).isDirectory()
        );

        const albums = await Promise.all(folders.map(async (folder) => {
            const folderPath = path.join(songsDir, folder);
            const infoPath = path.join(folderPath, "info.json");
            const songs = fs.readdirSync(folderPath).filter(f => f.endsWith(".mp3"));

            let metadata = { title: folder, description: "No description available" };
            if (fs.existsSync(infoPath)) {
                try {
                    metadata = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
                } catch (e) {
                    console.error(`Error parsing info.json in ${folder}:`, e);
                }
            }

            return {
                folder,
                ...metadata,
                songs
            };
        }));

        return NextResponse.json({ albums });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
