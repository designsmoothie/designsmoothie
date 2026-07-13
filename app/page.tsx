import About from "@/components/About";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Portfolio from "@/components/Portfolio";
import Service from "@/components/Service";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
        <Hero />

        <Reveal>
          <Service />
        </Reveal>

        <Reveal>
          <Portfolio />
        </Reveal>

        <Reveal>
          <About />
        </Reveal>

        <Reveal>
          <Process />
        </Reveal>

        <Reveal>
          <ContactSection />
        </Reveal>
      </main>

      <Reveal>
        <SiteFooter />
      </Reveal>
    </>
  );
}