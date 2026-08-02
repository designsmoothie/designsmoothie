import About from "@/components/About";
import AdminAccessButton from "@/components/AdminAccessButton";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestJournal from "@/components/LatestJournal";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import Service from "@/components/Service";
import SiteFooter from "@/components/SiteFooter";

import {
  getCmsCategories,
  getCmsProjects,
} from "@/lib/portfolio-data";

export default async function Home() {
  const [
    cmsProjects,
    cmsCategories,
  ] = await Promise.all([
    getCmsProjects(),
    getCmsCategories(),
  ]);

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
          <Portfolio
            cmsProjects={cmsProjects}
            cmsCategories={cmsCategories}
          />
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