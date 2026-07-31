import About from "@/components/About";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Portfolio from "@/components/Portfolio";
import Service from "@/components/Service";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import AdminAccessButton from "@/components/AdminAccessButton";

import { getCmsProjects } from "@/lib/portfolio-data";
import LatestJournal from "@/components/LatestJournal";

export default async function Home() {
  const cmsProjects = await getCmsProjects();

  return (
    <>
      <Header />
      <AdminAccessButton />

      <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
        <Hero />

        <Reveal>
          <Service />
        </Reveal>

        <Reveal>
  <Portfolio cmsProjects={cmsProjects} />
</Reveal>

<Reveal>
  <LatestJournal />
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