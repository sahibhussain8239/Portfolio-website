import Hero from "@/components/scrollytelling/Hero";
import About from "@/components/scrollytelling/About";
import WhatIDo from "@/components/scrollytelling/WhatIDo";
import Projects from "@/components/scrollytelling/Projects";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <About />
      <WhatIDo />
      <Projects />

      <Footer />
    </main>
  );
}
