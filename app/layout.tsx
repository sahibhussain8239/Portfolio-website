import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/scrollytelling/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sahib Hussain - Portfolio",
  description: "Portfolio of Sahib Hussain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} antialiased`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
