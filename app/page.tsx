import Hero from "@/components/scrollytelling/Hero";
import About from "@/components/scrollytelling/About";
import Projects from "@/components/scrollytelling/Projects";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <About />
      <Projects />
      <div className="h-screen flex items-center justify-center text-white bg-zinc-950">
        <h2 className="text-4xl font-bold text-center">Let's work together.</h2>
      </div>
      <Footer />
    </main>
  );
}
