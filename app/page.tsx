import Hero from "@/components/scrollytelling/Hero";
import About from "@/components/scrollytelling/About";
import WhatIDo from "@/components/scrollytelling/WhatIDo";
import Skills from "@/components/scrollytelling/Skills";
import Projects from "@/components/scrollytelling/Projects";
import Footer from "@/components/ui/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <WhatIDo />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />

      <Footer />
    </main>
  );
}
